import { Stream } from '@jaedag/admin-portal-api-core'

const dotenv = require('dotenv')

dotenv.config()

export const getStreamFinancials = (stream: Stream) => {
  const auth = process.env.PAYSTACK_PRIVATE_KEY_WEEKDAY || ''
  let subaccount = ''

  switch (stream.accountName) {
    case 'aes_account':
      throw new Error(
        'Payment Error' +
          'Anagkazo has a different financial system. Thank you!'
      )
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
