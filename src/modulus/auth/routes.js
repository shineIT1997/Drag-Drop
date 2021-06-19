import LoginComp from '_modulus/auth/components/Login'
import RegisterComp from '_modulus/auth/components/Register'

export default [
  {
    path: '/login',
    name: 'login',
    exact: true,
    auth: false,
    component: LoginComp
  },

  {
    path: '/register',
    name: 'register',
    exact: true,
    auth: false,
    component: RegisterComp
  }
]
