import { RequestHandler } from 'express';
import isObject from 'isobject';

const appendUser: RequestHandler = (req, res, next) => {
  const expressJSON = res.json;

  const jsonWithUser = (body: unknown) => {
    const user = req.user
      ? {
          _id: req.user._id.toHexString(),
          username: req.user.username,
        }
      : null;

    const fullBody = {
      ...(isObject(body) ? (body as object) : {}),
      user,
    };

    return expressJSON.call(res, fullBody);
  };

  res.json = jsonWithUser;

  next();
};

export default appendUser;
