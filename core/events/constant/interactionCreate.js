module.exports = function(i){
  if(i.isCommand()) return IsCommand(i)

}

async function IsCommand(interaction){
  let fs = require('fs')

  //Get categories
  let categories = await fs.readdirSync('./core/commands')

  //Define two important command variables
  let found = false
  let path = './../../commands/'

  //Loop through categories, then commands.
  for(const cat of categories){
    let commands = await fs.readdirSync(`./core/commands/${cat}`)

    for(let command of commands){
      //Split the ".js" off of the command name
      command = command.split('.')[0]

      if(command === interaction.commandName){
        found = true
        path = path + `${cat}/${command}`
      }
    }
  }

  if(found === false){
    interaction.reply({content: emojis.error + ' An internal error has occured, please try again later :slight_smile:', ephemeral: true})
    return
  }
  require(path)(interaction)
}