import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'

import { listAll } from '../services/storage'

export default function () {
  const [files, setFiles] = useState<firebase.storage.Reference[]>()

  useEffect(() => {
    listAll()
      .then(items => setFiles(items))
      .catch(console.log)
  }, [])

  return (
    <div>
      <br /><br /><br /><br /><br />
      {
        files?.map((file, index) => (
          <div key={index}>
            <span>Name: {file.name}</span>
            <span>Path: {file.fullPath}</span>
          </div>
        ))
      }
    </div>
  )
}
