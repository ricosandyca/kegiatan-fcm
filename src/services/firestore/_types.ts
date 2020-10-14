import firebase from 'firebase/app'

export enum TaskTodoStatus {
  TODO = 'TODO',
  STARTED = 'STARTED',
  DONE = 'DONE'
}

export type FirestoreDocument<Document = {}> = Document & {
  id: string
  createdAt: firebase.firestore.Timestamp
  updatedAt: firebase.firestore.Timestamp
}

export type Task = {
  userId: string
  category: {
    name?: string
    color?: string
  }
}

export type TaskTodo = {
  name?: string
  status?: TaskTodoStatus
}
