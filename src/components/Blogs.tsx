import React, { useState } from "react";
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

interface BlogsProps {
  posts: Post[];
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedPost: { title: string; post: string }) => void;
}

export default function Blogs({ posts, onDelete, onEdit }: BlogsProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: '', post: '' });

  const handleEdit = (post: Post) => {
    setEditingId(post.id);
    setEditForm({ title: post.title, post: post.post });
  };

  const handleSave = (id: string) => {
    onEdit(id, editForm);
    setEditingId(null);
    setEditForm({ title: '', post: '' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({ title: '', post: '' });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      onDelete(id);
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

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
                    className="md:w-10/12 w-full outline-[#2D336B] border-[0.1rem] m-2 text-[1.5rem]"
                  />
                  <textarea
                    name="post"
                    value={editForm.post}
                    onChange={handleEditChange}
                    className="md:w-10/12 w-full outline-[#2D336B] border-[0.1rem] m-2 text-[1.5rem]"
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
