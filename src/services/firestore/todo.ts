import firebase from 'firebase/app'

import { FirestoreDocument, Todo } from './_types'
import getCurrentUser from '../auth/current-user'

const COLLECTION_PATH = 'todos'

type TodoDocument = FirestoreDocument<Todo>

/**
 * Get todos data and filter by current user id
 * @returns user's todos
 */
export async function getMany (): Promise<TodoDocument[]> {
  const userId = getCurrentUser()?.uid
  const data = await firebase
    .firestore()
    .collection(COLLECTION_PATH)
    .where('userId', '==', userId)
    .get()
  return data.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as TodoDocument[]
}

/**
 * Get todo data by specific id
 *
 * @param todoId value of todo id to get
 * @returns user's todo
 */
export async function getOne (todoId: string): Promise<TodoDocument> {
  const data = await firebase
    .firestore()
    .collection(COLLECTION_PATH)
    .doc(todoId)
    .get()
  return {
    id: data.id,
    ...data.data()
  } as TodoDocument
}

/**
 * Create a new todo data
 *
 * @param newTodo value of the new todo to create
 * @returns created todo id
 */
export async function createOne (newTodo: Omit<Todo, 'userId'>): Promise<string> {
  const userId = getCurrentUser()?.uid
  const currentDate = firebase.firestore.Timestamp.fromDate(new Date())
  const doc = await firebase
    .firestore()
    .collection(COLLECTION_PATH)
    .add({
      ...newTodo,
      userId,
      createdAt: currentDate,
      updatedAt: currentDate
    })
  return doc.id
}

/**
 * Update todo data by specific id
 *
 * @param todoId value of todo id to update
 * @returns updated todo id
 */
export async function updateOne (todoId: string, updateTodo: Partial<Omit<Todo, 'userId'>>): Promise<string> {
  const currentDate = firebase.firestore.Timestamp.fromDate(new Date())
  await firebase
    .firestore()
    .collection(COLLECTION_PATH)
    .doc(todoId)
    .update({
      ...updateTodo,
      updatedAt: currentDate
    })
  return todoId
}

/**
 * Delete todo by specific id
 *
 * @param todoId value of todo id to delete
 * @returns deleted todo id
 */
export async function deleteOne (todoId: string): Promise<string> {
  await firebase
    .firestore()
    .collection(COLLECTION_PATH)
    .doc(todoId)
    .delete()
  return todoId
}
