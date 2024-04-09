import { loadSecrets } from 'gitops-secrets';
import dotenv from 'dotenv';

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
