import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

export default function Compose() {
  const [inputText, setInputText] = useState({
    title: "",
    post: "",
  });
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setInputText((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent) {
  event.preventDefault();
  try {
    await axios.post(`${API_BASE_URL}/api/blog`, inputText, {
      headers: { "Content-Type": "application/json" },
    });

    setInputText({ title: "", post: "" });
    navigate("/blogs");

  } catch (err) {
    console.error("Error creating post:", err);
  }
}

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event as unknown as React.FormEvent);
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
              rows={7}
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
