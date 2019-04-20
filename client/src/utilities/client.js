import { useState , useEffect } from 'react'
import { GraphQLClient } from 'graphql-request'

const endpoint = 'http://localhost:4000/graphql'
export const BASE_URL = 
process.env.NODE_ENV === 'production' ? '<insert-production-url>' : endpoint

export const useClient = () =>{
const [ idToken , setIdToken ] = useState("")

useEffect(() => {
    const token = window.gapi.auth2
    .getAuthInstance()
    .currentUser.get()
    .getAuthResponse().id_token;
    setIdToken(token)
}, [])
return new GraphQLClient(BASE_URL,{
    headers: { authorization: idToken }
})
}