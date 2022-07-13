const EventEmmiter =  require('events');
const eventEmmiter = new EventEmmiter();

eventEmmiter.on('start', () => {
  console.log('Durante');
})

console.log('Antes')

eventEmmiter.emit('start')

console.log('Depois')