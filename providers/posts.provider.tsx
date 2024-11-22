"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface Post {
  id: number;
  title: string;
  description: string;
  userName: string;
  createDate: string;
  updateDate: string;
  postType: {
    id: number;
    title: string;
  };
  commentCount: number;
}

interface PostById {
  id: number;
  title: string;
  description: string;
  userName: string;
  createDate: string;
  updateDate: string;
  postType: {
    id: number;
    title: string;
  };
  comment: Comment[];
}

interface Comment {
  comment: string;
  createDate: string;
  id: number;
  updateDate: string;
  userNameComment: string;
}

interface PostType {
  id: number;
  title: string;
}

interface PostsProviderProps {
  children: ReactNode;
}

interface PostsContextType {
  postsList: Post[];
  postById: PostById | null | undefined;
  postsTypeList: PostType[];
  addPosts: (posts: Post[]) => void;
  addPostById: (postById: PostById) => void;
  addPostType: (postType: PostType[]) => void;
}

const PostsContext = createContext<PostsContextType>({
  postsList: [],
  postById: null,
  postsTypeList: [],
  addPosts: () => {},
  addPostById: () => {},
  addPostType: () => {},
});

const PostsProvider: React.FC<PostsProviderProps> = ({ children }) => {
  const [postsList, setPostsList] = useState<Post[]>([]);
  const [postById, setPostById] = useState<PostById>();
  const [postsTypeList, setPostsTypeList] = useState<PostType[]>([]);

  const addPosts = (posts: Post[]) => {
    setPostsList(posts);
    setPostById(undefined);
  };

  const addPostById = (postById: PostById) => {
    setPostById(postById);
  };

  const addPostType = (postType: PostType[]) => {
    setPostsTypeList(postType);
  };


  return (
    <PostsContext.Provider
      value={{ postsList, addPosts, postById, addPostById, postsTypeList, addPostType }}
    >
      {children}
    </PostsContext.Provider>
  );
};
export default PostsProvider;
export const usePosts = () => useContext(PostsContext);
