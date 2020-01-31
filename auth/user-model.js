const db = require("../database/dbConfig.js");

module.exports = {
  register,
  findBy
};

function register(creds) {
  return db("users").insert(creds);
}

function findBy(filter) {
  return db("users")
    .select("*")
    .where(filter);
}
