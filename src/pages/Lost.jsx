import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Itemcard from "../components/Itemcard";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function Lost({ user }) {
  const [search, setSearch] = useState("");
  const [lostItems, setLostItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH LOST ITEMS FROM FIRESTORE
  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const snapshot = await getDocs(collection(db, "lostItems"));

        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setLostItems(items);
      } catch (error) {
        console.error("Error fetching lost items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLostItems();
  }, []);


  const filteredItems = lostItems.filter((item) =>
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
            Lost Items
          </h1>
          <p className="text-gray-600 mt-2">
            Browse items reported as lost.
          </p>
        </section>

        {/* SEARCH (UI only for now) */}
        <div className="px-10 mb-6 text-center">
          <input
            type="text"
            placeholder="Search lost items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
        <Itemcard key={item.id} item={item} type="lost" />
      ))}
    </div>
  )}

</section>

      </main>

      <Footer />
    </div>
  );
}

export default Lost;