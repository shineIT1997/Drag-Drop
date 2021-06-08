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
  return request
})

axios.interceptors.response.use((response) => {
  return response
}, (error) => {
  const { config = {}, response = { } } = error
  const { statusCode } = response

  const originalRequest = config

  if (statusCode === 401) {
    return handleRefreshToken(originalRequest)
  }

  const convertError = {
    statusCode: error?.response?.statusCode,
    message: error?.response?.data?.message
  }

  return Promise.reject(convertError)
})
