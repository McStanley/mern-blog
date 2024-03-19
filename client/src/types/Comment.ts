import User from './User';

interface Comment {
  _id: string;
  post: string;
  content: string;
  author: User;
  createdAt: string;
}

export default Comment;
