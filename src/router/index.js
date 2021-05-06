/**
*@file : index.js
*@author : Thanh Dat / dat.dinh@dinovative.com
*@date : 18:40:45 | Wednesday, May 05, 2021
*@Editor : Visual Studio Code
*@summary : config router, return a array of all router, notFound-route will be the end
*/
import NotFound from '_modulus/core/components/404'
import routesFromModulus from '../modulus/**/routes.js'

const ModulusRouter = [ ...routesFromModulus.reduce((router, moduleRouter) => {
  return [
    ...router,
    ...moduleRouter.default
  ]
}, []) ]

export default [
  ...ModulusRouter,

  // last route handle 404 error
  {
    path: '*',
    isPrivate: false,
    component: NotFound
  }

]
