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
import { Payment } from '@material-ui/icons'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ShareIcon from '@material-ui/icons/Share'
import clsx from 'clsx'
import React, { useEffect } from 'react'
import { IService } from '../common/models/IService'
import { IUser } from '../common/models/IUser'
import { serviceRepository } from '../repositories/ServiceRepository'
import { useGlobalState } from '../store/GlobalStore'
import AddSubscriber from './AddSubscriber'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
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

const ServiceCard: React.FC<IService & { user?: IUser }> = (props) => {
  const classes = useStyles()
  const { state } = useGlobalState()
  const [expanded, setExpanded] = React.useState(false)
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  useEffect(() => {
    // props.subscribers && setSubscribers(props.subscribers.map((s) => s.userId))
  })

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
          <Typography variant="caption" color="textSecondary" component="p">
            You don't have any dues...
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <Button color="primary">Pay now</Button>
        <IconButton aria-label="add to favorites">
          <Payment />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
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
              subscribers={props.subscribers?.map((x) => x.userId) ?? []}
              onAdd={(userId, serviceId) => {
                serviceRepository.AddSubscriber(userId, serviceId)
              }}
            />
          )}
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default ServiceCard
