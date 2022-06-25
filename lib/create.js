const axios = require('axios')
const inquirer = require('inquirer')
let downLoadFn = require('download-git-repo')
const {promisify} = require('util')
const ora = require('ora')
const process = require("process");
downLoadFn = promisify(downLoadFn)

async function fetchInfo(repoName, tmpName) {
  const token = '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';
  const url1 = `https://api.github.com/users/${repoName}/repos` //项目名
  const url2 = `https://api.github.com/repos/${repoName}/${tmpName}/tags` //项目中的版本
  const headers = {Authorization: 'token ' + token}
  const url = !tmpName ? url1 : url2
  const {data} = await axios({
    method: 'get',
    url,
    headers
  })
  return data
}

// 耗时样式
function addLoading(fn) {
  return async function (...args) {
    const spinner = ora('正在查询')
    spinner.start()
    const ret = await fn(...args)
    spinner.stop()
    return ret
  }
}

// 下载github项目,利用:download-git-repo + 缓存(就是在客户端创建一个隐藏文件)
/**
 * 下载操作
 * @param proName 项目名
 * @param repo 模板名
 * @param tag 版本号
 * @returns {Promise<void>}
 */
async function downLoadRepo(proName,repo,tag) {
  // 定义缓存目录：
  const cache = `${process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME']}/.whj_tmp/${repo}`;
  let api = `${proName}/${repo}`
  if(tag){
    api+=`#${tag}`
  }
  // console.log(api)
  const spinner = ora('正在下载')
  spinner.start()
  await downLoadFn(api, cache);
  spinner.stop()
  return cache
}


// 命令： ml crt zcegg

module.exports = async function (...params) {
  // 注意！一小时只能请求60次，解决：进入这里获取一个新的token https://github.com/settings/tokens
  // token: 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  请求的时候带上token
  // 此时从60变成了5000
  const data = await addLoading(fetchInfo)(...params)
  // console.log("data:",data)
  const repos = data.map(item => item.name)

  // 问题：
  const queList = [
    {
      type: 'list', // 问题类型，当前是输入型问题
      name: 'tmpRepo',// 用来接收当前问题的答案
      message: '请选择仓库模板',
      choices: repos
    }
  ]

  // 处理问题
  const {tmpRepo} = await inquirer.prompt(queList)

  // 处理版本信息
  const ret = await addLoading(fetchInfo)(params[0], tmpRepo)
  const r = ret.map(item => item.name)


  const {version} = await inquirer.prompt([
    {
      type: 'list', // 问题类型，当前是输入型问题
      name: 'version',// 用来接收当前问题的答案
      message: '请选择version',
      choices: r
    }
  ])
  const result = await downLoadRepo(params[0], tmpRepo, version)
  console.log("result: ",result)

}