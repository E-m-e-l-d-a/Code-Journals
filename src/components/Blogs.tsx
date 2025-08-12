import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

interface Post {
  id: string;
  title: string;
  post: string;
}

export default function Blogs() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: '', post: '' });
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/blogs");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadPosts();
  }, []);

  const handleEdit = (post: Post) => {
    setEditingId(post.id);
    setEditForm({ title: post.title, post: post.post });
  };

  const handleSave = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/blogs/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });

      if (!res.ok) throw new Error("Failed to update post");

      const updatedPost = await res.json();
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === id ? updatedPost : post
        )
      );
      setEditingId(null);
      setEditForm({ title: '', post: '' });
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({ title: '', post: '' });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      console.log("Deleting post with ID:", id);

      try {
        const res = await fetch(`http://localhost:5000/blogs/${id}`, {
          method: 'DELETE'
        });
        if (!res.ok) throw new Error("Failed to delete post");

        setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
      } catch (err) {
        console.error("Error deleting post:", err);
      }
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="divblog flex-center flex-col">
          <h1 className="text-white">Blog Posts</h1>
          <p>Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="divblog flex-center flex-col">
        <h1 className="text-white">Blog Posts</h1>
        {posts.length === 0 ? (
          <p>No posts yet. Create your first blog post!</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="divposts">
              {editingId === post.id ? (
                <>
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
                    rows={6}
                  />
                  <div>
                    <button onClick={() => handleSave(post.id)} className="pubtn blogbtn">
                      <SaveIcon />
                    </button>
                    <button onClick={handleCancel} className="pubtn blogbtn">
                      <CancelIcon />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2>{post.title}</h2>
                  <p>{post.post}</p>
                  <div>
                    <button onClick={() => handleEdit(post)} className="pubtn blogbtn">
                      <EditDocumentIcon />
                    </button>
                    <button onClick={() => handleDelete(post.id)} className="pubtn blogbtn">
                      <DeleteIcon />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
