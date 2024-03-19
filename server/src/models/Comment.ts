import { Schema, Types, model } from 'mongoose';

interface IComment {
  post: Types.ObjectId;
  content: string;
  author: Types.ObjectId;
  createdAt: Date;
}

const commentSchema = new Schema<IComment>({
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, required: true },
});

const Comment = model<IComment>('Comment', commentSchema);

export default Comment;
