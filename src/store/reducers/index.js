/**
*@file : index.js
*@author : Thanh Dat / dat.dinh@dinovative.com
*@date : 18:44:44 | Wednesday, May 05, 2021
*@Editor : Visual Studio Code
*@summary : format reducers
*/

import app from '_store/reducers/app'
import reducersOfModulus from '../../modulus/**/reducer.js'

export default {
  ...reducersOfModulus.reduce((reducers, moduleReducer) => {
    return ({
      ...reducers,
      [moduleReducer.default.name]: moduleReducer.default.reducer
    })
  }, {}),
  app
}
