import { Home, About, Login } from './pages'

export interface IRoute {
  path: string
  sidebarName: string
  component: React.ComponentType
}

const Routes: IRoute[] = [
  {
    path: '/',
    sidebarName: 'Home',
    component: Home,
  },
  {
    path: '/About',
    sidebarName: 'About',
    component: About,
  },
  {
    path: '/Login',
    sidebarName: 'Login',
    component: Login,
  },
]

export default Routes
