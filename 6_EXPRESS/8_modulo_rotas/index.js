const express = require('express')
const app = express()
const port = 3000 // variável de ambiente

const path = require('path')

// ler o body
app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

const basePath = path.join(__dirname, 'templates')

app.listen(port, () => {
  console.log(`App rodado na porta ${port}`)
})

app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})

