import { useState, useEffect } from 'react'
import firebase from 'firebase/app'

enum UploadStatus {
  WAITING = 'WAITING',
  UPLOADING = 'UPLOADING',
  UPLOADED = 'UPLOADED',
  ERROR = 'ERROR'
}

const defaultRef: firebase.storage.Reference | undefined = undefined
const defaultPercentage: number = 0
const defaultStatus: UploadStatus = UploadStatus.WAITING
const defaultError: Error | undefined = undefined
const defaultDownloadURL: string | undefined = undefined

export default function () {
  const [ref, setRef] = useState(defaultRef)

  const [percentage, setPercentage] = useState(defaultPercentage)
  const [status, setStatus] = useState(defaultStatus)
  const [error, setError] = useState(defaultError)
  const [downloadURL, setDownloadURL] = useState(defaultDownloadURL)

  useEffect(() => {
    if (status === UploadStatus.UPLOADED)
      ref?.getDownloadURL()
        .then(downloadURL => setDownloadURL(downloadURL))
        .catch(() => setDownloadURL(undefined))
  }, [ref, status])

  const reset = () => {
    setRef(defaultRef)
    setStatus(defaultStatus)
    setPercentage(defaultPercentage)
    setError(defaultError)
    setDownloadURL(defaultDownloadURL)
  }

  const upload = (prefix: string, file: File) => {
    reset()
    firebase
      .storage()
      .ref(`${prefix}/${file.name}`)
      .put(file)
      .on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        function progress (progress) {
          setStatus(UploadStatus.UPLOADING)
          setRef(progress.ref)
          setPercentage((progress.bytesTransferred / file.size) * 100)
        },
        function error (err) {
          setStatus(UploadStatus.ERROR)
          setError(err)
        },
        function complete () {
          setStatus(UploadStatus.UPLOADED)
        }
      )
  }

  return { upload, percentage, status, error, downloadURL }
}
