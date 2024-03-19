import { body } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import Post from '../models/Post';

const validations = [
  body('post').custom(async (input) => {
    if (!isValidObjectId(input)) {
      throw new Error('Invalid post id');
    }

    const post = await Post.findById(input);

    if (!post) {
      throw new Error('Post not found');
    }
  }),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Comment cannot be empty')
    .isLength({ max: 500 })
    .withMessage('Comment cannot exceed 500 characters'),
];

export default validations;
