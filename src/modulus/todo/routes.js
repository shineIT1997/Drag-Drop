import Todo from '_modulus/todo/components'

export default [
  {
    path: '/todo',
    name: 'todo',
    exact: true,
    auth: false,
    component: Todo
  }
]
