import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlineIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';
const Map = ({ coords, setBounds, setCoords, places,setChildClick }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px');
  return (<div className={classes.mapContainer}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyCu5xTCYYdX6LgjNYE41YzZlbvAcL4j25o' }}
      defaultCenter={coords}
      center={coords}
      defaultZoom={14}
      margin={[50, 50, 50, 50]}
      options={''}
      onChange={(e) => {
        setCoords({ lat: e.center.lat, lng: e.center.lng });
        setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw },
          console.log(e.marginBounds.ne)
        );
      }}
      onChildClick={(child)=>setChildClick(child)}
    >
      {
        places?.map((place, i) => (
          <div className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >{
              !isDesktop ? (
                <LocationOnOutlineIcon color='primary' fontSize='large' />
              ) : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.typography} variant='subtitle2' gutterBottom>
                    {place.name}
                  </Typography>
                  <img className={classes.pointer}
                    src={place.photo ? place.photo.images.large.url : 'https://media-cdn.tripadvisor.com/media/photo-s/16/ae/d2/bc/birdy-s-bar.jpg'}
                    alt={place.name}
                  />
                  <Rating name='read-only' size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )
            }

          </div>
        ))
      }
    </GoogleMapReact>
  </div>);
};

export default Map;
