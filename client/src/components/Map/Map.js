import React, { useState, useEffect, useContext } from "react";
import ReactMapGL, { NavigationControl, Marker, Popup } from 'react-map-gl'
import { withStyles } from "@material-ui/core/styles";
import differenceInMinutes from 'date-fns/difference_in_minutes'
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";

import PinIcon from '../PinIcon/PinIcon'
import Context from '../../context'
import Blog from '../Blog/Blog'
import {GET_PINS_QUERY} from '../../graphql/queries'
import { useClient } from '../../utilities/client'


const INITIAL_VIEWPORT = {
  latitude: 37.7577,
  longitude: -122.4376,
  zoom:13
}
const Map = ({ classes }) => {
  const {state, dispatch} = useContext(Context)

  useEffect(() => {
    getPins()
  }, [])

  const [viewport, setViewport] = useState(INITIAL_VIEWPORT)
  const [userPosition, setUserPosition] = useState(null)
  const client = useClient();

  useEffect(() =>{
        getUserPosition()
  }, [])

  const [popup, setPopUp] = useState(null)

  const getPins = async () =>{
    const {getPins} = await client.request(GET_PINS_QUERY)
    dispatch({type:"GET_PINS", payload:getPins})
  }
  const getUserPosition = () =>{
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition(position => {
        const {latitude, longitude} = position.coords
        setViewport({...viewport, latitude, longitude})
        setUserPosition({latitude, longitude})
      })
    }
  }
  const highlightNewPin = pin =>{
  const isNewPin = differenceInMinutes(Date.now(), Number(pin.createdAt)) <= 30
  return isNewPin ? "limegreen" : "darkblue"

  }

  const handleSelectPin = pin =>{
    console.log({pin})
    setPopUp(pin)
    dispatch({type:"SET_PIN", payload:pin})
  }
  const handleMapClick =({lngLat, leftButton}) =>{
      if(!leftButton) return
      if(!state.draft){
        dispatch({type:"CREATE_DRAFT"})
      }
      const [longitude, latitude] = lngLat
      dispatch({
        type: "UPDATE_DRAFT_LOCATION",
        payload: {longitude, latitude}
      })
}
const isAuthUser = () => state.currentUser._id !== popup.author._id
  return (
    <div className={classes.root}>
        <ReactMapGL
        width="100vw"
        height="calc(100vh - 64px)"
        mapboxApiAccessToken="pk.eyJ1IjoibWVsaXR1cyIsImEiOiJjanVvYzg2bnYwYmttNDRzamhhMjJvc3JxIn0.iz6rrU1n1iSDnth7S4jvkw"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onViewStateChange={newViewport => setViewport(newViewport)}
        onClick={handleMapClick}
        {...viewport}
        >
        <div className={classes.navigationControl}>
          <NavigationControl 
          onViewStateChange={newViewport => setViewport(newViewport)}
          />
        </div>
        {userPosition && (
          <Marker
            latitude={userPosition.latitude}
            longitude={userPosition.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
          <PinIcon 
          size={40} 
          color='red'

          />
          
          </Marker>
        )}
        {state.draft && (
          <Marker
            latitude={state.draft.latitude}
            longitude={state.draft.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
          <PinIcon size={40} color='hotpink'/>
          
          </Marker>
        )}
        {state.pins.map(pin =>(
          <Marker
            key={pin._id}
            latitude={pin.latitude}
            longitude={pin.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
          <PinIcon 
          onClick={() => handleSelectPin(pin)}
          size={40} color={highlightNewPin(pin)}/>
          
          </Marker>
        ))}

        {popup && (
          <Popup
          anchor="top"
          latitude={popup.latitude}
          longitude={popup.longitude}
          closeOnClick={false}
          onClose={() => setPopUp(null)}
          >
          <img 
            className={classes.popupImage}
            src={popup.image}
            alt={popup.title}
          />
          <div className={classes.popupTab}>

          <Typography>
            {popup.latitude.toFixed(6)}, {popup.longitude.toFixed(6)}
            
          </Typography>
          {isAuthUser() && (
            <Button>
              <DeleteIcon className={classes.deleteIcon}/>
            </Button>
          )}
          </div>
          </Popup>
        )}
        </ReactMapGL>
        <Blog />
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
