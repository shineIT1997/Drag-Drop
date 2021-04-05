/**
*@file : index.js
*@author : Thanh Dat / dat.dinh@dinovative.com
*@date : 14:31:47 | Monday, April 05, 2021
*@Editor : Visual Studio Code
*@summary : axios config
*/

import axios from 'axios'
// import '_utils/axios-adapter-cache'
import '_utils/axios/interceptors'

/**
 * axios baseURL
 */
if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = process.env.REACT_APP_PROXY
} else {
  axios.defaults.baseURL = process.env.REACT_APP_PROXY
}
