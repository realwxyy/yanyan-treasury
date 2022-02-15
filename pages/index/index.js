import { isIphoneXSeries } from '../../util/device'

const data = {
  ix: isIphoneXSeries(),
  openId: '',
  connectInfo: '',
  balanceVis: false,
  payCode: ['/assets/pay-code-1.jpg']
}
const methodMap = {
  onShow() {
    console.log(this.data.ix)
  }
}
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
  },
  handleBalanceVis() {
    const balanceVis = !this.data.balanceVis
    this.setData({ balanceVis })
  },
  handleTransferIn() {
    const dialog = this.selectComponent("#custom-dialog")
    dialog.linShow({
      type: 'confirm',
      content: '请确认是否已转入',
      confirmText: '是',
      confirmColor: '#6dd5fa',
      cancelText: '否'
    })
  },
  handleTransferOut() {
    const dialog = this.selectComponent("#custom-dialog")
    dialog.linShow({
      content: '滚！',
      confirmText: '打扰了',
      confirmColor: '#6dd5fa'
    })
  }
}
Page({ data, ...methodMap, ...customMap })