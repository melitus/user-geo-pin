import { gql } from 'apollo-server'

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    picture: String
  }
  type Pin {
    _id: ID
    createdAt: String
    title: String
    content: String
    image: String
    latitude: Float
    longitude: Float
    author: User
    comments: [Comment]
  }
  type Comment {
    text: String
    createdAt: String
    user: User
  }
  type Query {
    me: User
  }
`

export default typeDefs