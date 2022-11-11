module.exports = async function(client, chalk){
  global.client = client
  global.chalk  = chalk
  global.database = require('easy-json-database')
  global.emojis = require('./../../database/emojis.json')
    
  console.log(`${chalk.blue('[LOGIN]')} Logged in as ${client.user.tag}`)

  //Host the server on express
  const express = require('express')
  const app = express();
  const port = 3006;
  
  app.get('/', (req, res) => res.send(':)'));
  app.listen(port, () => {
    console.log(`${chalk.blue('[HOSTING]')} Started hosting using express`)
  });

  //Set the activity
  try {
    const {ActivityType} = require('discord.js')
    client.user.setActivity('with you :)', {
      type: ActivityType.Playing
    })

    console.log(`${chalk.blue('[ACTIVITY]')} Set activity!`)
  } catch(error){
    console.log(`${chalk.blue('[ACTIVITY]')} Error: ${error.message}`)
  }

  //Create slash commands
  require('./../../functions/create-slash.js')()
}