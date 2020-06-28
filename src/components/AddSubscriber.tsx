import {
  Avatar,
  createStyles,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import CheckRoundedIcon from '@material-ui/icons/CheckRounded'
import React from 'react'
import { IService } from '../common/models/IService'
import { IUser } from '../common/models/IUser'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    item: {
      marginTop: '10px',
      borderRadius: '12px',
      '&:hover': {
        cursor: 'pointer',
        '& $iconButton': {
          backgroundColor: theme.palette.secondary.main,
        },
      },
    },
    iconButton: {
      border: '1px solid darkgrey',
      '&:hover': {
        backgroundColor: theme.palette.secondary.main,
        cursor: 'pointer',
      },
    },
    iconButtonHighlight: {
      border: '1px solid darkgrey',
      '&:hover': {
        backgroundColor: theme.palette.secondary.main,
        cursor: 'pointer',
      },
      backgroundColor: theme.palette.background.paper,
    },
  })
)

interface IAddSubscriberProps {
  users: IUser[]
  service: IService
  onAdd?: (userId: string, serviceId: string, approval: boolean) => void
}

const AddSubscriber: React.FC<IAddSubscriberProps> = (props) => {
  const classes = useStyles()
  const { users, service, onAdd } = props
  const subscribe = (userId: string, needApproval: boolean | undefined) => {
    onAdd && onAdd(userId, service?.id ?? '', needApproval || false)
  }

  return (
    <List className={classes.root}>
      {users
        .filter((x) => x.id !== service.ownerId)
        .map((user) => {
          const subscriber = service.subscribers?.find(
            (x) => x.userId === user.id
          )
          const isSubscriber = subscriber !== undefined
          const needApproval =
            onAdd && isSubscriber && subscriber && !subscriber.isApproved

          return (
            <ListItem
              key={user.id}
              button
              disabled={isSubscriber && !needApproval}
              className={classes.item}
              onClick={() => subscribe(user.id, isSubscriber && needApproval)}
            >
              {isSubscriber && needApproval && (
                <ListItemSecondaryAction>
                  <IconButton className={classes.iconButton}>
                    <CheckRoundedIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              )}
              {!isSubscriber && (
                <ListItemSecondaryAction>
                  <IconButton className={classes.iconButton}>
                    <AddIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              )}
              <ListItemAvatar>
                <Avatar alt={user.name} src={user.profileImage} />
              </ListItemAvatar>

              <ListItemText primary={user.name} secondary={user.email} />
            </ListItem>
          )
        })}
    </List>
  )
}

export default AddSubscriber
