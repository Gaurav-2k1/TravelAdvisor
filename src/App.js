import React, { useEffect, useState } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import { getPlacesData } from './api/index'

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {
  const [places, setPlaces] = useState([]);
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClick] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState();
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude })
    });
  }, []);

  // useEffect(() => {
  //   const filtered = places.filter(place => Number(place.rating) > rating);
  //   setFilteredPlaces(filtered)
  // }, [rating, places])
  useEffect(() => {
    setIsLoading(true);
    getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
      setPlaces(data);
      setFilteredPlaces([])
      setIsLoading(false)
    });
  }, [type, coords, bounds]);
  return (<>
    <CssBaseline />
    <Header setCoords={setCoords} />
    <Grid container spacing={3} style={{ width: '100%' }}>
      <Grid item xs={12} md={4}>
        <List
          places={places}
          childClicked={childClicked}
          isLoading={isLoading}
          type={type}
          setType={setType}
          // rating={rating}
          setRating={setRating}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <Map
          setCoords={setCoords}
          setBounds={setBounds}
          coords={coords}
          places={places}
          setChildClick={setChildClick}
        />
      </Grid>
    </Grid>
  </>);
};

export default App;
