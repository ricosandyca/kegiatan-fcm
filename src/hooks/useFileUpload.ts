import { useState, useEffect } from 'react'
import firebase from 'firebase/app'

export default function () {
  const [ref, setRef] = useState<firebase.storage.Reference>()

  const [percentage, setPercentage] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState<Error>()
  const [downloadURL, setDownloadURL] = useState<string>()

  useEffect(() => {
    if (isComplete)
      ref?.getDownloadURL()
        .then(downloadURL => setDownloadURL(downloadURL))
        .catch(() => setDownloadURL(undefined))
  }, [ref, isComplete])

  const reset = () => {
    setRef(undefined)
    setPercentage(0)
    setIsComplete(false)
    setError(undefined)
    setDownloadURL(undefined)
  }

  const upload = (prefix: string, file: File) => {
    reset()
    firebase
      .storage()
      .ref(`${prefix}/${file.name}`)
      .put(file)
      .on(
        'state_changed',
        function progress (progress) {
          setRef(progress.ref)
          setPercentage((progress.bytesTransferred / file.size) * 100)
        },
        function error (err) {
          setError(err)
        },
        function complete () {
          setIsComplete(true)
        }
      )
  }

  return { percentage, isComplete, error, downloadURL, upload }
}
