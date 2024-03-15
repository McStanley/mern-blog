import MongoStore from 'connect-mongo';
import expressSession from 'express-session';

import env from '../env';

const session = expressSession({
  name: 'mernblog.sid',
  secret: env.SESSION_SECRET,
  store: MongoStore.create({
    mongoUrl: env.MONGODB_URI,
    dbName: 'blog',
  }),
  resave: false,
  saveUninitialized: false,
});

export default session;
