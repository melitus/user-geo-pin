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
  input CreatePinInput {
    title: String
    image: String
    content: String
    latitude: Float
    longitude: Float
  }
  type Query {
    me: User
  }
  type Mutation {
    createPin(input: CreatePinInput!): Pin
  }
`

export default typeDefs
