const { loadSecrets } = require('./secrets')

const SECRETS = loadSecrets()?.JWT_SECRET ? loadSecrets() : process.env

export default SECRETS
