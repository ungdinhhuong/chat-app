import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load biến môi trường từ file .env
dotenv.config({ path: resolve(process.cwd(), '.env') });

function replaceEnvPlaceholders(obj: any): any {
  if (typeof obj === 'string') {
    return obj.replace(/\$\{(\w+)\}/g, (_, key) => process.env[key] ?? '');
  }

  if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      obj[key] = replaceEnvPlaceholders(obj[key]);
    }
  }

  return obj;
}

export default () => {
  const configPath = resolve(process.cwd(), 'config/config.yaml');
  const file = readFileSync(configPath, 'utf8');
  const rawConfig = yaml.load(file) as Record<string, any>;

  return replaceEnvPlaceholders(rawConfig);
};
