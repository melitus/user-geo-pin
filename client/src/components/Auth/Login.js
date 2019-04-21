import React, {useContext} from "react";
import { GoogleLogin } from 'react-google-login';
import { GraphQLClient } from 'graphql-request';
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Context from '../../context'
import { ME_QUERY } from '../../graphql/queries'
import { BASE_URL } from '../../utilities/client'

const Login = ({ classes }) => {
const { dispatch } = useContext(Context)
const onSuccess = async googleUser => {
  try {
    const idToken = googleUser.getAuthResponse().id_token;
    const client = new GraphQLClient( BASE_URL, { headers: { authorization: idToken },})
    const { me } = await client.request(ME_QUERY);
    dispatch({type:'LOGIN_USER', payload:me})
    dispatch({type:'IS_LOGGED_IN', payload: googleUser.isSignedIn()})

  } catch (e) {
    onFailure(e);
  }
  }

  const onFailure = error => {
    console.log("Error  logging in", error)
  }

  return (
    <div className={classes.root}>
    <Typography
    component="h1"
    variant="h3"
    gutterBottom
    noWrap
    style={{color: "rgb(66,133,264)"}}

    >
      Welcome
    </Typography>
    <GoogleLogin
      clientId="562977696878-4julqilvkqqbjh712veous3lnvoseft7.apps.googleusercontent.com" 
      onSuccess={ onSuccess }
      onFailure= { onFailure }
      isSignedIn={ true }
      buttonText="Login with Google"
      theme='dark'
      />
      </div>
  )
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
};

export default withStyles(styles)(Login);
