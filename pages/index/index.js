// index.js
const app = getApp()
const data = {
  openId: '',
  connectInfo: ''
}
const methodMap = {}
const customMap = {
  async handleTest() {
    const res = await wx.cloud.callContainer({
      "config": {
        "env": "prod-9gi0yrveb0b72f25"
      },
      "path": "/",
      "header": {
        "X-WX-SERVICE": "yanyan-api",
        "content-type": "application/json"
      },
      "method": "GET",
      "data": ""
    })
    const { data: connectInfo } = res
    const openId = wx.getStorageSync('openId')
    this.setData({ connectInfo, openId })
  }
}
Page({ data, ...methodMap, ...customMap })