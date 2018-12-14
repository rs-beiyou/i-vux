import Mock from 'mockjs'
import { login, logout } from './login'
import { getBrand, getPrice, getSeries } from './sys'
import { getCars } from './cars'

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 600
})

Mock.mock(/\/login/, login)
Mock.mock(/\/logout/, logout)
Mock.mock(/\/getBrand/, getBrand)
Mock.mock(/\/getPrice/, getPrice)
Mock.mock(/\/getSeries/, getSeries)
Mock.mock(/\/getCars/, getCars)

export default Mock
