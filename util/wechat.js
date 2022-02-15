export const wxGetSetting = (success, fail) => wx.getSetting({ success, fail })
export const wxGetUserInfo = (success, fail) => wx.getUserInfo({ success, fail })
export const checkSession = (success, fail) => wx.checkSession({ success, fail })
// export const wxLogin = (success, fail) => wx.login({ success, fail })
// promise 改造wx.login
export const wxLogin = () => new Promise((resolve, reject) => wx.login({
  success(res) {
    resolve(res.code)
  },
  fail(err) {
    reject(err)
  }
}))
// export const setStorageSync = (key, value) => wx.setStorageSync(key, value)
// export const getStorageSync = key => wx.getStorageSync(key)
export const removeStorageSync = key => wx.removeStorageSync(key)
export const getStorageInfoSync = () => wx.getStorageInfoSync()
// export const wxRelaunch = url => setTimeout(() => wx.reLaunch({ url }), 300)
// export const wxNavigateTo = url => wx.navigateTo({ url })
// export const wxNavigateBack = delta => wx.navigateBack({ delta })
export const wxRedirectTo = url => wx.redirectTo({ url })
export const wxUploadFile = (success, fail) => wx.uploadFile({ success, fail })
// export const wxChooseImage = (success, fail) => wx.chooseImage({ success, fail })
// 改造 wx.uploadImage 为 Promise 风格 （可使用await）
export const wxUploadImages = data => new Promise((resolve, reject) => {
  wx.uploadFile({ ...data, success(res) {
      if (res.statusCode === 200) {
        resolve(JSON.parse(res.data))
      }
      //todo: 需要新增异常处理 不过目前不太需要 因为项目过于简单
    },
    fail(err) {
      reject(err)
    }
  })
})

export const setStorageSync = (k, v) => wx.setStorageSync(k, v)

export const getStorageSync = k => wx.getStorageSync(k)

export const wxGetSystemInfoSync = () => wx.getSystemInfoSync()

export const wxGetMenuButtonBoundingClientRect = () => wx.getMenuButtonBoundingClientRect()

export const wxNavigateBack = (d) => wx.navigateBack({ d })

export const wxHideHomeButton = () => wx.hideHomeButton()

export const wxRelaunch = url => setTimeout(() => wx.reLaunch({ url }), 300) // 普通 relaunch 偶尔会出现异常bug 300毫秒延时跳转可解

export const wxNavigateTo = url => wx.navigateTo({ url })

export const wxChooseImage = (data={}) => wx.chooseImage(data)

export default {
  wxGetMenuButtonBoundingClientRect,
  wxGetSystemInfoSync,
  setStorageSync,
  getStorageSync,
  wxNavigateBack,
  wxHideHomeButton,
  wxRelaunch,
  wxNavigateTo
}