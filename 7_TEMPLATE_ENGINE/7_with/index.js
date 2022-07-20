const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/dashboard', (req, res) => {

  const items = ['Item a', 'Item b', 'Item c']

  res.render('dashboard', {items})
})

app.get('/post', (req, res) => {
  const post = {
    title: 'Aprender Node.js',
    category: 'Javascript',
    body: 'Este artigo vai te ajudar a aprender sobre Node.js...',
    comments: 4
  }

  res.render('blogpost', {post})

})

app.get('/', (req, res) => {

  const user = {
    name: 'Matheus',
    surname: 'Battisti',
    age: 30,
  }

  const palavra = "Teste"

  const auth = true

  const approved = false

  res.render('home', {user: user, palavra, auth, approved})
})

app.listen(3000, () => {
  console.log('Running on http://localhost:3000/')
})
