#! /usr/bin/env node

// 命令行美化：自动美化了 --help命令
const {program} = require('commander')
const version = require('../package.json').version
const mainFun = require('..') // 此处相当于找到了package.json中的main字段

/**
 * 创建单个命令
 */
// program
//   .command('create') //命令名称
//   .alias('crt') //别名
//   .description('创建项目')
//   .action(()=>{
//     // 命令 ml crt 会执行这里的逻辑
//     console.log('"create" 命令执行了')
//   })

/**
 * 创建多个命令
 */
const actionsMap = {
  // 命令名称
  create: {
    alias: 'crt',
    dec: "创建项目",
    examples: [ //释例代码
      'ml create|crt <projectname>'
    ]
  },
  config: {
    alias: 'cfg',
    dec: "配置项目",
    examples: [ //释例代码
      'ml config|cfg set <key> <val>',
      'ml config|cfg get <key>',
    ]
  }
}
// 遍历上方的actionsMap，统一添加到工具包中
// 只要一执行ml命令，就会执行下方遍历
Object.keys(actionsMap).forEach(key => {
  program
    .command(key)
    .alias(actionsMap[key].alias)
    .description(actionsMap[key].dec)
    .action(() => {
      // d()
      mainFun(key, process.argv.slice(3))
    })
})

/**
 * 监听 --help 命令
 * 自己写Example
 */
program.on('--help', () => {
  console.log("Examples:")
  for (const value of Object.values(actionsMap)) {
    for (const example of value.examples) {
      console.log(" ", example)
    }
  }
})

/**
 *  调用内置version命令
 *  ml -V|--version
 */
program.version(version).parse(process.argv);

// 有了上面的就不需要下方的了，不然要重复执行
// program.parse(process.argv)
