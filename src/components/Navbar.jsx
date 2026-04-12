import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-pink-100 to-blue-100 border-b">

      {/* LOGO */}
      <h1
        onClick={() => navigate("/")}
        className="font-bold text-lg text-[var(--primary)] cursor-pointer"
      >
        OULU Find
      </h1>

      {/* LINKS */}
      <div className="space-x-6 hidden md:flex items-center">

        <Link to="/" className="hover:text-[var(--primary)]">Home</Link>
        <Link to="/lost" className="hover:text-[var(--primary)]">Lost</Link>
        <Link to="/report-lost" className="hover:text-[var(--primary)]">Report Lost</Link>
        <Link to="/found" className="hover:text-[var(--primary)]">Found</Link>
        <Link to="/report-found" className="hover:text-[var(--primary)]">Report Found</Link>

        {/* AUTH SECTION */}
        {user ? (
  <>
    <button
      onClick={() => navigate("/dashboard")}
      className="hover:text-[var(--primary)]"
    >
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
    <button
      onClick={() => navigate("/login")}
      className="text-[var(--primary)]"
    >
      Login
    </button>

    <button
      onClick={() => navigate("/signup")}
      className="border border-[var(--primary)] text-[var(--primary)] px-4 py-2 rounded-lg hover:bg-[var(--primary)] hover:text-white transition"
    >
      Sign Up
    </button>
  </>
)}
      </div>
    </nav>
  );
}

export default Navbar;