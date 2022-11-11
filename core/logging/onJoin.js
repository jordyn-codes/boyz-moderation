const {EmbedBuilder} = require('discord.js')

module.exports = function(member){
  let channel = '1030474386035179561'
  channel = client.channels.cache.get(channel)
  let random = GetRandomString()

  let embed = new EmbedBuilder()
  .setColor(config.colors.welcome)
  .setDescription(`Welcome to **The Boy's House**! We ${random} please make sure to do the following:
  > \`✔\` Visit <#1028832715434377246> and <#1028832740889608232> for roles
  > \`✔\` Read our <#1028826091135189012>
  > \`✔\` Introduce yourself in <#1028836081589829756>
  > \`✔\` Say hello in our <#1028845649308958820>.
  > \`✔\` Check out <#1028855150636449902> (NSFW)

  Interested in gaining access to NSFW channels? All you have to do is either <#1029072900273209449>, or getting the 18+ role!`)
  .setAuthor({name: member.user.tag, iconURL: member.user.displayAvatarURL()})
  .setFooter({text: client.user.tag, iconURL: client.user.displayAvatarURL()}) 

  channel.send({embeds: [embed], content: `<@${member.id}>`})

  //This will message the user (unless they are bots, bots cannot message other bots).Useful when multiple users join and it's hard to find your own welcome message.
  if(!member.user.bot){
   member.send('**Welcome Message** (in case you get lost):\nhttps://discord.com/channels/1028822464454729749/1030474386035179561/1031255159017316442').catch(error => {
    return //Ignore users who cannot be messaged
  }) 
  }
}

function GetRandomString(){
  let array = [
    "are excited to see you here,",
    "are happy to have you,",
    "hope you will have a positive impact,",
    "are very glad that you've arrived,",
    "are hopeful you have brought pizza,",
    "are excited to see you and hope you stick around,",
    "hope you are okay today,",
    "you are having a good day,",
    "bought pizza and tacos for you, "
  ]

  var item = array[Math.floor(Math.random()*array.length)];
  return item
}