import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()

export const becomeAdmin = functions.https.onCall(async (data, context) => {
  // log request data
  functions.logger.log('becomeAdmin function invoked...')
  functions.logger.log('data', data)

  if (!context.auth) throw new Error('Not authorized')
  await admin
    .auth()
    .setCustomUserClaims(context.auth.uid, { admin: true })
  return { message: 'Successfully become admin' }
})
