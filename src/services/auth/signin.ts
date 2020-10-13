import firebase from 'firebase/app'

/**
 * Run firebase google popup to sign in
 * @returns firebase user's credential
 */
export async function google () {
  const provider = new firebase.auth.GoogleAuthProvider()
  return await firebase.auth().signInWithPopup(provider)
}
