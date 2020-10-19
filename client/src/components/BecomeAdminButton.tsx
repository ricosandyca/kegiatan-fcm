import React, { useState, useEffect } from 'react'

import { becomeAdmin } from '../services/functions'
import getCurrentUser from '../services/auth/current-user'

export default function () {
  const [isAdmin, setIsAdmin] = useState(true)
  const [isLoading, setIsloading] = useState(false)
  const [error, setError] = useState<Error>()

  useEffect(() => {
    getCurrentUser()?.getIdTokenResult()
      .then(idTokenResult => setIsAdmin(!!idTokenResult.claims.admin))
      .catch(console.log)
  }, [])

  async function onClick () {
    try {
      setIsloading(true)
      const response = await becomeAdmin()
      alert(response.data.message)
    } catch (err) {
      setError(err)
    } finally {
      setIsloading(false)
    }
  }

  return (
    <div>
      <br /><br /><br /><br /><br />
      {
        isAdmin
         ? 'You already an admin'
         : (
           <>
             <button onClick={onClick}>Become Admin</button>
             <div>{isLoading ? 'please wait...' : ''}</div>
             <div>{error ? 'Error: ' + error.message : ''}</div>
           </>
         )
      }
    </div>
  )
}
