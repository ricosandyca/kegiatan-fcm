import firebase from 'firebase/app'

export async function google () {
  const provider = new firebase.auth.GoogleAuthProvider()
  return await firebase.auth().signInWithPopup(provider)
}
