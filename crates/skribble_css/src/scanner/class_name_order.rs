use std::{cmp::Ordering, hash::Hash};

use enum_ordinalize::Ordinalize;

/// These are as indexes for the created score position array.
#[repr(u8)]
#[derive(Debug, PartialEq, Eq, Ordinalize)]
pub(crate) enum NamedPosition {
  Breakpoint,
  MediaQuery,
  ParentModifier,
  Modifier,
  Atom,
  Value,
}

/// Contains an array which is responsible for the order of the class names.
///
/// TODO use a macro to generate the positions from the enum automatically.
/// https://stackoverflow.com/a/52694425/2172153
#[derive(Debug, Clone, PartialEq, Eq, Hash)]
pub(crate) struct ClassNameOrder([usize; NamedPosition::variant_count()]);

impl ClassNameOrder {
  pub(crate) fn new() -> Self {
    Self([0; NamedPosition::variant_count()])
  }

  fn set_position(&mut self, position: NamedPosition, value: usize) {
    self.0[position.ordinal() as usize] = value;
  }

  pub(crate) fn set_value(&mut self, value: usize) {
    self.set_position(NamedPosition::Value, value);
  }

  pub(crate) fn set_atom(&mut self, value: usize) {
    self.set_position(NamedPosition::Atom, value);
  }

  pub(crate) fn set_modifier(&mut self, value: usize) {
    self.set_position(NamedPosition::Modifier, value);
  }

  pub(crate) fn set_parent_modifier(&mut self, value: usize) {
    self.set_position(NamedPosition::ParentModifier, value);
  }

  pub(crate) fn set_media_query(&mut self, value: usize) {
    self.set_position(NamedPosition::MediaQuery, value);
  }

  pub(crate) fn set_breakpoint(&mut self, value: usize) {
    self.set_position(NamedPosition::Breakpoint, value);
  }
}

impl Ord for ClassNameOrder {
  fn cmp(&self, other: &Self) -> Ordering {
    for position in NamedPosition::variants().iter() {
      let index = position.ordinal() as usize;
      let comparison = self.0.get(index).cmp(&other.0.get(index));

      if comparison != Ordering::Equal {
        return comparison;
      }
    }

    Ordering::Equal
  }
}

impl PartialOrd for ClassNameOrder {
  fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
    Some(self.cmp(other))
  }
}
