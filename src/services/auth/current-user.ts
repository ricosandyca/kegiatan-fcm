import firebase from 'firebase/app'

/**
 * Get current authorized user's data
 * @returns authorized firebase user's data
 */
export default function () {
  return firebase.auth().currentUser
}
