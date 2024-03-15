import { cleanEnv, str } from 'envalid';

const env = cleanEnv(process.env, {
  PORT: str({
    default: '3000',
  }),
  MONGODB_URI: str({
    desc: 'MongoDB connection string',
    example:
      'mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority',
  }),
  SESSION_SECRET: str({
    desc: 'express-session secret',
    docs: 'https://www.npmjs.com/package/express-session',
  }),
  CORS_ORIGIN: str({
    devDefault: 'http://localhost:5173',
  }),
});

export default env;
