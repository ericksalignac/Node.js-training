const fs = require('fs');

console.log('Inicio');

fs.writeFileSync('arquivo.txt', 'Oi');

console.log('Fim');