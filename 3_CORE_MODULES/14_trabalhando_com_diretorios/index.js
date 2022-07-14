const fs = require('fs')
if (!fs.existsSync('./minhapasta')){
  console.log('Não Existe! Criando agora...')
  fs.mkdirSync('minhapasta')
  console.log('Pasta criada!')
} else {
  console.log('A pasta já existe!')
}
