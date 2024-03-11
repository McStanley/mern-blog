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
});

export default env;
