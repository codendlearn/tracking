import { About, Home, Login } from './pages'
import SeedData from './pages/SeedData'

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
  {
    path: '/seed',
    sidebarName: 'Seed',
    isPrivate: true,
    component: SeedData,
  },
]

export default Routes
