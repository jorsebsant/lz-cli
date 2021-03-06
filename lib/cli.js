#!/usr/bin/env node

const program = require('commander')

const pkg = require('../package.json')
const { homeScreen } = require('./view')

const github = require('./github')
const folder = require('./folder')
const generator = require('./generator')

homeScreen()

program.version(pkg.version, '-v, --version')

program
  .command('github <user/repo>')
  .description('Generate scaffold from github user/repo')
  .action(github)

program
  .command('gh <user/repo>')
  .description('(alias) like github but shorter')
  .action(github)

program
  .command('folder <path>')
  .description('Generate scaffold from folder path')
  .action(folder)

program
  .command('f <path>')
  .description('(alias) like folder but shorter')
  .action(folder)

program
  .command('generate <key>')
  .description('Generate scaffold from config file key')
  .action(generator)

program
  .command('g <key>')
  .description('(alias) like config but shorter')
  .action(generator)

program.parse(process.argv)
