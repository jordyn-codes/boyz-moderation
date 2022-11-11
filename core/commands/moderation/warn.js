const {EmbedBuilder} = require('discord.js')
var convert = require('color-convert');

module.exports = async function(interaction){
  /* Get options from the command input */
  let user = interaction.options.getUser("user")
  let reason = interaction.options.getString("reason")
  let notify = interaction.options.getBoolean("dm")

  /* Get config variables */
  let config = new database('./core/database/config.json')
  let command = config.get('commands.warn')
  let color = config.get('colors.moderation.warn')
  
  /* Check certain values and sets defaults */
  if(command.disable === true){
    debug('DEBUG', '[WARN] This command is disabled')
    interaction.reply({content: emojis.error + ' This command has been disabled!', ephemeral: true})
    return
  }
  if(command.forceNotify === true){
    //Forces the user to be notified regardless of the parameter
    notify = true
    debug('DEBUG', '[WARN] Set "notify" to force value')
  }
  if(notify === null){
    //Sets the notify status to be default if none provided
    notify = command.defaultNotify
     debug('DEBUG', '[WARN] Set "notify" to default')
  }

  /* Check blacklist status*/
  let bl = await require('./../../functions/check-bl.js')({
    user: interaction.user.id,
    channel: interaction.channel.id,
    roles: await interaction.member.roles.cache,
    command: command
  })
  if(!bl){
    debug('ERROR', '[WARN] No value returned (check-bl)')
    interaction.reply({content: emojis.error + ' Oops, an unexpected error has occured. Please try again later.', ephemeral: true})
    return
  }
  if(bl.status === false){
    if(bl.reason === 1){
      debug('DEBUG', '[WARN] Command disabled in channel')
      interaction.reply({content: emojis.error + ' You are not allowed to use this command in this channel!', ephemeral: true})
    } else {
      debug('DEBUG', '[WARN] User is blacklisted')
      interaction.reply({content: emojis.error + " You are not allowed to use this command!", ephemeral: true})    
    }
  
    return
  } 

  /* Register user if they are not */
  let users = new database('./core/database/users.json')
  let u = users.get(user.id)
  if(!u) await require('./../../functions/register-user')(user)
  
  /* Set the colors up for later use */
  color = convert.hex.ansi256(color)

  /* Send an embed to the user */
  if(notify === true){
    debug('DEBUG', 'Notifying the user on warn')
    user.send({embeds: [{
      title: "Warning Given",
      author: {
        name: `${interaction.guild.name}`,
        icon: `${interaction.guild.iconURL()}`
      },
      description: `You have been warned in The Boy\\'s House for an rule violation. Please make sure to re-read our rules, and Discord's [**Terms's of Service**](https://www.discord.com/terms) and discontinue violations.\n\n    The below reason has been provided by an moderator who has taken this action. To report issues, please contact an admin.\n    **Provided Reason**: ${reason}`,
      color: color 
    }]
}).catch(error => {debug('ERROR', 'Error occured when messaging user')})
  }

  const modlog = new EmbedBuilder()
  .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL()})
  .setColor(color)
  .setDescription(`
  **User**: \`${user.tag}\`, (${user.id})
  **Action**: Warning Issued
  **Reason**: ${reason}`)
  .setFooter({text: `Case # ${config.get('case')}`, iconURL: interaction.guild.iconURL()})
  .setTimestamp()

  let channel = command.loggingChannel
  channel = client.channels.cache.get(channel)

  channel.send({embeds: [modlog]})

  config.add('case', 1)
  
  users.push(user.id + '.cases', {
    timestamp: Math.floor(Date.now() / 1000),
    action: "Warning",
    reason: reason,
    moderator: interaction.user.id,
    expiration: null //This won't remove the item in the future, it just tells whether/not it was temporary. Warns are
  })

  interaction.reply({content: `${emojis.success} Successfully gave warning to \`${user.tag}\`.`, ephemeral: true})
}