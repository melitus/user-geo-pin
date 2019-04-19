import React, { useState, useEffect } from "react";
import ReactMapGL, { NavigationControl, Marker } from 'react-map-gl'
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";

const INITIAL_VIEWPORT = {
  latitude: 37.7577,
  longitude: -122.4376,
  zoom:13
}
const Map = ({ classes }) => {
  
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT)
  const [userPosition, setUserPosition] = useState(null)
  useEffect(() =>{
        getUserPosition()
  }, [])
   const getUserPosition = () =>{
     if('geolocation' in navigator){
       navigator.geolocation.getCurrentPosition(position => {
         const {latitude, longitude} = position.coords
         setViewport(...viewport, latitude, longitude)
         setUserPosition({latitude, longitude})
       })
     }
   }
  return (
    <div className={classes.root}>
        <ReactMapGL
        width="100vw"
        height="calc(100vh - 64px)"
        mapboxApiAccessToken="pk.eyJ1IjoibWVsaXR1cyIsImEiOiJjanVvYzg2bnYwYmttNDRzamhhMjJvc3JxIn0.iz6rrU1n1iSDnth7S4jvkw"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onViewStateChange={newViewport => setViewport(newViewport)}
        {...viewport}
        >
        <div className={classes.navigationControl}>
          <NavigationControl 
          onViewStateChange={newViewport => setViewport(newViewport)}
          />
        </div>
        {userPosition && (
          <Marker />
        )}
        </ReactMapGL>
    </div>
    )
};

const styles = {
  root: {
    display: "flex"
  },
  rootMobile: {
    display: "flex",
    flexDirection: "column-reverse"
  },
  navigationControl: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: "1em"
  },
  deleteIcon: {
    color: "red"
  },
  popupImage: {
    padding: "0.4em",
    height: 200,
    width: 200,
    objectFit: "cover"
  },
  popupTab: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }
};

export default withStyles(styles)(Map);
