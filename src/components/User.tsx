import React from 'react'
import { useGlobalState, GlobalStateAction } from '../store/GlobalStore'
import { IconButton, Menu, MenuItem, Avatar } from '@material-ui/core'

const User = () => {
  const { state, dispatch } = useGlobalState()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (e: any) => {
    console.log(e)
    setAnchorEl(null)
  }

  return (
    <>
      {state.user && (
        <div>
          <IconButton
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleMenu}
            color='inherit'
          >
            {state.user.profileImage && (
              <Avatar alt={state.user.name} src={state.user.profileImage}>
                {state.user.name[0]}
              </Avatar>
            )}
          </IconButton>
          <Menu
            id='menu-appbar'
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
          </Menu>
        </div>
      )}
    </>
  )
}

export default User
