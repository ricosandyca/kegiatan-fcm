import firebase from 'firebase/app'

export async function becomeAdmin () {
  const becomeAdmin = firebase
    .functions()
    .httpsCallable('becomeAdmin')
  return await becomeAdmin()
}
