import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Confirmation({ user }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">

      <Navbar user={user} />

      <main className="flex-grow flex items-center justify-center">

        <div className="bg-white p-10 rounded-2xl shadow-md text-center">

          {/* CHECK ICON */}
          <div className="text-green-500 text-6xl mb-4">
            ✔
          </div>

          <h1 className="text-2xl font-bold mb-2">
            Item Reported Successfully
          </h1>

          <p className="text-gray-600 mb-6">
            Your item has been submitted. We hope it gets recovered soon!
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-[var(--primary)] text-white px-6 py-2 rounded-lg"
          >
            Go to Dashboard
          </button>

        </div>

      </main>

    </div>
  );
}

export default Confirmation;