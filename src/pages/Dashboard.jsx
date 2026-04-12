import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import Itemcard from "../components/Itemcard";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

function Dashboard({ user }) {
  const navigate = useNavigate();

  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  // 🔥 FETCH DATA
  useEffect(() => {
    if (!user) return;

    const fetchLostItems = async () => {
      const snapshot = await getDocs(collection(db, "lostItems"));

      const items = snapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(item => item.userId === user.uid);

      setLostItems(items);
    };

    const fetchFoundItems = async () => {
      const snapshot = await getDocs(collection(db, "foundItems"));

      const items = snapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(item => item.userId === user.uid);

      setFoundItems(items);
    };

    fetchLostItems();
    fetchFoundItems();
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col">

      {/* NAVBAR */}
      <Navbar user={user} />

      {/* MAIN CONTENT */}
      <main className="flex-grow">

        {/* HEADER */}
        <section className="px-10 py-10 bg-gradient-to-r from-pink-100 to-blue-100 flex justify-between items-center">

          <div>
            <h1 className="text-3xl font-bold">
              👋 Hello {user?.email?.split("@")[0] || ""}
            </h1>

            <p className="text-gray-600 mt-2">
              {user
                ? "Manage your lost and found items"
                : "Please login to view your dashboard"}
            </p>
          </div>

          <div>
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg"
              >
                Login
              </button>
            )}
          </div>

        </section>

        {/* CONTENT */}
        {!user ? (
          <section className="px-10 py-16 text-center">
            <p className="text-gray-500 mb-4">
              You are not logged in.
            </p>

            <button
              onClick={() => navigate("/signup")}
              className="bg-[var(--secondary)] text-white px-6 py-2 rounded-lg"
            >
              Create Account
            </button>
          </section>
        ) : (
          <>
            {/* STATS */}
            <section className="px-10 py-6 grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <h3 className="text-gray-500">Lost Items</h3>
                <p className="text-3xl font-bold mt-2">
                  {lostItems.length}
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md">
                <h3 className="text-gray-500">Found Items</h3>
                <p className="text-3xl font-bold mt-2">
                  {foundItems.length}
                </p>
              </div>
            </section>

            {/* LOST ITEMS */}
            <section className="px-10 py-6">
              <h2 className="text-xl font-bold mb-4">My Lost Items</h2>

              {lostItems.length === 0 ? (
                <p className="text-gray-500">No lost items yet.</p>
              ) : (
                <div className="grid md:grid-cols-3 gap-6">
                  {lostItems.map((item) => (
                  <Itemcard key={item.id} item={item} type="lost" />
                ))}
                </div>
              )}
            </section>

            {/* FOUND ITEMS */}
            <section className="px-10 py-6">
              <h2 className="text-xl font-bold mb-4">My Found Items</h2>

              {foundItems.length === 0 ? (
                <p className="text-gray-500">No found items yet.</p>
              ) : (
                <div className="grid md:grid-cols-3 gap-6">
                  {foundItems.map((item) => (
                  <Itemcard key={item.id} item={item} type="found" />
                ))}
                </div>
              )}
            </section>
          </>
        )}

      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}

export default Dashboard;