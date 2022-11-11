//Last time Im coding for awhile
const {Client, IntentsBitField, Partials} = require('discord.js')
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages
  ],
  partials: [Partials.MessageContent]
})

global.debug = require('./core/functions/debug.js')
debug('INFO', '[AUTH] Attempting connection')

require('./core/events/.events.js')(client)

client.login(process.env.token)