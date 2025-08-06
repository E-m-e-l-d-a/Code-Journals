import React from "react";
import Navbar from "./Navbar";

interface Post {
  title: string;
  post: string;
}

interface BlogsProps {
  posts: Post[];
}

export default function Blogs({ posts }: BlogsProps) {
  return (
    <div>
      <Navbar />
      <div className="divblog flex-center flex-col">
        <h1>Blog Posts</h1>
        {posts.length === 0 ? (
          <p>No posts yet. Create your first blog post!</p>
        ) : (
          posts.map((post, index) => (
            <div key={index} className="divposts">
              <h2>{post.title}</h2>
              <img src="" alt="" className="imgblog"/>
              <p>{post.post}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
