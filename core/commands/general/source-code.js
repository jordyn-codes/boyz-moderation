let {EmbedBuilder} = require('discord.js')

let cooldown = new Set()
var msg = null

module.exports = async function(interaction){
  let config = require('./../../database/config.json')
  let command = config.commands["source-code"]

  //Check if the command has been disabled
  if(command.disable === true){
    interaction.reply({content: emojis.error + ' This command has been disabled!'})
    return
  }

  //Check for blacklists
  let bl = await require('./../../functions/check-bl.js')({
    user: interaction.user.id,
    channel: interaction.channel.id,
    roles: await interaction.member.roles.cache,
    command: command
  })
  if(bl === null){
    interaction.reply({content: emojis.error + ' Oops, an unexpected error has occured. Please try again later.', ephemeral: true})
    return
  }
  if(bl.status === false){
    if(bl.reason === 1){
      interaction.reply({content: emojis.error + ' You are not allowed to use this command in this channel!', ephemeral: true})
    } else {
      interaction.reply({content: emojis.error + " You are not allowed to use this command!", ephemeral: true})    
    }
  
    return
  }
  
  //Check for cooldown and return error if it is
  if(cooldown.has(interaction.user.id)){
    let cooldownEmbed = new EmbedBuilder()
    .setColor('F05B5B')
    .setTitle(`${emojis.error} Command Cooldown`)
    .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({dynamic: true})})
    .setDescription(`Please wait a few minutes and re-execute the command. The cooldown of the \`/source-code\` command is **10** seconds.`)
    .setFooter({text: `Provided by: ${client.user.username}`, iconURL: client.user.displayAvatarURL({dynamic: true})})
    return interaction.reply({embeds: [cooldownEmbed], ephemeral: true})
  }

  //Add the user to the cooldown Set
  cooldown.add(interaction.user.id)

  //Define the embed and stuff
  let sourceEmbed = new EmbedBuilder()
  .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({dynamic: true})})
  .setColor('F0ED5B')
  .setTitle('Code for `Boy\'s Moderation`')
  .setDescription(`This bot is opened sourced to allow you to view the code and ensure that the bot is not malicious. You may also fork the code and modify it (please modify it - if you do not then credit the original code)
  
  [**\`Github\`**](https://github.com/jordyn-codes/boyz-moderation) (\`github.com\`)
  [**\`Replit\`**](https://replit.com/@jordyn3024/moderation-4#core/cmds/source-code.js) (\`replit.com\`)`)
  .setFooter({text: 'Tip: Cooldown is over when success is reacted.'})

  //Get the message for later
  msg = await interaction.reply({embeds: [sourceEmbed], fetchReply: true})

  //Effectively removes the user and reacts with success
  setTimeout(function(){
    cooldown.delete(interaction.user.id)

    msg.react(emojis.success).catch(error => {
      console.log(`${chalk.blue('[SOURCE]')} Error thrown: ${error.message}`)
    })
  }, 10000)
}