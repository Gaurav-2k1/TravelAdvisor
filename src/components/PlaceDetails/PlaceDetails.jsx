import React from 'react';
import { Box, Typography, Button, Card, CardContent, CardActions, Chip, CardMedia } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';
import useStyle from './styles'

const PlaceDetails = ({ place, selected, refProps }) => {
  const classes = useStyle();
  if (selected) refProps?.current?.scrollIntoView({ behaviour: "smooth", block: "start" })
  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={place.photo ? place.photo.images.large.url : 'https://media-cdn.tripadvisor.com/media/photo-s/16/ae/d2/bc/birdy-s-bar.jpg'}
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">{place.name}</Typography>
        <Box display="flex" justifyContent="space-between" my={2}>
          <Rating name="read-only" value={Number(place.rating)} readOnly />
          <Typography component="legend">{place.num_reviews} review{place.num_reviews > 1 && 's'}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant='subtitle1'>Price</Typography>
          <Typography gutterBottom variant='subtitle2'>{place.price_level}</Typography>

        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant='subtitle1'>Ranking</Typography>
          <Typography gutterBottom variant='subtitle2'>{place.ranking}</Typography>

        </Box>
        {place?.awards?.map((award) => {
          return (<Box my={1} display="flex" justifyContent="space-between" alignItems="center">
            <img src={award.images.small} alt={award.display_name} />
            <Typography variant="subtitle1" color='textSecondary'>{award.display_name}</Typography>

          </Box>)
        })}
        {place?.cuisine?.map(({ name }) => {
          return (<Chip key={name} size="small" className={classes.chip} />)
        })}
        {place?.address && (
          <Typography gutterBottom variant='body2' color="textSecondary" className={classes.subtitle}>
            <LocationOnIcon /> {place.address}
          </Typography>
        )
        }
        {place?.phone && (
          <Typography gutterBottom variant='body2' color="textSecondary" className={classes.spacing}>
            <PhoneIcon /> {place.phone}
          </Typography>
        )
        }
        <CardActions>
          <Button size="small" color="primary" onClick={() => {
            window.open(place.web_url, '_blank')
          }}>Trip Advisor</Button>
          <Button size="small" color="primary" onClick={() => {
            window.open(place.website, '_blank')
          }}>Website</Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
