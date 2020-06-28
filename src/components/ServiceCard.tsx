import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  createStyles,
  Divider,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import AddIcon from '@material-ui/icons/Add'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import clsx from 'clsx'
import React, { useEffect } from 'react'
import { IService } from '../common/models/IService'
import { IUser } from '../common/models/IUser'
import { serviceRepository } from '../repositories/ServiceRepository'
import { useGlobalState } from '../store/GlobalStore'
import AddSubscriber from './AddSubscriber'
import ServiceStatus from './ServiceStatus'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
      width: 345,
    },
    media: {
      backgroundSize: 'contain',
      paddingTop: '56.25%',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  })
)

const ServiceCard: React.FC<IService & { user: IUser }> = (props) => {
  const classes = useStyles()
  const { state } = useGlobalState()
  const [expanded, setExpanded] = React.useState(false)
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  const subscribers = props.subscribers ?? []

  useEffect(() => {
    // props.subscribers && setSubscribers(props.subscribers.map((s) => s.userId))
  })

  const canJoin = () => {
    return (
      state.user?.id !== props.ownerId &&
      !subscribers.some((x) => x.userId === state.user?.id) &&
      props.subscription.maxParticipants > subscribers.length
    )
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            alt={props.user?.name}
            src={props.user?.profileImage}
            className={classes.avatar}
          >
            {props.user?.name[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.user?.name}
        subheader={props.name}
      />
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`assets/images/${props.imageName}`}
          title={props.name}
        />
        <CardContent>
          <ServiceStatus service={{ ...props }} user={props.user} />
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        {canJoin() && (
          <Button
            color="primary"
            onClick={() => {
              serviceRepository.AddSubscriber(
                state.user?.id ?? '',
                props.id ?? '',
                false
              )
            }}
            startIcon={<AddIcon />}
          >
            Join
          </Button>
        )}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded}>
        <Divider />
        <CardContent>
          <Typography paragraph>Subscribers:</Typography>
          {state.user?.id === props.ownerId && (
            <AddSubscriber
              users={state.users ?? []}
              service={props}
              onAdd={(userId: string, serviceId: string, approval: boolean) => {
                approval
                  ? serviceRepository.ApproveSubscriber(userId, serviceId)
                  : serviceRepository.AddSubscriber(userId, serviceId, true)
              }}
            />
          )}
          {state.user?.id !== props.ownerId && (
            <AddSubscriber
              users={
                state.users?.filter((x) =>
                  props.subscribers?.some(
                    (a) => a.userId === x.id && a.isApproved
                  )
                ) ?? []
              }
              service={props}
            />
          )}
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default ServiceCard
