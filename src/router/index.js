/**
*@file : index.js
*@author : Thanh Dat / dat.dinh@dinovative.com
*@date : 18:40:45 | Wednesday, May 05, 2021
*@Editor : Visual Studio Code
*@summary : config router, return a array of all router, notFound-route will be the end
*/
import NotFound from '_modulus/core/components/404'
import routesOfModulus from '../modulus/**/routes.js'

export default [
  ...routesOfModulus.reduce((routes, module) => {
    return [
      ...routes,
      ...module.default
    ]
  }, []),

  // last route handle 404 error
  {
    path: '*',
    isPrivate: false,
    component: NotFound
  }

]
