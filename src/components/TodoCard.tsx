import React, { useEffect } from 'react'

import * as todoDBServices from '../services/firestore/task'

export default function () {
  useEffect(() => {
    todoDBServices.getMany()
      .then(data => console.log(data))
  }, [])

  return (
    <div>
      <b>Title: </b>
      <span>body</span>
    </div>
  )
}
