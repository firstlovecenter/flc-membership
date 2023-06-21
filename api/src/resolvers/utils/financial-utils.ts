import { Stream } from '@jaedag/admin-portal-types'
import SECRETS from '../getSecrets'

const dotenv = require('dotenv')

dotenv.config()

export const getStreamFinancials = (stream?: Stream) => {
  const auth = SECRETS.PAYSTACK_PRIVATE_KEY_WEEKDAY || ''
  let subaccount = ''

  switch (stream?.bankAccount) {
    case 'aes_account':
      subaccount = SECRETS.PAYSTACK_SUBACCOUNT_AES || ''
      break
    case 'ges_account':
      subaccount = SECRETS.PAYSTACK_SUBACCOUNT_GES || ''
      break
    case 'hge_account':
      subaccount = SECRETS.PAYSTACK_SUBACCOUNT_HGE || ''
      break
    case 'fle_account':
      subaccount = SECRETS.PAYSTACK_SUBACCOUNT_FLE || ''
      break

    default:
      break
  }

  return { auth, subaccount }
}

export default getStreamFinancials
