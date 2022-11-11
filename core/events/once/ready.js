module.exports = async function(client, chalk){
  global.client = client
  global.chalk  = chalk
  global.database = require('easy-json-database')
  global.emojis = require('./../../database/emojis.json')

  //Host the server on express
  const express = require('express')
  const app = express();
  const port = 3006;
  
  app.get('/', (req, res) => res.send(':)'));
  app.listen(port, () => {
    debug('DEBUG', '[HOSTING] Hosted on web-server')
  });

  //Set the activity
  try {
    const {ActivityType} = require('discord.js')
    client.user.setActivity('with you :)', {
      type: ActivityType.Playing
    })

    debug('DEBUG', '[ACTIVITY] Successfully set activity')
  } catch(error){
    debug('ERROR', '[ACTIVITY] Error occurred while setting activity.')
  }

  debug('INFO', '[AUTH] Logged in as ' + client.user.tag)
  //Create slash commands
  require('./../../functions/create-slash.js')()
}