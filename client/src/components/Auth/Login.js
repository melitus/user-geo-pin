import React from "react";
import { GoogleLogin } from 'react-google-login';
import { GraphQLClient } from 'graphql-request';
import { withStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";

const ME_QUERY = `
    {
      me {
        _id
        name
        email
        picture
      }
    }

`

const Login = ({ classes }) => {

const onSuccess = async googleUser => {
  const idToken = googleUser.getAuthResponse().id_token;
  const endpoint = 'http://localhost:4000/graphql'
  const client = new GraphQLClient( endpoint, { headers: { authorization: idToken },})
  const data = await client.request(ME_QUERY);
  console.log({data})
  }

  return (
    <GoogleLogin
      clientId="562977696878-4julqilvkqqbjh712veous3lnvoseft7.apps.googleusercontent.com" 
      onSuccess ={ onSuccess }
      isSignedIn={ true }
      />
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
