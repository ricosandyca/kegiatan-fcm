import firebase from 'firebase/app'

export default function () {
  firebase.auth().signOut()
}
