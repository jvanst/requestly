import firestore from '@/firebase/firestore'

import Endpoint from './Endpoint'

export default class UserAPI extends Endpoint {
  constructor () {
    super(async () =>
      (await firestore())
        .collection('users'))
  }
}
