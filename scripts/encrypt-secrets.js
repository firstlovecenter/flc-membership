// ./bin/encrypt-secrets.js
// eslint-disable-next-line import/no-unresolved
const secrets = require('gitops-secrets')

async function main() {
  const payload = await secrets.providers.doppler.fetch()
  secrets.build(payload, { path: 'lib/secrets.js' })
  secrets.build(payload, { path: 'api/src/resolvers/secrets.ts' })
}

main()
