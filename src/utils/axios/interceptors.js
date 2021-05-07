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

axios.interceptors.response.use((response) => {
  return response
}, (error) => {
  const { config, response: { status } } = error
  const originalRequest = config

  if (status === 401) {
    return handleRefreshToken(originalRequest)
  }
  return Promise.reject(error)
})
