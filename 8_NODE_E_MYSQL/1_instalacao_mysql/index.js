const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express()

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('home')
})

app.post('/books/insertbook', (req, res) => {
  const title = req.body.title
  const pageqty = req.body.pageqty

  const sqlQuery = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`
  conn.query(sqlQuery, function(err) {
    if(err){
      console.log(err)
    }
    res.redirect('/')
  })

} )

const conn = mysql.createConnection({
  host: "192.168.1.5",
  user: 'root',
  password: 'c4ll$erv12',
  database: 'nodemysql'
})

conn.connect(function(err){
  if(err){
    console.log(err)
  }

  console.log('Conectou ao MySQL!')
  app.listen(3000)

  console.log('App is running on port http://localhost:3000/')
})