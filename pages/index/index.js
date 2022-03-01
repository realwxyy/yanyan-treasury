import { isIphoneXSeries } from '../../util/device'
import { getStorageSync } from '../../util/wechat'
import { users } from '../../config/users'
import { balance, balances, balanceSave, balanceEachTotal } from '../../api/balance'

const data = {
  ix: isIphoneXSeries(),
  openId: '',
  connectInfo: '',
  balanceVis: false,
  payCode: ['/assets/pay-code-1.jpg'],
  user: {},
  balance: {},
  balances: [],
  balanceEachTotal: {}
}
const methodMap = {
  async onShow() {
    await this.getUserByOpenId()
    await this.getBalance()
    await this.getBalances()
    await this.getBalanceEachTotal()
  }
}
const customMap = {
  async getUserByOpenId() {
    const openId = getStorageSync('openId')
    const filterUsers = users.filter(o => o.openId === openId)
    const user = filterUsers.length ? filterUsers[0] : { id: -1, remark: '第三者' }
    await this.setData({ openId, user })
  },
  async getBalance() {
    const res = await balance()
    if (res?.code === 0) {
      this.setData({ balance: res.data })
    }
  },
  async getBalances() {
    const res = await balances()
    if (res?.code === 0) {
      this.setData({ balances: res.data })
    }
  },
  async getBalanceEachTotal() {
    const res = await balanceEachTotal()
    if (res?.code === 0) {
      this.setData({ balanceEachTotal: res.data })
    }
  },
  handleBalanceVis() {
    const balanceVis = !this.data.balanceVis
    this.setData({ balanceVis })
  },
  handleTransferIn() {
    const dialog = this.selectComponent("#custom-dialog")
    const { id } = this.data.user
    if (id > 0) {
      dialog.linShow({
        type: 'confirm',
        content: `Hi~ ${this.data.user.remark} 请确认是否已转入`,
        confirmText: '是',
        confirmColor: '#6dd5fa',
        cancelText: '否'
      })
    } else {
      dialog.linShow({
        content: `第三方用户的操作默认忽略，感谢您的来访~`,
        confirmText: '知道了',
        confirmColor: '#6dd5fa'
      })
    }
  },
  handleTransferOut() {
    const dialog = this.selectComponent("#custom-dialog2")
    const { id } = this.data.user
    if (id === 2) {
      dialog.linShow({
        content: '滚！',
        confirmText: '打扰了',
        confirmColor: '#6dd5fa'
      })
    } else {
      dialog.linShow({
        content: '敬请期待转出功能',
        confirmText: '知道了',
        confirmColor: '#6dd5fa'
      })
    }
  },
  handleDialogConfirm() {
    const dialog = this.selectComponent("#custom-dialog2")
    const { user: { id, remark } } = this.data
    if (id > 0) {
      dialog.linShow({
        content: '记录已生效，要坚持哦~',
        confirmText: '知道了',
        confirmColor: '#6dd5fa'
      })
    }
  },
}
Page({ data, ...methodMap, ...customMap })