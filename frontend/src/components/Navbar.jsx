import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  const links = [
    { to: "/", text: "Posts" },
    { to: "/add", text: "Add Post" },
  ];

  return (
    <nav className="relative z-10">
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t"></div>
      <div className="backdrop-blur-xl bg-white/30 shadow-md rounded-b-xl mx-auto max-w-4xl px-4 py-3 mt-2 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 bg-clip-text text-transparent drop-shadow"
        >
          📝 Blog App
        </Link>

        <div className="flex gap-5 items-center">
          {links.map(({ to, text }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`relative px-4 py-2 font-semibold transition rounded-lg group ${
                  active
                    ? "text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow"
                    : "text-blue-800 hover:bg-blue-100 hover:text-blue-700"
                }`}
              >
                <span
                  className={`transition ${
                    active
                      ? ""
                      : "group-hover:underline group-hover:underline-offset-4"
                  }`}
                >
                  {text}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
