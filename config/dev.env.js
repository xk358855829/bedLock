'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')


module.exports = merge(prodEnv, {
NODE_ENV: '"development"',
// API_ROOT:'"http://192.168.2.195:12000"'
API_ROOT:'"http://39.104.99.181:12000"'//家庭
// API_ROOT:'"http://39.104.99.181:12010"'//客户
// API_ROOT:'"http://39.104.113.112:20189"'//客服
})