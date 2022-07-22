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

  const insertQuery = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`
  conn.query(insertQuery, function(err) {
    if(err){
      console.log(err)
      return
    }
    res.redirect('/books')
  })

} )

app.get('/books', (req, res) => {
  const selectQuery = "SELECT * FROM books"

  conn.query(selectQuery, function (err, data){
    if(err){
      console.log(err)
      return
    }
    const books = data
    res.render('books', {books})
  })


})

app.get('/books/:id', (req, res) => {
  const id = req.params.id
  const idQuery = `SELECT * FROM books WHERE ID = ${id}`

  conn.query(idQuery, function (err, data){
    if(err){
      console.log(err)
      return
    }
    const book = data[0]
    res.render('book', {book})
  })
})

app.get('/books/edit/:id', (req, res) => {
  const id = req.params.id
  const sql = `SELECT * FROM books WHERE ID = ${id}`

  conn.query(sql, function (err, data){
    if(err){
      console.log(err)
      return
    }
    const book = data[0]
    res.render('editbook', {book})
  })
})

app.post('/books/updatebook', (req, res) => {
  const id = req.body.id
  const title = req.body.title
  const pageqty = req.body.pageqty

  const uptadeQuery = `UPDATE books SET title = '${title}', pageqty = '${pageqty}' WHERE ID = ${id}`

  conn.query(uptadeQuery, function (err, data){
    if(err){
      console.log(err)
      return
    }
  })
  res.redirect('/books')
})

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