import React, { useState } from 'react'

import getCurrentUser from '../services/auth/current-user'
import useUploadFile from '../hooks/useFileUpload'

export default function () {
  const [file, setFile] = useState<File>()
  const { percentage, status, error, downloadURL, upload } = useUploadFile()

  function onChange (e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length >= 1) {
      setFile(e.target.files[0])
    }
  }

  function onSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const userId = getCurrentUser()?.uid
    if (file && userId) upload(userId, file)
  }

  return (
    <div>
      <br/><br/><br/><br/>
      <form onSubmit={onSubmit}>
        <input type='file' onChange={onChange}/>
        <input type='submit' value='Upload'/>
      </form>
      <div><b>Percentage: </b>{percentage}%</div>
      <div><b>Download URL: </b>{downloadURL}</div>
      <div><b>Status: </b>{status}</div>
      <div><b>Error: </b>{error?.message}</div>
    </div>
  )
}
