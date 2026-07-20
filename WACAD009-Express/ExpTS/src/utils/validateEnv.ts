import { cleanEnv, port, str, url } from 'envalid';

const validateEnv = () =>
  cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ['development', 'test', 'production'],
      default: 'development',
    }),
    PORT: port({ default: 3333 }),
    LOG_DIR: str({ default: 'logs' }),
    LOG_FORMAT: str({ choices: ['simple', 'complete'], default: 'complete' }),
    JSON_SERVER_URL: url({ default: 'http://localhost:3355' }),
  });

export default validateEnv;
