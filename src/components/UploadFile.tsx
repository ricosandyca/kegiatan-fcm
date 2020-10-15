import React, { useState } from 'react'
import firebase from 'firebase/app'

import getCurrentUser from '../services/auth/current-user'

export default function () {
  const storage = firebase.storage()
  const [file, setFile] = useState<File|undefined>(undefined)
  const [percentage, setPercentage] = useState(0)

  function onChange (e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    const files = e.target.files
    if (files) setFile(files[0])
  }

  function onSubmit (e: React.FormEvent) {
    e.preventDefault()
    if (!file) return alert('Empty')
    const userId = getCurrentUser()?.uid || ''
    const storageRef = storage.ref(`${userId}/${file.name}`)
    storageRef
      .put(file)
      .on(
        'state_changed',
        function progress (snapshot) {
          const currPercentage = (snapshot.bytesTransferred / file.size) * 100
          setPercentage(currPercentage)
        },
        function error (err) {
          alert(err.message)
        },
        function completed () {
          alert('Uploaded')
        }
      )
  }

  return (
    <div>
      <br /><br /><br /><br />
      <form onSubmit={onSubmit}>
        <input type='file' onChange={onChange}/>
        <input type='submit' value='Upload'/>
      </form>
      <div>Percentage: {percentage}%</div>
      <div>Filename: {file?.name || ''}</div>
    </div>
  )
}
