import React from 'react'
import { IUser } from '../common/models/IUser'
import { IService } from '../common/models/IService'
import {
  FormControl,
  makeStyles,
  Theme,
  createStyles,
  FormLabel,
  FormGroup,
  Avatar,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
  })
)

interface IAddSubscriberProps {
  users: IUser[]
  service: IService
  onAdd: (userId: string, serviceId: string) => void
}

const AddSubscriber: React.FC<IAddSubscriberProps> = (props) => {
  const classes = useStyles()
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.name)
    props.onAdd(event.target.name, props.service?.id ?? '')
  }

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Add Users</FormLabel>

        {props.users
          .filter((x) => x.id !== props.service.ownerId)
          .map((user) => (
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={props.service.subscribers?.some(
                      (a) => a.userId === user.id
                    )}
                    onChange={handleChange}
                    name={user.id}
                  />
                }
                label={user.name}
              />
              <Avatar alt={user.name} src={user.profileImage}>
                {user.name[0]}
              </Avatar>
            </FormGroup>
          ))}
      </FormControl>
    </div>
  )
}

export default AddSubscriber
