module.exports = function(client){
  const chalk = require('chalk')
  
  client.once('ready', () => {
    console.log(`${chalk.blue('[EVENTS]')} Recieved ready event`)
    require('./once/ready.js')(client, chalk)
  })
  client.on('interactionCreate', (interaction) => {
    console.log(`${chalk.blue('[EVENTS]')} Recieved interaction event`)
    require('./constant/interactionCreate.js')(interaction)
  })
  client.on('guildMemberAdd', member => {
    require('./constant/guildMemberAdd')(member)
  })
  client.on('messageCreate', message => {
    require('./constant/messageCreate')(message)
  })
}