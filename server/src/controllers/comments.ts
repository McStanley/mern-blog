import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import { matchedData, validationResult } from 'express-validator';
import Comment from '../models/Comment';
import commentValidations from '../validations/comment';

export const create: RequestHandler[] = [
  ...commentValidations,
  asyncHandler(async (req, res, next) => {
    if (!req.user) {
      res.status(401).json({
        error: 'User not logged in',
      });

      return;
    }

    const vResult = validationResult(req);

    if (!vResult.isEmpty()) {
      res.status(400).json({
        errors: vResult.array(),
      });

      return;
    }

    const data = matchedData(req) as { post: string; content: string };

    const comment = new Comment({
      post: data.post,
      author: req.user._id,
      content: data.content,
      createdAt: new Date(),
    });

    await comment.save();

    res.json({ msg: 'Comment created' });
  }),
];
