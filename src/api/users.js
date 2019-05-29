import firebase from 'firebase/app'
import 'firebase/firestore'

import Endpoint from './Endpoint'

export default class UserAPI extends Endpoint {
  constructor () {
    super(firebase.firestore().collection('users'))
  }
}
