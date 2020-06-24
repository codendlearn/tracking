import { Avatar, IconButton, Menu, MenuItem } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { userRepository } from '../repositories/UserRepository'
import { GlobalStateAction, useGlobalState } from '../store/GlobalStore'

const User = () => {
  const { state, dispatch } = useGlobalState()
  const history = useHistory()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = (event: React.MouseEvent<HTMLElement>) => {
    userRepository.SignOut().then(() => {
      dispatch({ type: GlobalStateAction.LoggedOut })
      history.replace('/')
      setAnchorEl(null)
    })
  }

  return (
    <>
      {state.user && (
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            {state.user.profileImage && (
              <Avatar alt={state.user.name} src={state.user.profileImage}>
                {state.user.name[0]}
              </Avatar>
            )}
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      )}
    </>
  )
}

export default User
