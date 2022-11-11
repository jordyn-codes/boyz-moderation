// Last time I'm coding for awhile :|
const {Client, IntentsBitField, Partials} = require('discord.js')
let tracker = require('@androz2091/discord-invites-tracker')

global.chalk = require('chalk')
global.client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages
  ],
  partials: [Partials.MessageContent]
})

console.log('Logging into the ' + chalk.red('Developer Portal'))

const express = require('express')
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => {});

client.once('ready', () => {
  console.log(`${chalk.greenBright('Succcessfully')} logged in as ${chalk.blue(client.user.tag)}`)

  client.user.setActivity('you boys.')

  console.log(`Creating ${chalk.red('slash commands')}`)
  require('./core/slash-cmds.js')()

  const d = require("easy-json-database")
  global.config = new d('./core/data/config.json')
  global.emojis = require('./core/data/emojis.json')
})
client.on('interactionCreate', interaction => {
  
  if(interaction.isCommand()){
    let i = interaction
    require(`./core/cmds/${interaction.commandName}`)(i)
  }
})
client.on('guildMemberAdd', member => {
  require('./core/logging/onJoin.js')(member)
})
client.on('guildMemberRemove', member => {
  require('./core/logging/onLeave.js')(member)
})


client.login(process.env.token)