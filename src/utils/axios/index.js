/**
*@file : index.js
*@author : Thanh Dat / dat.dinh@dinovative.com
*@date : 14:31:47 | Monday, April 05, 2021
*@Editor : Visual Studio Code
*@summary : axios config
*/

import axios from 'axios'
import '_utils/axios/interceptors'

import { isArray, isFunction, isString } from 'lodash'
import store from '_store'

const dispatch = store.dispatch

/**
 * axios baseURL
 */
if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = process.env.REACT_APP_PROXY
} else {
  axios.defaults.baseURL = process.env.REACT_APP_PROXY
}
/**
 *
 * @param {Array Function or Function} apiActions
 */

/**
 * Cancel Apis
 * @param {Array Function or Funtion} apiActions
 */
export const cancelApis = (apiActions) => {
  /**
   * Check is a action of redux store
   * @param {Function} action
   * @returns true when this is a action of redux store
   */
  const checkIsAction = (action) => isFunction(action) && isString(action().type)

  if (!isArray(apiActions)) {
    return checkIsAction(apiActions) && dispatch(apiActions()).abort()
  }

  apiActions.forEach(actionFunc => {
    return checkIsAction(actionFunc) && dispatch(actionFunc).abort()
  })
}

