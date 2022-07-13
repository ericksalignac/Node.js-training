const chalk = require('chalk')

const nota = 9

if(nota >= 10){
  console.log(chalk.green('Parabéns! Você foi aprovado!'))
}
else {
  console.log(chalk.bgRed.black('Você precisa fazer a prova de recperação'))
}
