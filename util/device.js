import wechat from './wechat'

const { wxGetSystemInfoSync, wxGetMenuButtonBoundingClientRect, getStorageSync, setStorageSync } = wechat

const packageDeviceInfo = () => setStorageSync('deviceInfo', wxGetSystemInfoSync())

const packageMenuInfo = () => setStorageSync('menuInfo', wxGetMenuButtonBoundingClientRect())

export const deviceInit = () => {
  packageDeviceInfo()
  packageMenuInfo()
}

export const getDeviceInfo = () => getStorageSync('deviceInfo')

export const getMenuInfo = () => getStorageSync('menuInfo')

export const getMenuHeight = () => getMenuInfo().height

export const getMenuTop = () => getMenuInfo().top

const getWindowWidth = () => getDeviceInfo().windowWidth

export const getWindowHeight = () => getDeviceInfo().windowHeight

export const getStatusBarHeight = () => getDeviceInfo().statusBarHeight

export const getModel = () => getDeviceInfo().model

export const isIphoneXSeries = () => (getStatusBarHeight() > 20 && getModel().indexOf("iPhone") >= 0)

export const getNavHeight = () =>  (getStatusBarHeight() + (getMenuHeight() + (getMenuTop() - getStatusBarHeight()) * 2))

export const defaultViewHeight = h => (getWindowHeight() - h - getNavHeight() - 2)

// 如果页面使用了scroll-view 可调用该方法 动态设置高度 不同设备高度不同 兼容平板
export const getScrollViewHeight = h => (isIphoneXSeries() ?  defaultViewHeight(h) - 34 : defaultViewHeight(h))

export default { deviceInit, getScrollViewHeight, getNavHeight, getWindowWidth, isIphoneXSeries }