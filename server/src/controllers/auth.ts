import { hash } from 'bcryptjs';
import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import { matchedData, validationResult } from 'express-validator';
import passport from 'passport';
import User from '../models/User';
import signupValidations from '../validations/signup';

export const signup_POST: RequestHandler[] = [
  ...signupValidations,
  asyncHandler(async (req, res, next) => {
    const vResult = validationResult(req);

    if (!vResult.isEmpty()) {
      res.status(400).json({
        errors: vResult.array(),
      });

      return;
    }

    const data = matchedData(req) as { username: string; password: string };

    const hashedPassword = await hash(data.password, 10);

    const user = new User({
      username: data.username,
      password: hashedPassword,
    });

    await user.save();

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }

      res.json({ msg: 'Success' });
    });
  }),
];

export const signin_POST: RequestHandler = (req, res, next) => {
  passport.authenticate('local', (err: Error, user: Express.User) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }

      res.json({ msg: 'Success' });
    });
  })(req, res, next);
};

export const logout_POST: RequestHandler = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.json({ msg: 'Success' });
  });
};

export const whoami_GET: RequestHandler = (req, res, next) => {
  // handled by appendUser middleware
  res.json(null);
};
