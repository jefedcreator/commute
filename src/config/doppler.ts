const { loadSecrets } = require('gitops-secrets');
const dotenv = require('dotenv');
dotenv.config();
export function fetchSecrets() {
  try {
    const payload = loadSecrets();
    return payload.populateEnv();
  } catch (error) {
    if (!process.env.APP_NAME) {
      process.exit(1);
    }
  }
}
