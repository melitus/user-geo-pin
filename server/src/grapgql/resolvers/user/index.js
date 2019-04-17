const user = {
  _id: '1',
  name: 'sunday',
  email: 'asmelitus@gmail.com',
  picture: 'asmmmm.com'
}

const resolvers = {
  Query: {
    me: () => {
      return user
    }
  }
}

export default resolvers
