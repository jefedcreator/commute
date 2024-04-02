const secrets = require('gitops-secrets');
const dotenv = require('dotenv');
dotenv.config();

async function buildSecrets() {
  const payload = await secrets.providers.doppler.fetch({
    dopplerProject: process.env.DOPPLER_PROJECT,
    dopplerConfig: 'prd',
  });
  return secrets.build(payload);
}

buildSecrets();
