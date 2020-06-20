import React from 'react'
import { useGlobalState, GlobalStateAction } from '../store/GlobalStore'
import { IconButton, Menu, MenuItem, Avatar } from '@material-ui/core'
import { useDependencies } from '../store/DependenciesStore'
import { useHistory } from 'react-router-dom'

const User = () => {
  const { state, dispatch } = useGlobalState()
  const { userRepository } = useDependencies()
  const history = useHistory()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (e: any) => {
    console.log(e)
    setAnchorEl(null)
  }

  const handleLogout = (e: any) => {
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
