const mysql = require("mysql");
const util = require("util");

// SELECT * FROM usuarios; // consulta en crudo
// Query builder knex
// ORM Eloquent

let pool = mysql.createPool({
  host: "localhost",
  password: "",
  user: "root",
  port: 3306,
  database: "ecommerce1",
  connectionLimit: 10,
});
pool.query = util.promisify(pool.query);

module.exports = pool;
