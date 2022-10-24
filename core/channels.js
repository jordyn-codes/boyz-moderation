const {EmbedBuilder} = require('discord.js')

module.exports = function(){
  var channel = '1031725246497181738'
  var t = {
    category: '<:category:1031731265986117674>',
    rules: '<:rules:1031731277826629642>',
    announcement: '<:announcement:1031731264719441970>',
    notification: '<:notification:1031731273816879114>',
    id: '<:identification:1031731271287722044>',
    directory: '<:directory:1031731268863397970>',
    
  }
  
  const embed = new EmbedBuilder()
  .addFields(
    {
    name: 'House Information',
    value: `
${t.category} <#1028827464471953479>  - Read about our server in this channel
${t.rules} <#1028826091135189012>  - The official rules of the server
${t.category} <#1028827521808076801> - Our staff positions that we offer
${t.announcement} <#1028832317805965322> - Our announcement for the server
${t.notification} <#1028832360814358569> - The changelog
${t.id} <#1029072900273209449> - Verify your age in this channel to access NSFW
${t.notification} <#1031694697397231627> - 
${t.directory} <#1031725246497181738> `
  })
}