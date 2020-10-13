import firebase from 'firebase/app'

export default function () {
  return firebase.auth().currentUser
}
