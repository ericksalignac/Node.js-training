// external modules
const inquirer = require('inquirer')
const chalk = require('chalk')

// core modules
const fs = require('fs')

// create operation
operation()

function operation(){
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'O que você deseja fazer?',
      choices: ['Criar conta', 'Consultar Saldo', 'Depositar', 'Sacar', 'Sair'],
    },
  ])
  .then((answer) => {
    const action = answer['action']
    switch (action){
      case 'Criar conta': 
        createAccount()
        buildAccount()
        break;
      case 'Consultar Saldo': getAccountBalance()
        break

      case 'Depositar': deposit()
        break

      case 'Sacar': withdraw()
        break

      case 'Sair':
        console.log(chalk.bgBlue.black("\r\nObrigado por usar o Accounts!\r\n"))
        process.exit()

    }
  })
  .catch((err) => console.log(err))
}

// create an account
function createAccount(){
  console.log(chalk.bgGreen.black("\n\rParabéns por escolher o nosso banco!"))
  console.log(chalk.green('Defina as opções da sua conta a seguir:\n\r'))
}

function buildAccount(){
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Digite um nome para sua conta:'
      },
    ])
    .then((answer) => {
      const accountName = answer['accountName']
      
      if(!fs.existsSync('accounts')){
        fs.mkdirSync('accounts')
      }

      if(fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.bgRed.black("Esta conta já existe, escolha outro nome!"))
        buildAccount()
        return
      }
      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{"balance": 0}',
        function(err){
          console.log(err)
        },
      )

      console.log(chalk.green(`Parabéns, ${accountName} a sua conta foi criada!`))
      operation()
    })
    .catch((err) => console.log(err))
}

// add an ammount to user account
function deposit() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Qual o nome da sua conta?'
      }
    ])
    .then((answer) => {
      const accountName = answer['accountName']

      if(!checkAccount(accountName)){
        return deposit()
      }

      inquirer.prompt([
        {
          name: 'amount',
          message: 'Quanto você deseja depositar?'
        }
      ])
      .then((answer) => {
        const amount = answer['amount']
        addAmount(accountName, amount)
        operation()
      })
      .catch((err) => console.log(err))

    })
    .catch((err => console.log(err)))
}

// verify if account exists
function checkAccount(accountName) {
  if(!fs.existsSync(`accounts/${accountName}.json`)){
    console.log(chalk.bgRed.black("\n\rEsta conta não existe, escolha outro nome!\r\n"))
    return false
    }
    return true
}

// add an amount
function addAmount(accountName, amount){
  const accountData =  getAccount(accountName)

  if(!amount){
    console.log(chalk.bgRed.bgBlack('Ocorreu um erro, tente novamente mais tarde!'))
    return operation()
  }

  accountData.balance = parseFloat(accountData.balance) + parseFloat(amount)
  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err)
    }
  )

  console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta`))

}

// get account
function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: 'utf8',
    flag: 'r'
  })
  return JSON.parse(accountJSON)  
}

// show accont balance
function getAccountBalance(){
  inquirer
    .prompt([{
      name: 'accountName',
      message: 'Qual o nome da sua conta?'
    }])
    .then((answer) => {
      const accountName = answer['accountName']
      // verify if account exists
      if(!checkAccount(accountName)){
        return operation()
      }

      const accountData = getAccount(accountName)

      console.log(chalk.bgBlue.black(`\n\rOlá ${accountName}! Seu saldo é de R$${accountData.balance}\n\r`))
      operation()
    })
    .catch(err => console.log(err))
}

// withdraw an amount from user account
function withdraw(){
  inquirer
    .prompt([{
      name: 'accountName',
      message: 'Qual o nome da sua conta?'
    }])
    .then((answer) => {
      const accountName = answer['accountName']
      if(!checkAccount(accountName)) {
        return operation()
      }

      inquirer
        .prompt([{
          name: 'amount',
          message: 'Quanto você deseja sacar?'
      }])
      .then((answer) => {
        const amount = answer['amount']

        const accountData = getAccount(accountName)

        if(amount <= 0 || !amount ) {
          console.log(chalk.bgRed.black("\n\rNúmero inválido! Não foi possível completar a operação.\n\r"))
          return operation()
        }

        if(accountData.balance >= amount){
          accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)
          fs.writeFileSync(
            `accounts/${accountName}.json`,
            JSON.stringify(accountData),
            function (err) {
              console.log(err)
            }
          )

          console.log(chalk.green(`Saque de R$${amount} efetuado com Sucesso! Novo saldo é de R$${accountData.balance}`))
          operation()
        } else {
          console.log(chalk.bgRed.black("\n\rSaldo insuficiente! Não foi possivel completar a operação.\n\r"))
          return operation()
        }

      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}