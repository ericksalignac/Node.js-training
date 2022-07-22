const express = require('express')
const exphbs = require('express-handlebars')
const pool = require('./db/conn')

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

  const insertQuery = `INSERT INTO books (??, ??) VALUES (?, ?)`
  const data = ['title', 'pageqty', title, pageqty ]

  pool.query(insertQuery, data, function(err) {
    if(err){
      console.log(err)
      return
    }
    res.redirect('/books')
  })

} )

app.get('/books', (req, res) => {
  const selectQuery = "SELECT * FROM books"

  pool.query(selectQuery, function (err, data){
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
  const idQuery = `SELECT * FROM books WHERE ?? = ?`
  data = ['id', id]

  pool.query(idQuery, data, function (err, data){
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
  const sql = `SELECT * FROM books WHERE ?? = ?`
  const data = ['id', id]

  pool.query(sql, data, function (err, data){
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

  const uptadeQuery = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?`
  const data = ['title', title, 'pageqty', pageqty, 'id', id]

  pool.query(uptadeQuery, data, function (err, data){
    if(err){
      console.log(err)
      return
    }
  })
  res.redirect('/books')
})

app.post('/books/remove/:id', (req, res) => {
  id = req.params.id
  const sql = `DELETE FROM books WHERE ?? = ?`
  const data = ['id', id]

  pool.query(sql, data, function (err){
    if(err){
      console.log(err)
      return
    }
  })

  res.redirect('/books')
})

app.listen(3000)
