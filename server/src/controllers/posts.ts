import asyncHandler from 'express-async-handler';
import Post from '../models/Post';

export const getAll = asyncHandler(async (req, res, next) => {
  const posts = await Post.find().populate('author', { username: 1 });
  res.json({ posts });
});
