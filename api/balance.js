import { request } from '../util/request'

export const balance = () =>
  request({ path: '/balance/get-balance' })

export const balances = () =>
  request({ path: '/balance/get-balances' })

export const balanceSave = data =>
  request({ path: '/balance/save', method: 'POST', data })

export const balanceEachTotal = () =>
  request({ path: '/balance/get-each-total' })