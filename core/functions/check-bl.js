module.exports = async function(data){
  let user = data.user
  let channel = data.channel
  let roles = data.roles
  let command = data.command //Config
  let blacklists = command.blacklists
    
  if(!user||!channel||!roles||!command){
    return null
  }
  
  if(blacklists.users.find(a => a === user)) return {
    status: false,
    reason: null
  }
  if(blacklists.channels.find(a => a === channel)) return {
    status: false,
    reason: 1
  }

  if(blacklists.roles[0]) return console.log(chalk.blue("[BL] Role blacklisting has been disabled until further updates."))
  
  return {
    status: true
  }
  /* 
  null - Incomplete
  false - Blacklisted
  true - Not blacklisted
  */
}
