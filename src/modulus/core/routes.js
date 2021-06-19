import Home from '_src/modulus/core/components/Home'
import StyleGuide from './components/StyleGuide'

export default [
  {
    path: '/',
    name: 'home',
    exact: true,
    auth: false,
    component: Home
  },

  {
    path: '/styleguide',
    name: 'styleguide',
    exact: true,
    auth: false,
    component: StyleGuide
  }
]
