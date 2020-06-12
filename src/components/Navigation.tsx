import React from 'react';

import { NavLink, withRouter, Switch, Route } from 'react-router-dom';
import Routes from '../Routes';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  MenuList,
  MenuItem,
  ListItemText,
  Container,
  ListItemIcon,
} from '@material-ui/core';

import {
  ExitToAppRounded,
  HomeRounded,
  InfoRounded,
  AppsRounded,
} from '@material-ui/icons';
import User from './User';

let drawerWidth = 240;
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
);

const NavigationBar: React.FC = (props: any) => {
  const classes = useStyles();

  const activeRoute = (routeName: any) => {
    return props.location.pathname === routeName ? true : false;
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Home':
        return <HomeRounded />;
      case 'About':
        return <InfoRounded />;
      case 'Login':
        return <ExitToAppRounded />;
      default:
        return <AppsRounded />;
    }
  };
  return (
    <div className={classes.root}>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <Typography variant='h6' className={classes.title} noWrap>
            Template Project
          </Typography>
          <User />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />

        <div className={classes.drawerContainer} role='presentation'>
          <MenuList>
            {Routes.map((route, key) => {
              return (
                <NavLink
                  to={route.path}
                  style={{ textDecoration: 'none' }}
                  key={key}
                >
                  <MenuItem selected={activeRoute(route.path)}>
                    <ListItemIcon>{getIcon(route.sidebarName)}</ListItemIcon>
                    <ListItemText primary={route.sidebarName} />
                  </MenuItem>
                </NavLink>
              );
            })}
          </MenuList>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Container>
          <Switch>
            {Routes.map((route: any) => (
              <Route exact path={route.path} key={route.path}>
                <route.component />
              </Route>
            ))}
          </Switch>
        </Container>
      </main>{' '}
    </div>
  );
};

export default withRouter(NavigationBar);
