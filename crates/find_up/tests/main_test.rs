use find_up::FindUp;
use std::fs::read_to_string;

#[test]
fn it_finds_the_package_json() {
  let find_up = FindUp::builder().build();
  let path = find_up.find("package.json", None::<&str>).unwrap();
  println!("{:?}", path);
}
