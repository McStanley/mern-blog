import asyncHandler from 'express-async-handler';
import { isValidObjectId } from 'mongoose';
import Post from '../models/Post';

export const getAll = asyncHandler(async (req, res, next) => {
  const posts = await Post.find().populate('author', { username: 1 });
  res.json({ posts });
});

export const getOne = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    res.status(400).json({ error: 'Invalid post id' });
    return;
  }

  const post = await Post.findById(id).populate('author', { username: 1 });

  if (!post) {
    res.status(400).json({ error: 'Post does not exist' });
    return;
  }

  res.json({ post });
});
