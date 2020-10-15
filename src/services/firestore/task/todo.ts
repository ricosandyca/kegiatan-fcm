import firebase from 'firebase/app'

import { TASK_COLLECTION_PATH } from '.'
import { FirestoreDocument, TaskTodo } from '../_types'

export const TODO_COLLECTION_PATH = 'todos'

type TaskTodoDocument = FirestoreDocument<TaskTodo>

/**
 * Get todos data by task id
 * @returns user's todos document
 */
export async function getMany (taskId: string): Promise<TaskTodoDocument[]> {
  const data = await firebase
    .firestore()
    .collection(TASK_COLLECTION_PATH)
    .doc(taskId)
    .collection(TODO_COLLECTION_PATH)
    .get()
  return data.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as TaskTodoDocument[]
}

/**
 * Create new todo to task document
 *
 * @param taskId value of task id
 * @param newTodo value of todo data to create
 * @returns created todo id
 */
export async function createOne (taskId: string, newTodo: Omit<TaskTodo, 'userId'>) {
  const currentDate = firebase.firestore.Timestamp.fromDate(new Date())
  const doc = await firebase
    .firestore()
    .collection(TASK_COLLECTION_PATH)
    .doc(taskId)
    .collection(TODO_COLLECTION_PATH)
    .add({
      ...newTodo,
      createdAt: currentDate,
      updatedAt: currentDate
    })
  return doc.id
}

/**
 * Update todo data by task id and todo id
 *
 * @param taskId value of task id
 * @param todoId value of todo if to update
 * @param updateTodo value of update todo data
 * @returns updated todo id
 */
export async function updateOne (taskId: string, todoId: string, updateTodo: Partial<Omit<TaskTodo, 'userId'>>) {
  const currentDate = firebase.firestore.Timestamp.fromDate(new Date())
  await firebase
    .firestore()
    .collection(TASK_COLLECTION_PATH)
    .doc(taskId)
    .collection(TODO_COLLECTION_PATH)
    .doc(todoId)
    .update({
      ...updateTodo,
      updatedAt: currentDate
    })
  return todoId
}

/**
 * Delete a todo document by task id and todo id
 *
 * @param taskId value of task id
 * @param todoId value of todo id to delete
 * @returns deleted todo id
 */
export async function deleteOne (taskId: string, todoId: string) {
  await firebase
    .firestore()
    .collection(TASK_COLLECTION_PATH)
    .doc(taskId)
    .collection(TODO_COLLECTION_PATH)
    .doc(todoId)
    .delete()
  return todoId
}
