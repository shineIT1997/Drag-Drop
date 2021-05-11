import { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { toggleLoading } from '_src/store/actions/app'
import { isPromise } from '../helper'
import { isArray } from 'lodash'
import { unwrapResult } from '@reduxjs/toolkit'

const useAxios = ({ apis }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const callback = []
    handleLoad(callback)

    return () => {
      callback.forEach(el => el.abort())
    }
  }, [])

  const handleLoad = useCallback(
    async (callback) => {
      try {
        dispatch(toggleLoading(true))

        // single Api
        if (!isArray(apis)) return callback.push(dispatch(apis()))

        // multiple Api
        apis.forEach(api => {
          // check element is a promise api
          if (!isPromise(api)) return

          callback.push(dispatch(api()))
        })
      } catch (error) {
        console.log('error.message : ', error.message)
      } finally {
        dispatch(toggleLoading(false))
      }
    },
    [ dispatch ]
  )

  return null
}

useAxios.propTypes = {
  value: PropTypes.number,
  todo: PropTypes.object
}

export default useAxios
