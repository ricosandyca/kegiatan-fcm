import { useState } from 'react'
import firebase from 'firebase/app'

export const UPLOAD_STATUS_WAITING = 'waiting'
export const UPLOAD_STATUS_UPLOADING = 'uploading'
export const UPLOAD_STATUS_UPLOADED = 'uploaded'
export const UPLOAD_STATUS_ERROR = 'error'

type UploadStatus = typeof UPLOAD_STATUS_WAITING
  | typeof UPLOAD_STATUS_UPLOADING
  | typeof UPLOAD_STATUS_UPLOADED
  | typeof UPLOAD_STATUS_ERROR

const defaultStatus: UploadStatus = UPLOAD_STATUS_WAITING
const defaultProgress: number = 0
const defaultError: Error | undefined = undefined

export default function () {
  const [status, setStatus] = useState(defaultStatus)
  const [progress, setProgress] = useState(defaultProgress)
  const [error, setError] = useState(defaultError)

  const reset = () => {
    setStatus(defaultStatus)
    setProgress(defaultProgress)
    setError(defaultError)
  }

  const startUpload = (file: File, path = file.name) => {
    reset()
    const uploadTaskRef = firebase
      .storage()
      .ref(path)
    uploadTaskRef
      .put(file)
      .on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        function progress (snapshot) {
          setStatus(UPLOAD_STATUS_UPLOADING)
          setProgress((snapshot.bytesTransferred / file.size) * 100)
        },
        function error (err) {
          setStatus(UPLOAD_STATUS_ERROR)
          setError(err)
        },
        function complete () {
          setStatus(UPLOAD_STATUS_UPLOADED)
        }
      )
  }

  return { status, progress, error, startUpload }
}
