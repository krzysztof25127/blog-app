import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE } from "../utils/api";

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/posts`)
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(`${API_BASE}/posts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete post");
      setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Blog Posts</h1>
        <button
          onClick={() => navigate("/add")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          + Add Post
        </button>
      </div>
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="border rounded p-6 text-gray-500 bg-white shadow-sm">
            No posts yet.
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col gap-2 border"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  <Link to={`/posts/${post._id}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
                <span className="text-xs text-gray-400">
                  {new Date(post.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-700 py-2">{post.content}</p>
              <div className="flex gap-2 mt-2">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  onClick={() => navigate(`/edit/${post._id}`)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(post._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
