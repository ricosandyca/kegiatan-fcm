import firebase from 'firebase/app'

import getCurrentUser from './auth/current-user'

/**
 * List all uploaded files info by user id
 * @returns uploaded files info
 */
export async function listAll () {
  const userId = getCurrentUser()?.uid
  const folderRef = await firebase
    .storage()
    .ref(userId)
    .listAll()
  return folderRef.items
}
