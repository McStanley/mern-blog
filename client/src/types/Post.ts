import User from './User';

interface Post {
  _id: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
}

export default Post;
