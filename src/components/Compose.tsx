import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Compose() {
  const [inputText, setInputText] = useState({
    title: "",
    post: "",
  });
  const navigate = useNavigate();

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
      const res = await fetch("http://localhost:5000/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputText),
      });

      if (!res.ok) throw new Error("Failed to create post");
      
      setInputText({ title: "", post: "" });
      navigate("/blogs");
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to publish blog. Please try again.");
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
