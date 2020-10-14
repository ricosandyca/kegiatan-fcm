import firebase from 'firebase/app'

import { FirestoreDocument, Task, TaskTodo } from './_types'
import getCurrentUser from '../auth/current-user'

const COLLECTION_PATH = 'tasks'

type TaskDocument = FirestoreDocument<Task>
type TaskTodoDocument = FirestoreDocument<TaskTodo>

/**
 * Get tasks data and filter by current user id
 * @returns user's tasks
 */
export async function getMany (): Promise<TaskDocument[]> {
  const userId = getCurrentUser()?.uid
  const data = await firebase
    .firestore()
    .collection(COLLECTION_PATH)
    .where('userId', '==', userId)
    .get()
  return data.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as TaskDocument[]
}

/**
 * Get task data by specific id
 *
 * @param taskId value of task id to get
 * @returns user's task
 */
export async function getOne (taskId: string): Promise<TaskDocument> {
  const data = await firebase
    .firestore()
    .collection(COLLECTION_PATH)
    .doc(taskId)
    .get()
  return {
    id: data.id,
    ...data.data()
  } as TaskDocument
}

/**
 * Create a new task data
 *
 * @param newTask value of the new task to create
 * @returns created task id
 */
export async function createOne (newTask: Omit<Task, 'userId'>): Promise<string> {
  const userId = getCurrentUser()?.uid
  const currentDate = firebase.firestore.Timestamp.fromDate(new Date())
  const doc = await firebase
    .firestore()
    .collection(COLLECTION_PATH)
    .add({
      ...newTask,
      userId,
      createdAt: currentDate,
      updatedAt: currentDate
    })
  return doc.id
}

/**
 * Update task data by specific id
 *
 * @param taskId value of task id to update
 * @returns updated task id
 */
export async function updateOne (taskId: string, updateTask: Partial<Omit<Task, 'userId'>>): Promise<string> {
  const currentDate = firebase.firestore.Timestamp.fromDate(new Date())
  await firebase
    .firestore()
    .collection(COLLECTION_PATH)
    .doc(taskId)
    .update({
      ...updateTask,
      updatedAt: currentDate
    })
  return taskId
}

/**
 * Delete task by specific id
 *
 * @param taskId value of task id to delete
 * @returns deleted task id
 */
export async function deleteOne (taskId: string): Promise<string> {
  await firebase
    .firestore()
    .collection(COLLECTION_PATH)
    .doc(taskId)
    .delete()
  return taskId
}
