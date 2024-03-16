import { Schema, Types, model } from 'mongoose';

interface IPost {
  title: string;
  content: string;
  author: Types.ObjectId;
  createdAt: Date;
}

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, required: true },
});

const Post = model<IPost>('Post', postSchema);

export default Post;
