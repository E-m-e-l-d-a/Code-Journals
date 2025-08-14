import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import DeleteIcon from '@mui/icons-material/Delete';

interface Post {
  _id: string;
  title: string;
  post: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Blogs() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const navigate = useNavigate();

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<Post[]>(`${API_BASE_URL}/api/blogs`);
      setPosts(response.data);
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/blogs/${id}`);
  };

const handleDelete = async (id: string) => {
  if (!window.confirm("Are you sure you want to delete this post?")) return;
  setDeletingId(id);
  try {
    await axios.delete(`${API_BASE_URL}/api/delete/blog/${id}`);

    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));

  } catch (err) {
    const message = axios.isAxiosError(err)
      ? err.response?.data?.message || err.message
      : "Failed to delete post";
    alert(message);
    console.error("Error deleting post:", err);

  } finally {
    setDeletingId(null);
  }
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

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="divblog flex-center flex-col">
          <h1 className="text-white">Blog Posts</h1>
          <p className="text-red-500">Error: {error}</p>
          <button 
            onClick={loadPosts} 
            className="pubtn mt-4"
            aria-label="Retry loading posts"
          >
            Retry
          </button>
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
            <div key={post._id} className="divposts">
              <h2>{post.title}</h2>
              <p>{post.post}</p>
              <div>
                <button 
                  onClick={() => handleEdit(post._id)} 
                  className="pubtn blogbtn"
                  aria-label={`Edit post: ${post.title}`}
                >
                  <EditDocumentIcon />
                </button>
                <button 
                  onClick={() => handleDelete(post._id)} 
                  className="pubtn blogbtn"
                  disabled={deletingId === post._id}
                  aria-label={`Delete post: ${post.title}`}
                >
                  {deletingId === post._id ? 'Deleting...' : <DeleteIcon />}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
