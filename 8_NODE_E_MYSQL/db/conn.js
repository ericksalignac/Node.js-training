const mysql = require('mysql')

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "192.168.1.5",
  user: 'root',
  password: 'c4ll$erv12',
  database: 'nodemysql'
})

module.exports = pool