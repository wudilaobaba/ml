module.exports = function (actionName, projectName){
  require(`./${actionName}`)(...projectName)
}