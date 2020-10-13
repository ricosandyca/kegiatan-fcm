import firebase from 'firebase/app'

export type FirestoreDocument<Document = {}> = Document & {
  id: string
  createdAt: firebase.firestore.Timestamp
  updatedAt: firebase.firestore.Timestamp
}

export type Todo = {
  userId: string
  title?: string
  body?: string
}
