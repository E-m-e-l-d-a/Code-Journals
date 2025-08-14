import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Navbar from "./Navbar";
import axios from "axios";

interface Post {
  _id: string;
  title: string;
  post: string;
}

export default function BlogEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [post, setPost] = useState<Post | null>(null);
  const [editForm, setEditForm] = useState({ title: '', post: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  if (!id) {
    setError("Invalid post ID");
    setLoading(false);
    return;
  }

  const fetchPost = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.get(`${API_BASE_URL}/api/blog/${id}`);
      setPost(data);
      setEditForm({ title: data.title, post: data.post });

    } catch (err) {
      console.error("Error fetching post:", err);
    } finally {
      setLoading(false);
    }
  };
  fetchPost();
}, [id]);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

const handleSave = async () => {
  if (!id) return;

  try {
    await axios.put(`${API_BASE_URL}/api/update/blog/${id}`, editForm, {
      headers: { "Content-Type": "application/json" },
    });

    navigate("/blogs");
  } catch (err) {
    console.error("Error updating post:", err);
  }
};


  const handleCancel = () => {
    navigate("/blogs");
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="divblog flex-center flex-col">
          <h1 className="text-white">Loading post...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="divblog flex-center flex-col">
          <h1 className="text-white">Error: {error}</h1>
          <button onClick={() => navigate("/blogs")} className="pubtn blogbtn">Back to Blogs</button>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div>
        <Navbar />
        <div className="divblog flex-center flex-col">
          <h1 className="text-white">Post not found</h1>
          <button onClick={() => navigate("/blogs")} className="pubtn blogbtn">Back to Blogs</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="divblog flex-center flex-col">
        <h1 className="text-white">Edit Blog Post</h1>
        <input
          type="text"
          name="title"
          value={editForm.title}
          onChange={handleEditChange}
          className="inarea"
        />
        <textarea
          name="post"
          value={editForm.post}
          onChange={handleEditChange}
          className="inarea"
          rows={10}
        />
        <div>
          <button onClick={handleSave} className="pubtn blogbtn">
            <SaveIcon />
          </button>
          <button onClick={handleCancel} className="pubtn blogbtn">
            <CancelIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
