import { AuthenticationError } from 'apollo-server'
import Pin from '../../../models/Pin'

const authenticated = next => (root, args, ctx, info) => {
  if (!ctx.currentUser) {
    throw new AuthenticationError('You Must be logged in')
  }
  return next(root, args, ctx, info)
}

const resolvers = {
  Query: {
    me: authenticated((root, args, ctx) => ctx.currentUser),
    getPins: async (root, args, cts) => {
      const pins = await Pin.find({})
        .populate('author')
        .populate('comments.author')
      return pins
    }
  },
  Mutation: {
    createPin: authenticated(async (root, args, ctx) => {
      const newPin = await new Pin({
        ...args.input,
        author: ctx.currentUser._id
      }).save()
      const pinAdded = await Pin.populate(newPin, 'author')
      return pinAdded
    })
  }
}

export default resolvers
