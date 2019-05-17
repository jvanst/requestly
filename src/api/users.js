import firebase from 'firebase/app'
import 'firebase/firestore'

import Endpoint from './_endpoint'

export default class UserAPI extends Endpoint {
  constructor () {
    super(firebase.firestore().collection('users'))
  }
}
