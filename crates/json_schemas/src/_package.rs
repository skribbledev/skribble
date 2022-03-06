use serde::{Deserialize, Serialize};

#[doc = "A person who has been involved in creating or maintaining this package."]
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Person {
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub email: Option<String>,
    pub name: String,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub url: Option<String>,
}
#[doc = "JSON schema for NPM package.json files"]
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct PackageJson {
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub author: Option<Person>,
}
