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
  })
)

interface IAddSubscriberProps {
  users: IUser[]
  service: IService
  subscribers?: string[]
  onAdd: (userId: string, serviceId: string) => void
}

const AddSubscriber: React.FC<IAddSubscriberProps> = (props) => {
  const classes = useStyles()
  const { users, service, onAdd, subscribers } = props
  const subscribe = (userId: string) => {
    onAdd(userId, service?.id ?? '')
  }

  return (
    <List className={classes.root}>
      {users
        .filter((x) => x.id !== service.ownerId)
        .map((user) => {
          const isSubscriber =
            subscribers !== undefined &&
            subscribers?.findIndex((x) => x === user.id) > -1

          return (
            <ListItem
              key={user.id}
              button
              disabled={isSubscriber}
              className={classes.item}
              onClick={() => subscribe(user.id)}
            >
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
