const {SlashCommandBuilder, ChannelType} = require('discord.js')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

let token = process.env.token
let clientId = client.user.id
let guildId = '1028822464454729749'

module.exports = async function(){
  let commands = await SetSlashCommands()

  if(commands === false) return console.log(chalk.red('Error registering commands: Unable to register commands'))

  commands = commands.map(command => command.toJSON());

  
  const rest = new REST({version: '9'}).setToken(token)
  
  rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });

  console.log(`${chalk.greenBright('Successfully')} registered ${chalk.blue('slash commands')}`)
}

function SetSlashCommands(){

  let source = new SlashCommandBuilder()
  .setName('source-code')
  .setDescription('Read about our source code.')

  //If one of the core commands are not above, return false
  if(!source) return false 

  return [source]
}