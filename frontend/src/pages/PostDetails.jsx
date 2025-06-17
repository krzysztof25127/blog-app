import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE } from "../utils/api";

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/posts/${id}`)
      .then((res) => res.json())
      .then(setPost);
  }, [id]);

  if (!post) return null;

  return (
    <div className="max-w-2xl mx-auto bg-white/80 rounded-xl shadow p-8 mt-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
      >
        ← Back
      </button>
      <h1 className="text-3xl font-bold mb-2 text-blue-700">{post.title}</h1>
      <div className="text-xs text-gray-500 mb-4">
        {new Date(post.createdAt).toLocaleString()}
      </div>
      <div className="text-gray-800 whitespace-pre-line">{post.content}</div>
    </div>
  );
}