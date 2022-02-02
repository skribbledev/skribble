use std::str::FromStr;

use colorsys::{ColorAlpha, Hsl, Rgb};
use indexmap::IndexMap;

use super::user::CssValue;

/// Convert the color to a valid css value with the opacity set to the provided
/// css variable.
pub(crate) fn convert_css_value_to_color(
  original: &CssValue,
  palette: &IndexMap<String, String>,
  opacity: &str,
) -> String {
  // Create a copy of the string value to search against.
  let mut string_value = original.get_string();

  if let Some(derived_value) = palette.get(&string_value) {
    string_value = derived_value.clone();
  }

  get_rgba_color_from_string(&string_value, opacity)
}

/// Will return the string unchanged if the color provided is not valid.
pub(crate) fn get_rgba_color_from_string(value: &str, opacity: &str) -> String {
  let mut string_value = value.to_owned();

  let rgb = if let Some(stripped) = string_value.strip_prefix('#') {
    Rgb::from_hex_str(stripped).ok()
  } else if string_value.starts_with("rgb") {
    Rgb::from_str(&string_value).ok()
  } else if string_value.starts_with("hsl") {
    if let Ok(hsl) = Hsl::from_str(&string_value) {
      Some(Rgb::from(hsl))
    } else {
      None
    }
  } else {
    None
  };

  let wrapped_opacity = wrap_css_variable(opacity);

  if let Some(rgb) = rgb {
    let alpha = if rgb.alpha() < 1.0 {
      format!("calc({} * {})", rgb.alpha(), wrapped_opacity)
    } else {
      wrapped_opacity
    };

    string_value = format!(
      "rgba({}, {}, {}, {})",
      rgb.red(),
      rgb.green(),
      rgb.blue(),
      alpha
    );
  }

  string_value
}

/// Wrap the opacity value in `var()` if not already done in the config.
pub(crate) fn wrap_css_variable(value: &str) -> String {
  if value.starts_with("var(") && value.ends_with(')') {
    value.to_owned()
  } else {
    format!("var({})", value)
  }
}
