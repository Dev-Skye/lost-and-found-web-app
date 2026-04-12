import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md space-y-4">
        <h2 className="text-xl font-bold">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="border p-3 w-full rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 w-full rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-[var(--primary)] text-white w-full py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;