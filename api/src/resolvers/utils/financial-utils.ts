import { Stream } from '@jaedag/admin-portal-types'

const dotenv = require('dotenv')

dotenv.config()

export const getStreamFinancials = (stream?: Stream) => {
  const auth = process.env.PAYSTACK_PRIVATE_KEY_WEEKDAY || ''
  let subaccount = ''

  switch (stream?.bankAccount) {
    case 'aes_account':
      subaccount = process.env.PAYSTACK_SUBACCOUNT_AES || ''
      break
    case 'ges_account':
      subaccount = process.env.PAYSTACK_SUBACCOUNT_GES || ''
      break
    case 'hge_account':
      subaccount = process.env.PAYSTACK_SUBACCOUNT_HGE || ''
      break
    case 'fle_account':
      subaccount = process.env.PAYSTACK_SUBACCOUNT_FLE || ''
      break

    default:
      break
  }

  return { auth, subaccount }
}

export default getStreamFinancials
