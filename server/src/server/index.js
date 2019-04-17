import { ApolloServer } from 'apollo-server'
import winston from 'winston'

import schema from '../grapgql'

// open mongoose connection
require('../config/mongoose')

const server = new ApolloServer({
  schema,
  introspection: true,
  playground: true
})

server.listen().then(({ url }) => {
  winston.info(` 🚀 Apollo Server on http://localhost:${url}`)
})
export default server
