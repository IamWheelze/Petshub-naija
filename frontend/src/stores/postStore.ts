import { create } from 'zustand';

interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  pet?: {
    name: string;
    avatar: string;
  };
  caption: string;
  image: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  timestamp: string;
}

interface PostStore {
  posts: Post[];
  addPost: (post: Omit<Post, 'id' | 'likes' | 'comments' | 'isLiked' | 'timestamp'>) => void;
  setPosts: (posts: Post[]) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],

  addPost: (postData) => {
    const newPost: Post = {
      ...postData,
      id: `post-${Date.now()}`,
      likes: 0,
      comments: 0,
      isLiked: false,
      timestamp: 'Just now',
    };

    set((state) => ({
      posts: [newPost, ...state.posts],
    }));
  },

  setPosts: (posts) => set({ posts }),
}));
