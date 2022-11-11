module.exports = function(type, message){
  if(type === 'WARN'){
    //Warnings are not errors, just given a heads up
    console.log(chalk.yellowBright('[WARN]'), message)
  }
  if(type === 'DEBUG'){
    //Info just gives a little bit of information
    console.log(chalk.blueBright('[INFO]'), message)
  }
  if(type === 'ERROR'){
    //Errors are when the code throws an error
    console.log(chalk.redBright('[ERROR]'), message)
  }
  if(type === 'FATAL'){
    //Fatal errors are when the code runs into an immediate issue
    console.log(chalk.redBright('[FATAL]'), message)
  }
}
