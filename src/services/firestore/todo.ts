import firebase from 'firebase/app'

export async function getMany () {
  const data = await firebase.firestore()
    .collection('todos')
    .get()
  return data.docs.map(doc => doc.data())
}
