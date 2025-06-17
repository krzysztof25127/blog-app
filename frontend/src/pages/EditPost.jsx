import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE } from "../utils/api";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/posts/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Post not found");
        return res.json();
      })
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
      })
      .catch((err) => alert(err.message));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      if (!res.ok) throw new Error("Failed to update post");
      navigate(`/posts/${id}`);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg w-full space-y-4 bg-white/70 backdrop-blur rounded-xl shadow p-6"
      >
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Content</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={5}
          />
        </div>
        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}