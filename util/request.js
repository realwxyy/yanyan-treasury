import { basicReq } from '../config/config'

export const request = async ({ path, method='GET', data={} }) => {
  const res = await wx.cloud.callContainer({ ...basicReq, path, method, data }) 
  if (res?.statusCode === 200) {
    return res?.data
  } else {
    console.log('=========err=============')
    return null
  }
}