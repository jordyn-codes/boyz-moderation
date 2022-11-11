module.exports = function(interaction){

  /* Configuration setup */
  let config = new database('./core/database/config.json')
  let command = config.get('commands.purge')

  /* Circumstance setup */
  if(command.disable === true){
    interaction.reply({content: emojis.error + ' This command has been disabled!'})
    return
  }

  /* Options */
  const defaults = command.defaults

  let amount = interaction.options.getInteger('amount')
  let bots = interaction.options.getBoolean('bots')
  let hooks = interaction.options.getBoolean('webhooks')
  let attach = interaction.options.getBoolean('attachments')
  let embeds = interaction.options.getBoolean('embeds')
  let user = interaction.options.getUser("user")

  /* Set defaults*/
  if(!bots){
    debug("DEBUG", '[PURGE] Set "bots" to default')
    defaults.includeBots
  } if(!hooks){
    debug("DEBUG", '[PURGE] Set "webhooks" to default')
    defaults.includeWebhooks
  } if(!attach){
    debug("DEBUG", '[PURGE] Set "attachments" to default')
    attach = defaults.includeAttachments
  } if(!embeds){
    debug("DEBUG", '[PURGE] Set "embeds" to default')
    embeds = defaults.includeEmbeds
  }
  
}


