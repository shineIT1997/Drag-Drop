import { useEffect, useRef, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { toggleLoading } from '_src/store/actions/app'
import notify from '_src/utils/notify'
import { unwrapResult } from '@reduxjs/toolkit'
import { isFunction } from 'lodash'

/**
 * Single Axios
 * @param {Function} asyncFunction
 * @param {Object} params
 * @param {Boolean} isResp
 * @param {Boolean} immediate default true
 * @param {Number} delay by millisecond
 * @returns {Object} if isResp is true
 */
const useSingleAxios = ({ asyncFunction, params, immediate, isResp, delay, ...props }) => {
  const dispatch = useDispatch()
  const [ result, setResult ] = useState()
  const timeout = useRef(null)
  const cancel = useRef(null)

  useEffect(() => {
    if (!isFunction(asyncFunction)) return

    execute()

    return () => {
      if (timeout.current) {
        dispatch(toggleLoading(false))
        clearTimeout(timeout.current)
      }
      cancel.current && cancel.current.abort()
    }
  }, [ ])

  const execute = useCallback(
    async () => {
      try {
        dispatch(toggleLoading(true))

        if (timeout.current) clearTimeout(timeout.current)

        // execute immediately
        if (immediate) {
          cancel.current = dispatch(asyncFunction(params))

          const resp = unwrapResult(await cancel.current)

          // if you want to receive resp of api here, default is false
          isResp && setResult(prev => ({ ...prev, ...resp }))
          return dispatch(toggleLoading(false))
        }

        timeout.current = setTimeout(async () => {
          try {
            cancel.current = dispatch(asyncFunction(params))

            const resp = unwrapResult(await cancel.current)

            // if you want to receive resp of api here, default is false
            isResp && setResult(prev => ({ ...prev, ...resp }))
            return dispatch(toggleLoading(false))
          } catch (error) {
            notify({
              message: error.message,
              type: 'error'
            })
          }
        }, delay)
      } catch (error) {
        dispatch(toggleLoading(false))
        notify({
          message: error.message,
          type: 'error'
        })
      }
    }
    ,
    [ asyncFunction, params, isResp, delay, dispatch ]
  )
  // undefined or object
  return isResp && result
}

useSingleAxios.propTypes = {
  asyncFunction: PropTypes.func.isRequired,
  params: PropTypes.object,
  isResp: PropTypes.bool,
  immediate: PropTypes.bool,
  delay: PropTypes.number
}

useSingleAxios.defaultProps = {
  isResp: false,
  immediate: true,
  delay: 0
}

export default useSingleAxios
