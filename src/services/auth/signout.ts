import firebase from 'firebase/app'

/**
 * Sign out firebase user
 * @returns void
 */
export default function () {
  firebase.auth().signOut()
}
