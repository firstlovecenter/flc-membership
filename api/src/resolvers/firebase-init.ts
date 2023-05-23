const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')

const serviceAccount = require('./credentials.json')

export const app = initializeApp({
  credential: cert(serviceAccount),
})
export const db = getFirestore(app)
