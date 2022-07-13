// mais de m valor
const x = 10
const y = "Erick"
const z = [1,2]

console.log(x, y, z)

//contagem de impressões
console.count(`O valor de x é: ${x}, contagem`)
console.count(`O valor de x é: ${x}, contagem`)
console.count(`O valor de x é: ${x}, contagem`)

//variável entre strings
console.log("O nome dele é %s e ele é programador", y)

//limpando o console
setTimeout(() => {
  console.clear()
}, 2000);