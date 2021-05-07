import axios from 'axios'
import store from '_store'
import {
  createAcessToken,
  callRequestsFromQueue,
  toggleFetchingAccessToken,
  addSingleRequestsToQueue
} from '_src/store/actions/auth'

const {
  isAlreadyFetchingAccessToken
} = store.getState().auth

const dispatch = store.dispatch

/**
 * handle fail request with code 401
 * @param {Object} originalRequest // be received axios
 * @returns {Promise}
 */
export const handleRefreshToken = (originalRequest) => {
  // if this request is first we set isAlreadyFetchingAccessToken flag to true and run create access token

  if (!isAlreadyFetchingAccessToken) {
    dispatch(toggleFetchingAccessToken(true))

    // run create a access token
    dispatch(createAcessToken()).then((accessToken) => {
      dispatch(toggleFetchingAccessToken(false))
      // run queue request
      dispatch(callRequestsFromQueue(accessToken))
    })
  }

  // and while isAlreadyFetchingAccessToken equal true we create and return new promise
  const retryOriginalRequest = new Promise((resolve) => {
    /**
       * register subscriber
       * @param {String} accessToken
       */
    const retryCallRequest = accessToken => {
      originalRequest.headers.Authorization = 'Bearer ' + accessToken
      resolve(axios(originalRequest))
    }

    // we push new function to request queue
    dispatch(addSingleRequestsToQueue(retryCallRequest))
  })

  return retryOriginalRequest
}
