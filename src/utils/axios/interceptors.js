/**
*@file : interceptors.js
*@author : Thanh Dat / dat.dinh@dinovative.com
*@date : 15:18:27 | Friday, May 07, 2021
*@Editor : Visual Studio Code
*@summary : interceptors config
*/
import axios from 'axios'
import { handleRefreshToken } from './auth-interceptor'

/** @todo :  */

axios.interceptors.request.use((request) => {
  request.headers['Access-Control-Allow-Origin'] = '*'
  request.headers['Access-Control-Allow-Headers'] = 'Content-Type, x-requested-with'

  return request
})

axios.interceptors.response.use((response) => {
  console.log('response : ', response)
  return response
}, (error) => {
  const { config, response: { status } } = error
  const originalRequest = config

  if (status === 401) {
    return handleRefreshToken(originalRequest)
  }

  const convertError = {
    status: error?.response?.status,
    msg: error?.response?.data?.msg
  }

  return Promise.reject(convertError)
})
