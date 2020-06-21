import {
  AppBar,
  Container,
  Drawer,
  Hidden,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {
  AppsRounded,
  ExitToAppRounded,
  HomeRounded,
  InfoRounded,
} from '@material-ui/icons'
import React from 'react'
import {
  NavLink,
  Route,
  Switch,
  useLocation,
  withRouter,
} from 'react-router-dom'
import Routes, { IRoute } from '../Routes'
import { PrivateRoute } from './hoc/PrivateRoute'
import User from './User'

const drawerWidth = 240
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',

      flexGrow: 1,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    fullList: {
      width: 'auto',
    },
  })
)

const NavigationBar: React.FC = () => {
  const classes = useStyles()
  const location = useLocation()

  const getIcon = (name: string) => {
    switch (name) {
      case 'Home':
        return <HomeRounded />
      case 'About':
        return <InfoRounded />
      case 'Login':
        return <ExitToAppRounded />
      default:
        return <AppsRounded />
    }
  }

  const activeRoute = (routeName: string) => {
    return location.pathname === routeName
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title} noWrap>
            Tracking
          </Typography>
          <User />
        </Toolbar>
      </AppBar>
      <Hidden smDown implementation="css">
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />

          <div className={classes.drawerContainer} role="presentation">
            <MenuList>
              {Routes.filter((route) => !route.noNavLink).map((route, key) => {
                return (
                  <NavLink
                    to={route.path}
                    style={{ textDecoration: 'none' }}
                    key={route.sidebarName}
                  >
                    <MenuItem selected={activeRoute(route.path)}>
                      <ListItemIcon>{getIcon(route.sidebarName)}</ListItemIcon>
                      <ListItemText primary={route.sidebarName} />
                    </MenuItem>
                  </NavLink>
                )
              })}
            </MenuList>
          </div>
        </Drawer>
      </Hidden>
      <main className={classes.content}>
        <Toolbar />
        <Container>
          <Switch>
            {Routes.map((route: IRoute) => {
              if (route.isPrivate) {
                return (
                  <PrivateRoute exact path={route.path} key={route.path}>
                    <route.component />
                  </PrivateRoute>
                )
              }
              return (
                <Route exact path={route.path} key={route.path}>
                  <route.component />
                </Route>
              )
            })}
          </Switch>
        </Container>
      </main>{' '}
    </div>
  )
}

export default withRouter(NavigationBar)
