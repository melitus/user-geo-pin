import { ApolloServer } from 'apollo-server'
import winston from 'winston'
import { findOrCreateUser } from '../controllers/UserController'

import schema from '../grapgql'

// open mongoose connection
require('../config/mongoose')

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    let authToken = null
    let currentUser = null
    try {
      authToken = req.headers.authorization
      if (authToken) {
        // find or create a user
        currentUser = await findOrCreateUser(authToken)
      }
    } catch (e) {
      console.error(`Unable to verify user with the token ${authToken}`)
    }
    return { currentUser }
  },
  introspection: true,
  playground: true
})

server.listen().then(({ url }) => {
  winston.info(` 🚀 Apollo Server on http://localhost:${url}`)
})
export default server
