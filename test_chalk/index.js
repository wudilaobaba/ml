const chalk = require('chalk')
console.log(chalk.green("绿色"))
// console.log(test_chalk.key("red")('红色'))
console.log(chalk.hex('#ffffff')('白色'))

/**
 * 背景色
 */
console.log(chalk.bgBlackBright(chalk.green('213')))

/**
 * 格式化输出
 */
console.log(chalk.green.bold`
  {red 春晓}
  床前明月光，
  一是盯上双
`)