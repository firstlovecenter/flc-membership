import SECRETS from './getSecrets'

const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const dotenv = require('dotenv')

dotenv.config()
const serviceAccount = {
  type: 'service_account',
  project_id: SECRETS.FIREBASE_PROJECT_ID,
  private_key_id: SECRETS.FIREBASE_PRIVATE_KEY_ID,
  private_key: SECRETS.FIREBASE_PRIVATE_KEY?.replace(/\\n/gm, '\n'),
  client_email: SECRETS.FIREBASE_CLIENT_EMAIL,
  client_id: SECRETS.FIREBASE_CLIENT_ID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: SECRETS.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: 'googleapis.com',
}

export const app = initializeApp({
  credential: cert(serviceAccount),
})
export const db = getFirestore(app)
