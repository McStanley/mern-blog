import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import logger from 'morgan';
import passport from 'passport';

import session from './middleware/session';
import appendUser from './middleware/appendUser';

import authRouter from './routes/auth';

import './auth/setupPassport';

import env from './env';

const app = express();

app.use(logger('dev'));

app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(appendUser);

app.use('/auth', authRouter);

export default app;
