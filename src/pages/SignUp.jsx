import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from "react-router-dom"

function Signup() {

  const navigate = useNavigate()  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded-xl shadow-md space-y-4">
        <h2 className="text-xl font-bold">Sign Up</h2>

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
          Sign Up
        </button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="border border-[var(--primary)] text-[var(--primary-hover)] px-4 py-2 rounded-lg w-full"
        >
          Login if you have an account
        </button>
      </form>

      
    </div>
  );
}

export default Signup;