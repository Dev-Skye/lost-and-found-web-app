import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ItemDetail({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const type = params.get("type");

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);

  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editLocation, setEditLocation] = useState("");

  const collectionName = type === "found" ? "foundItems" : "lostItems";
  const isOwner = user && item && user.uid === item.userId;

  // 🔥 FETCH ITEM
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const docRef = doc(db, collectionName, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setItem({ id: docSnap.id, ...docSnap.data() });
        } else {
          setItem(false);
        }
      } catch (error) {
        console.error(error);
        setItem(false);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id, collectionName]);

  // 🔥 DELETE
  const handleDelete = async () => {
    await deleteDoc(doc(db, collectionName, id));
    alert("Item deleted");
    navigate("/dashboard");
  };

  // 🔥 UPDATE
  const handleUpdate = async () => {
    try {
      const itemRef = doc(db, collectionName, id);

      await updateDoc(itemRef, {
        name: editName,
        description: editDescription,
        location: editLocation,
      });

      setItem({
        ...item,
        name: editName,
        description: editDescription,
        location: editLocation,
      });

      setIsEditing(false);

      alert("Item updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Error updating item");
    }
  };

  // 🔄 STATES
  if (loading) return <p className="p-10">Loading...</p>;
  if (!item) return <p className="p-10">Item not found</p>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />

      <main className="flex-grow p-10 max-w-3xl mx-auto">

        {/* IMAGE */}
        <img
          src={item.image || "/images/placeholder.jpg"}
          alt={item.name}
          className="w-full h-64 object-cover rounded-2xl shadow-md"
        />

        {/* TYPE BADGE */}
        <span className={`inline-block mt-4 px-3 py-1 rounded-full text-sm font-medium ${
          type === "found"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}>
          {type === "found" ? "Found Item" : "Lost Item"}
        </span>

        {/* CONTENT */}
        <div className="mt-5">

          {isEditing && isOwner ? (
            <>
              <h1 className="text-2xl font-bold mb-4">Edit Item</h1>

              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full border p-3 rounded-lg mb-3"
              />

              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full border p-3 rounded-lg mb-3"
              />

              <input
                value={editLocation}
                onChange={(e) => setEditLocation(e.target.value)}
                className="w-full border p-3 rounded-lg mb-3"
              />

              <div className="space-x-3">
                <button
                  onClick={handleUpdate}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  Save
                </button>

                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold">{item.name}</h1>

              <p className="mt-3 text-gray-700">{item.description}</p>

              <p className="mt-2 text-gray-500">
                📍 {item.location}
              </p>

              <p className="mt-2 text-gray-500">
                📅 {item.dateLost || item.dateFound || "No date"}
              </p>

              <p className="mt-2 text-gray-500">
                📞 {item.contact || "No contact info"}
              </p>

              {/* ACTIONS (ONLY OWNER) */}
            {isOwner && (
              <div className="mt-6 space-x-3">
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setEditName(item.name);
                    setEditDescription(item.description);
                    setEditLocation(item.location);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            )}
            </>
          )}

        </div>

      </main>

      <Footer />
    </div>
  );
}

export default ItemDetail;