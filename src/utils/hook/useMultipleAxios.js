import { useEffect, useRef, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { toggleLoading } from '_src/store/actions/app'
import notify from '_src/utils/notify'
import { unwrapResult } from '@reduxjs/toolkit'
import { isArray } from 'lodash'

const useMultipleAxios = ({ arrayActionsFunc, isResp, immediate, delay }) => {
  const dispatch = useDispatch()
  const [ result, setResult ] = useState([])
  const timeout = useRef(null)
  const cancel = useRef(null)

  useEffect(() => {
    if (!isArray(arrayActionsFunc)) return

    execute()

    return () => {
      clearTimeout(timeout.current)
      cancel.current && cancel.current.map(api => api.abort())
    }
  }, [ ])

  const handleCallActions = async () => {
    try {
      cancel.current = arrayActionsFunc.map(el => {
        const { asyncAction, params } = el
        return dispatch(asyncAction(params))
      })

      const respActions = await Promise.all([ ...cancel.current ])

      // if you need return resp
      if (isResp) {
        // Unwrapping resp Actions
        const unWrapResp = [ ...respActions.map(el => unwrapResult(el)) ]

        // if you want to receive resp of api here, default is false
        setResult(prev => ([ ...prev, ...unWrapResp ]))
      }
    } catch (error) {
      notify({
        message: error.message,
        type: 'error'
      })
    }
  }

  const execute = async () => {
    try {
      dispatch(toggleLoading(true))

      // execute immediately
      if (immediate) {
        await handleCallActions()

        dispatch(toggleLoading(false))
      }

      timeout.current = setTimeout(async () => {
        try {
          await handleCallActions()

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

  // undefined or array
  return isResp && result
}

useMultipleAxios.propTypes = {
  arrayActionsFunc: PropTypes.array.isRequired,
  params: PropTypes.object,
  isResp: PropTypes.bool,
  immediate: PropTypes.bool,
  delay: PropTypes.number
}

useMultipleAxios.defaultProps = {
  isResp: false,
  immediate: true,
  delay: 0
}

export default useMultipleAxios
