import User from '../models/User'
import { OAuth2Client } from 'google-auth-library'
import { appKey } from '../config/credentials'

const client = new OAuth2Client(appKey.oAuth)

const findOrCreateUser = async token => {
  // verify auth token
  const googleUser = await verifyAuthToken(token)
  // check if user exist
  const user = await checkIfUserExists(googleUser.email)
  // if user exist, return them, otherwise, create new user in db

  return user || createNewUser(googleUser)
}

const verifyAuthToken = async token => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: appKey.oAuth
    })
    return ticket.getPayload()
  } catch (e) {
    console.error('Error verifying auth token', e)
  }
}

const checkIfUserExists = async email => {
  await User.findOne({ email }).exec()
}
const createNewUser = googleUser => {
  const { name, email, picture } = googleUser
  const user = { name, email, picture }
  return new User(user).save()
}

export default findOrCreateUser
