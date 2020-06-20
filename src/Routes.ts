import { Home, About, Login } from './pages'

export interface IRoute {
  path: string
  sidebarName: string
  component: React.ComponentType
  isPrivate?: boolean
  noNavLink?: boolean
}

const Routes: IRoute[] = [
  {
    path: '/',
    sidebarName: 'Home',
    isPrivate: true,
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
    noNavLink: true,
  },
]

export default Routes
