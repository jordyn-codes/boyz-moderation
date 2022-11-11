module.exports = function(client){
  const chalk = require('chalk')
  
  client.once('ready', () => {    
    require('./once/ready.js')(client, chalk)
  })
  client.on('interactionCreate', (interaction) => {  
    require('./constant/interactionCreate.js')(interaction)
  })
  client.on('guildMemberAdd', member => {
    require('./constant/guildMemberAdd')(member)
  })
  client.on('messageCreate', message => {
    require('./constant/messageCreate')(message)
  })
}