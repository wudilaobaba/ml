const ora = require('ora')
const spinner = ora('正在下载')

spinner.start()
spinner.color = 'yellow';
setTimeout(() => {
  spinner.succeed("下载成功")
  spinner.fail("下载成功")
  spinner.info("下载成功")
  spinner.warn("下载成功")
}, 3000)