import MongoStore from 'connect-mongo';
import expressSession, { CookieOptions } from 'express-session';

import env from '../env';

const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'none',
  secure: true,
  partitioned: true,
};

const session = expressSession({
  name: 'mernblog.sid',
  secret: env.SESSION_SECRET,
  cookie: env.isProd ? cookieOptions : undefined,
  store: MongoStore.create({
    mongoUrl: env.MONGODB_URI,
    dbName: 'blog',
  }),
  resave: false,
  saveUninitialized: false,
});

export default session;
