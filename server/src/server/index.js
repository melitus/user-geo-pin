import { ApolloServer } from 'apollo-server'
import winston from 'winston'
import { findOrCreateUser } from '../controllers/UserController'

import schema from '../grapgql'

// open mongoose connection
require('../config/mongoose')

const getCurrentUser = async ({ req }) => {
  let authToken = null
  let currentUser = null
  try {
    authToken = req.headers.authorization
    if (authToken) {
      // find or create a user
      currentUser = await findOrCreateUser(authToken)
      console.log({ currentUser })
    }
  } catch (e) {
    console.error(`Unable to verify user with the token ${authToken}`)
  }
  return { currentUser }
}

const server = new ApolloServer({
  schema,
  context: getCurrentUser(),
  introspection: true,
  playground: true
})

server.listen().then(({ url }) => {
  winston.info(` 🚀 Apollo Server on ${url}`)
})
export default server
