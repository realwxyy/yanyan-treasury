import { deviceInit } from './util/device'

const globalData = {}
const methodMap = {
  onLaunch() {
    this.cloudInit()
    this.getOpenId()
  },
  onShow() {
    deviceInit()
  }
}
const customMap = {
  cloudInit() {
    wx.cloud.init({
      traceUser: true,
      env: 'pro-2ggtpodq64505705'
    })
  },
  getOpenId() {
    wx.cloud.callFunction({
      name: 'getOpenId',
      complete: res => {
        wx.setStorageSync('openId', res.result.openid)
      }
    })
  }
}
App({ globalData, ...methodMap, ... customMap })