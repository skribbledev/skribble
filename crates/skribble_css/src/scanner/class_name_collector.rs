use indexmap::IndexSet;
use swc_ecmascript::{
  ast::{
    ArrayLit, CallExpr, Callee, Expr, Ident, ImportDecl, ImportSpecifier, JSXExpr,
    JSXExprContainer, Lit, MemberExpr, ModuleExportName, ObjectLit, Pat, Prop, PropName,
    PropOrSpread, Stmt,
  },
  utils::{id, Id},
  visit::{noop_visit_type, Visit, VisitWith},
};

use crate::{config::Config, utils::is_root_identifier};

use super::class_name::{ClassArguments, ClassName};

/// The class name collector recursively visits each node and children until it
/// finds a member expression or call member expression which begins with the
/// target import identifier.
///
/// At this point the subsequent identifiers are gathered from the member
/// expression.
///
/// For example:
///
/// ```ts
/// import { c, cx } from 'skribble-css/client'; // c is the target
///
/// const Component = (props) => {
///   const { isDisabled } = props;
///   const className = cx(c.grid, c.md.flex, isDisabled && c.hidden);
/// }
/// ```
pub struct ClassNameCollector<'config> {
  /// The `class_names` which have been identified in the file.
  pub class_names: IndexSet<ClassName<'config>>,

  /// A vector of names to search for in the source code.
  valid_imports: Vec<ValidImport>,

  /// The identifiers to search through in the file.
  import_ids: IndexSet<Id>,

  /// The configuration provided.
  config: &'config Config,
}

impl<'config> ClassNameCollector<'config> {
  pub fn new(valid_imports: &[ValidImport], config: &'config Config) -> Self {
    Self {
      class_names: IndexSet::new(),
      valid_imports: valid_imports.to_vec(),
      import_ids: IndexSet::new(),
      config,
    }
  }

  pub fn sort(&mut self) {
    self.class_names.sort();
  }

  /// Get the valid `class_names` which have been identified in the file.
  pub fn get_class_names(&self) -> Vec<&ClassName> {
    Vec::from_iter(
      self
        .class_names
        .iter()
        .filter(|class_name| class_name.is_valid()),
    )
  }

  fn collect_member_expression(&mut self, member: &MemberExpr) {
    let class_name = match ClassName::from_member_expression(self.config, member, &self.import_ids)
    {
      Some(class_name) => class_name,
      None => return,
    };

    self.class_names.insert(class_name);
  }

  fn collect_call_expression(&mut self, call: &CallExpr) {
    let expression = match &call.callee {
      Callee::Expr(member) => &**member,
      _ => return call.visit_children_with(self),
    };

    let optional_class_name = match expression {
      Expr::Member(member) => {
        ClassName::from_member_expression(self.config, member, &self.import_ids)
      }
      Expr::Ident(ident) => {
        if is_root_identifier(&self.import_ids, ident) {
          Some(ClassName::new(self.config))
        } else {
          return call.visit_children_with(self);
        }
      }
      _ => return call.visit_children_with(self),
    };

    let mut class_name = match optional_class_name {
      Some(class_name) => class_name,
      None => return,
    };

    match call.args.len() {
      1 => {
        let argument = match call.args.first() {
          Some(argument) => &*argument.expr,
          None => return,
        };

        // Only use the argument if it is a string literal or can be evaluated.
        let value = match self.get_literal_string_value(argument) {
          Some(value) => value,
          _ => return,
        };

        class_name.add_arguments(ClassArguments::from_value(&value))
      }
      2 => {
        let key_argument = match call.args.first() {
          Some(argument) => &*argument.expr,
          None => return,
        };

        let value_argument = match call.args.get(1) {
          Some(argument) => &*argument.expr,
          None => return,
        };

        let key = match self.get_literal_string_value(key_argument) {
          Some(key) => key,
          _ => return,
        };

        let value = match self.get_literal_string_value(value_argument) {
          Some(value) => value,
          _ => return,
        };

        class_name.add_arguments(ClassArguments::from_key_value(&key, &value))
      }
      _ => return,
    }

    self.class_names.insert(class_name);
  }

  fn get_literal_string_value(&self, literal: &Expr) -> Option<String> {
    match literal {
      Expr::Lit(Lit::Str(string)) => Some(string.value.to_string()),
      Expr::Lit(Lit::BigInt(number)) => Some(format!("{}px", number.value)),
      Expr::Lit(Lit::Num(number)) => Some(format!("{}px", number.value)),
      Expr::Lit(Lit::Bool(boolean)) => Some(boolean.value.to_string()),
      _ => None,
    }
  }

  /// Check if the expression is either a member expression or a call
  /// expression.
  ///
  /// These are the only valid expressions that can be used to create a class
  /// name.
  fn collect_class_names(&mut self, expression: &Expr) {
    match expression {
      Expr::Member(member) => self.collect_member_expression(member),
      Expr::Call(call) => self.collect_call_expression(call),
      _ => expression.visit_children_with(self),
    }
  }

  // Collect the import declaration if it matches the expected pattern.
  fn collect_matching_import(&mut self, node: &ImportDecl) {
    let import_path = node.src.value.to_string();
    let valid_import_option = self
      .valid_imports
      .iter()
      .find(|valid_import| valid_import.package_name == import_path);

    // Exit early for type only imports and imports don't pattern match with the
    // expectation.
    if node.type_only || valid_import_option.is_none() {
      return;
    }

    // Extract the value from the option.
    let valid_import = valid_import_option.unwrap();

    // Store the identifier of the import that will searched for in the file.
    // Use the `sym` property
    let mut identifier: Option<&Ident> = None;

    // Loop through the specifiers and find the first matching identifier.
    node
      .specifiers
      .iter()
      .for_each(|specifier| match specifier {
        ImportSpecifier::Named(ref specifier) => {
          // Start as valid then check the imported name if it exists.
          // If the imported name exists but doesn't not match the import_name
          // then this is an invalid item.
          let mut valid = true;

          // True when the imported name is different.
          // `import { c as d } from 'skribble-css/client'`
          let mut is_import_as = false;

          if let Some(imported) = &specifier.imported {
            is_import_as = true;
            valid = match &imported {
              ModuleExportName::Ident(ident) => ident.sym == valid_import.import_name,
              ModuleExportName::Str(value) => value.value == valid_import.import_name,
            }
          }

          if valid && (is_import_as || specifier.local.sym == valid_import.import_name) {
            identifier = Some(&specifier.local);
          }
        }

        ImportSpecifier::Namespace(ref specifier) => {
          if valid_import.import_name == "*" {
            identifier = Some(&specifier.local);
          }
        }

        ImportSpecifier::Default(ref specifier) => {
          if valid_import.import_name.is_empty() {
            identifier = Some(&specifier.local);
          }
        }
      });

    if let Some(item) = identifier {
      self.import_ids.insert(id(item));
    }
  }
}

impl<'config> Visit for ClassNameCollector<'config> {
  noop_visit_type!();

  fn visit_import_decl(&mut self, node: &ImportDecl) {
    self.collect_matching_import(node);
  }

  fn visit_expr(&mut self, node: &Expr) {
    self.collect_class_names(node);
  }

  fn visit_stmt(&mut self, statement: &Stmt) {
    match statement {
      Stmt::Expr(expr) => {
        self.collect_class_names(&*expr.expr);
      }

      _ => statement.visit_children_with(self),
    }
  }

  fn visit_jsx_expr_container(&mut self, container: &JSXExprContainer) {
    if let JSXExpr::Expr(expr) = &container.expr {
      self.collect_class_names(&*expr)
    }
  }

  fn visit_pat(&mut self, element: &Pat) {
    if let Pat::Assign(assign) = element {
      self.collect_class_names(&*assign.right);
    }
  }

  fn visit_array_lit(&mut self, array: &ArrayLit) {
    array.elems.iter().for_each(|item| {
      if let Some(expression) = item {
        self.collect_class_names(&*expression.expr);
      }
    });
  }

  fn visit_object_lit(&mut self, object: &ObjectLit) {
    for item in &object.props {
      let prop = match item {
        PropOrSpread::Prop(prop) => prop,
        _ => return,
      };

      let key_value = match &**prop {
        Prop::KeyValue(value) => value,
        _ => return,
      };

      // Here check the key which can be computed.
      if let PropName::Computed(value) = &key_value.key {
        self.collect_class_names(&*value.expr);
      }

      self.collect_class_names(&*key_value.value);
    }
  }
}

/// This module operates on a per file basis and collects the tokens from each
/// file.
///
/// Currently the only supported files are TypeScript files.

/// The imports that will be considered valid and that will be searched for in
/// the code.
///
/// For the following code snippet:
///
/// ```ts
/// import { c } from 'skribble-css/client';
/// ```
///
/// This would be the shape of the ValidImport
///
/// ```rust
/// use skribble_css::scanner::class_name_collector::ValidImport;
///
/// let valid_import = ValidImport::new("skribble-css", "c");
/// ```
///
/// This will then track the symbol c throughout the file.
#[derive(Debug, Clone)]
pub struct ValidImport {
  /// The name of the imported package being tracked.
  pub package_name: String,

  /// The imported name. Leave as the empty string `""` if this will be a
  /// default import, or set to `*` if this is a namespace import.
  pub import_name: String,
}

impl ValidImport {
  pub fn new(package_name: &str, import_name: &str) -> Self {
    Self {
      package_name: package_name.into(),
      import_name: import_name.into(),
    }
  }
}
