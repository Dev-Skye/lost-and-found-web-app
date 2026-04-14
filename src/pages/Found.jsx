import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Itemcard from "../components/Itemcard";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function Found({ user }) {
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);
   const [search, setSearch] = useState("");

  // 🔥 FETCH FOUND ITEMS FROM FIRESTORE
  useEffect(() => {
    const fetchFoundItems = async () => {
      try {
        const snapshot = await getDocs(collection(db, "foundItems"));

        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFoundItems(items);
      } catch (error) {
        console.error("Error fetching found items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoundItems();
  }, []);

  const filteredItems = foundItems.filter((item) =>
  item.name?.toLowerCase().includes(search.toLowerCase()) ||
  item.location?.toLowerCase().includes(search.toLowerCase())
);


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />

      <main className="flex-grow">

        {/* HEADER */}
        <section className="px-10 py-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">
            Found Items
          </h1>
          <p className="text-gray-600 mt-2">
            Browse items reported as found.
          </p>
        </section>

        {/* SEARCH (UI only for now) */}
        <div className="px-10 mb-6 text-center">
          <input
            type="text"
             value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search found items..."
            className="w-full md:w-2/3 p-3 border rounded-xl focus:outline-none"
          />
        </div>

        {/* ITEMS */}
        <section className="px-10 pb-10">

          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
              ) : filteredItems.length === 0 ? (
                <p className="text-center text-gray-500">
                  No items match your search.
                </p>
          ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {filteredItems.map((item) => (
        <Itemcard key={item.id} item={item} type="found" />
              ))}
            </div>
          )}

        </section>

      </main>

      <Footer />
    </div>
  );
}

export default Found;