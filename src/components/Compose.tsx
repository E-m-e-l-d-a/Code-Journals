import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

interface Post {
  id: string;
  title: string;
  post: string;
}

interface ComposeProps {
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

export default function Compose({ setPosts }: ComposeProps) {
  const [inputText, setInputText] = useState({
    title: "",
    post: ""
  });
  const navigate = useNavigate();

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setInputText((prevInput) => ({
      ...prevInput,
      [name]: value
    }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const newPost = {
      id: Date.now().toString(),
      title: inputText.title,
      post: inputText.post
    };
    setPosts((prevPosts) => [...prevPosts, newPost]);
    setInputText({ title: "", post: "" });
    navigate("/blogs");
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="divcomp">
        <h1 className="text-white">Compose</h1>
        <div className="flex-center">
          <form onSubmit={handleSubmit}>
            <label htmlFor="Title">Title</label>
            <input
              type="text"
              id="Title"
              name="title"
              value={inputText.title}
              onChange={handleChange}
              placeholder="Title"
            />

            <label htmlFor="Post">Post</label>
            <textarea
              id="Post"
              name="post"
              value={inputText.post}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Write your blog here..."
              rows={6}
            />

            <button type="submit" className="pubtn">
              publish
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}