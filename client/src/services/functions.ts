import firebase from 'firebase/app'

/**
 * Invoke become admin firebase function
 * @returns firebase functions response
 */
export async function becomeAdmin () {
  const becomeAdmin = firebase
    .functions()
    .httpsCallable('becomeAdmin')
  return await becomeAdmin()
}
