module.exports = function(user){
  //"user" is an user object

  if(user.bot) return
  
  let users = new database('./core/database/users.json')
  let userdata = users.get(user.id)

  if(userdata) return userdata

  users.set(user.id, {
    ban: {
      bannedUntil: null,
      reason: null,
      moderator: null
    },
    cases: []
  })
}