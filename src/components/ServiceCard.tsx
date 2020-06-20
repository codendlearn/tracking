import React, { useState, useEffect } from 'react'
import {
  makeStyles,
  Theme,
  createStyles,
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Collapse,
  CardActionArea,
  Button,
} from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import { Payment } from '@material-ui/icons'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import clsx from 'clsx'
import { IService } from '../common/models/IService'
import { IUser } from '../common/models/IUser'
import AddSubscriber from './AddSubscriber'
import { useDependencies } from '../store/DependenciesStore'
import { useGlobalState } from '../store/GlobalStore'

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
  const [users, setUsers] = useState<IUser[]>([])
  const { userRepository, serviceRepository } = useDependencies()

  const [expanded, setExpanded] = React.useState(false)
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  useEffect(() => {
    userRepository.GetUsers().then((users) => {
      setUsers(users)
    })
  }, [userRepository])

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
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {state.user?.id === props.user?.id && (
            <AddSubscriber
              users={users}
              service={{ ...props }}
              onAdd={(userId, serviceId) => {
                serviceRepository.AddSubscriber(userId, serviceId)
              }}
            />
          )}
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default ServiceCard
