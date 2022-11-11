const {SlashCommandBuilder, ChannelType} = require('discord.js')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

//Define required variables
let token = process.env.token
let clientId = client.user.id
let guildId = '1028822464454729749'

module.exports = async function(){
  let commands = await SetSlashCommands()

  //Convert commands to JSON
  commands = commands.map(command => command.toJSON());

  //Create commands in API
  const rest = new REST({version: '9'}).setToken(token)
  rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });

  console.log(`${chalk.blue('[COMMANDS]')} Created commands`)
}

async function SetSlashCommands(){

  let source = new SlashCommandBuilder()
  .setName('source-code')
  .setDescription('Read about our source code.')

  let warn = new SlashCommandBuilder()
  .setName('warn')
  .setDescription('Give an warning to an user')
  .addUserOption(option => 
    option.setName('user')
    .setDescription('The user to warn')
    .setRequired(true))
  .addStringOption(option => 
    option.setName('reason')
    .setDescription('The reason for the warning')
    .setRequired(true)
    .setMinLength(5))
  .addBooleanOption(option => 
    option.setName('dm')
    .setDescription('Message the user about the warning.'))
    
  return [source, warn]
}
