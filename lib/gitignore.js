const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const giparser = require('gitignore-parser')

function gitignore(templateDir) {
  const gitignorePath = path.join(`${templateDir}/.gitignore`)
  const gitignoreExist = fs.existsSync(gitignorePath)

  let gitignoreFile = null
  let ignoredPatterns = null

  if (gitignoreExist) {
    gitignoreFile = fs.readFileSync(`${templateDir}/.gitignore`, 'utf8')
    ignoredPatterns = giparser.compile(gitignoreFile)
  }

  return function shouldSkip(fileDir) {
    if (fileDir === '.git') return true

    if (gitignoreExist) {
      const shouldIgnore = ignoredPatterns.denies(fileDir)
      shouldIgnore && console.log(chalk.green(fileDir), chalk.red('skipped!'))

      return shouldIgnore
    }

    return false
  }
}

module.exports = gitignore
