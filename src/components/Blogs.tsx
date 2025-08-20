import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
import {Toaster, toast} from "react-hot-toast";
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

const handleDelete = (id: string) => {
  toast((t) => (
    <div className="flex flex-col gap-2">
      <span>Are you sure you want to delete this post?</span>
      <div className="flex gap-2">
        <button 
          onClick={async () => {
            toast.dismiss(t.id);
            setDeletingId(id);
            try {
              await axios.delete(`${API_BASE_URL}/api/delete/blog/${id}`);
              setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
              toast("Post deleted!");
            } catch (err) {
              console.error("Error deleting post:", err);
              toast.error("Failed to delete post");
            } finally {
              setDeletingId(null);
            }
          }}
          className="logbtn"
        >
          Yes
        </button>
        <button 
          onClick={() => toast.dismiss(t.id)}
          className="px-3 py-1 bg-gray-300 rounded"
        >
          No
        </button>
      </div>
    </div>
  ), {
    duration: 5000,
  });
};

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="divblog flex-center flex-col">
          <h1 className="text-white">Blog Posts</h1>
          <p className="flex items-center">
        <div role="status">
            <svg aria-hidden="true" className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#2D336B]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
            <span className="sr-only">Loading...</span>
        </div>
        Loading blogs
    </p>
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
      <Toaster />
      <div className="divblog flex-center flex-col">
        <h1 className="text-white">Blog Posts</h1>
        {posts.length === 0 ? (
          <p>No posts yet. Create your first blog post!</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="divposts">
              <h2>{post.title}</h2>
              <p>{post.post.substring(0, 100)}...</p>
          <Link to={`/blog/${post._id}`}
            className="text-[#2D336B] text-[1rem]"
          >
            read more...
          </Link>
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
