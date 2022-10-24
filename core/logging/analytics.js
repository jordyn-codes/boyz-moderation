const db = require("easy-json-database")
const wait = require('wait')

let data = new db('./core/data/analytics.json')  
let monitoring = new Map()

module.exports = function(m, type){
  if(type === 'add') return GuildMemberAdd(m)
  if(type === 'leave') return GuildMemberRemove(m)
}

function GuildMemberAdd(member){
  let joinCount = data.get('totalJoins')

  data.add('totalJoins', 1)
}


const moment = require('moment')

async function GuildMemberRemove(member){
  data.add('totalLeaves', 1)

  if(!member) return

  let joined = new Date(member.joinedAt)
  let now = new Date()
  
  const msInHour = 1000 * 60 * 60;
  let date = Math.round(Math.abs(now - joined) / msInHour);

  var totalMembers = await GetCount(member)
  var totalJoins = data.get('totalJoins')
  var totalLeaves = totalMembers - totalJoins
  
  if(date <= 1) return data.add('joinLeaves', 1)

  data.add('keptJoins', 1)
}
async function GetCount(member){
  let members = await member.guild.members.fetch()
  let count = 0
  
  members.forEach(m => {
    count = count + 1
  })

  return count
}
//totalJoins - amount of total member joins 
//totalLeaves - amount of total members leaving
//joinleaves - amount of members who join then leave
//keptJoins - amount of members who actually stay