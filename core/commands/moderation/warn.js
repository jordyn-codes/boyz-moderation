let {EmbedBuilder, ButtonBuilder, ButtonStyle} = require('discord.js')

let warning = 'https://cdn.discordapp.com/attachments/1029070111216242708/1039575523514404935/warning.png'

module.exports = async function(interaction){
  //Get all of the strings 
  let user   = interaction.options.getUser('user')
  let reason = interaction.options.getString('reason')
  let notify = interaction.options.getBoolean('dm') || false

  //Alias
  let u = user

  //Get configuration
  const config = require('./../database/config.json')
  const command = config.commands["warn"]

  //Check for certain circumstances
  if(command.disable === true){
    interaction.reply({content: emojis.error + ' This command has been disabled.', ephemeral: true})
    return
  }
  if(user.bot){
    interaction.reply({content: emojis.error + ' The user cannot be an bot application', ephemeral: true})
    return
  }

  //Check if the user is in the guild
  try {
   user = await interaction.guild.members.fetch(user.id)    
  } catch(error){
    interaction.reply({content: emojis.error + ' The user must be in server', ephemeral: true})
    return 
  }

  //This is responsible for checking if the msg was sent
  let data = {
    sentMessage: 'Notifications are disabled'
  }

  //Sends if"forceNotify" is enabled, or if option is used
  if(notify === true||command.forceNotify == true){
    const embed = new EmbedBuilder()
    .setColor('EFABAB')
    .setTitle('Warning Given')
    .setAuthor({name: "The Boy's House", iconURL: interaction.guild.iconURL()})
    .setDescription(`You have been warned for an rule violation, please make sure to re-read our rules and discontinue any potiental rule violations.\n**Reason**: ${reason}`)
    
    let m = await u.send({embeds: [embed]}).catch(e => {
      data.sentMessage = 'Unable to send messages to user'
    })
    if(m){data.sentMessage = "The user has been notified"}
    
  }

  let channel = client.channels.cache.get(command.channel)
  let webhook = command.webhookId

  //Responsible for returning the webhook or creating new
  if(!webhook){
    webhook = await channel.createWebhook({
      name: "Moderation Logging",
      avatar: './core/images/bot-icon.png',
      reason: "Creating webhook for moderation logging"
    })
    let c = new database('./core/database/config.json')
    c.set('commands.warn.webhookId', webhook.id)
  } else {
    let found = false
    let webhookList = await channel.fetchWebhooks()
    webhookList.forEach(hook => {
      if(hook.id !== webhook) return 
      webhook = hook
      found = true
    })

    //Creates a new one if its not found anyways (invalid id)
    if(found === false){
      webhook = await channel.createWebhook({
      name: "Moderation Logging",
      avatar: './core/images/bot-icon.png',
      reason: "Creating webhook for moderation logging"
    })
      let c = new database('./core/database/config.json')
      c.set('commands.warn.webhookId', webhook.id)
    }
  }


  let color = config.colors["warn.modlogs"] || config.colors["main.theme"]
  
  //Define the embed which sends to modlogs
  const modlogs = new EmbedBuilder()
  .setColor(color)
  .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL()})
  .setTitle('Action Taken')
  .setDescription(`**Action**: Warning
  **Reason**: ${reason || "None provided"}
  **Moderator**: ${interaction.user} - ${interaction.user.id}
  **Notification**: ${data.sentMessage}
  **Suspect**: ${user} - ${user.id}`)
  .setThumbnail(warning)
  
  webhook.send({embeds: [modlogs]})

  //Database stuff
  let users = new database('./core/database/users.json')
  let userdata = users.get(u.id)

  //Force register the new user
  if(!userdata){
    await require('./../functions/register-user')(u)
  }

  //Add another warning to the warnings array
  users.push(u.id + '.warnings', {
    timestamp: Math.floor(Date.now() / 1000),
    moderator: interaction.user.id,
    reason: reason || "None provided",
    id: Math.floor(Date.now() / 1000).toString(10)
  })
  
  interaction.reply({content: `${emojis.success} Successfully gave the user an warning.`, ephemeral: true})
}

//Returns a object with two values based on the raw input