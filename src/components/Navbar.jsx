import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { Menu } from "lucide-react";


function Navbar({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-pink-100 to-blue-100 border-b px-6 py-4">

      {/* TOP BAR */}
      <div className="flex justify-between items-center">

        {/* LOGO */}
        <h1
          onClick={() => navigate("/")}
          className="font-bold text-lg text-[var(--primary)] cursor-pointer"
        >
          OULU Find
        </h1>

        {/* DESKTOP MENU */}
        <div className="space-x-6 hidden md:flex items-center">

          <Link to="/">Home</Link>
          <Link to="/lost">Lost</Link>
          <Link to="/report-lost">Report Lost</Link>
          <Link to="/found">Found</Link>
          <Link to="/report-found">Report Found</Link>

          {/* AUTH */}
          {user ? (
            <>
              <button onClick={() => navigate("/dashboard")}>
                My Profile
              </button>

              <button
                onClick={handleLogout}
                className="text-red-500 border px-3 py-1 rounded-lg hover:bg-red-500 hover:text-white transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/login")}>
                Login
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="border border-[var(--primary)] px-4 py-2 rounded-lg hover:bg-[var(--primary)] hover:text-white transition"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 mt-4 bg-white p-4 rounded-xl shadow-md border-b">

          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/lost" onClick={() => setIsOpen(false)}>Lost</Link>
          <Link to="/report-lost" onClick={() => setIsOpen(false)}>Report Lost</Link>
          <Link to="/found" onClick={() => setIsOpen(false)}>Found</Link>
          <Link to="/report-found" onClick={() => setIsOpen(false)}>Report Found</Link>

          {/* AUTH */}
          {user ? (
            <>
              <button
                onClick={() => {
                  navigate("/dashboard");
                  setIsOpen(false);
                }}
              >
                My Profile
              </button>

              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="text-red-500 border px-3 py-1 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  navigate("/login");
                  setIsOpen(false);
                }}
              >
                Login
              </button>

              <button
                onClick={() => {
                  navigate("/signup");
                  setIsOpen(false);
                }}
                className="border border-[var(--primary)] px-4 py-2 rounded-lg"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;