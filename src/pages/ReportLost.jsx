import { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Confirmation from "./Confirmation";

function ReportLost({user}) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [dateLost, setDateLost] = useState("");
  const [image, setImage] = useState(null);
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!auth.currentUser) {
    alert("Please login first");
    return;
  }

  try {
    setLoading(true);

    let imageUrl = null;

    // 🔥 UPLOAD IMAGE
    if (image) {
      const imageRef = ref(
        storage,
        `lostItems/${Date.now()}-${image.name}`
      );

      await uploadBytes(imageRef, image);

      imageUrl = await getDownloadURL(imageRef);
    }

    // 🔥 SAVE TO FIRESTORE
    await addDoc(collection(db, "lostItems"), {
      name,
      description,
      location,
      dateLost,
      contact,
      image: imageUrl, // ✅ REAL URL
      userId: auth.currentUser.uid,
      createdAt: new Date(),
    });


    setName("");
    setDescription("");
    setLocation("");
    setDateLost("");
    setImage(null);
    setContact("");

    navigate("/confirmation");

  } catch (error) {
    console.error("FULL ERROR:", error);
alert(error.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div>
      <Navbar user={user} />

      {/* HEADER */}
      <section className="px-10 py-10 text-center">
        <h1 className="text-3xl font-bold">Report Lost Item</h1>
        <p className="text-gray-600 mt-2">
          Fill in the details of your lost item.
        </p>
      </section>

      {/* FORM */}
      <section className="flex justify-center px-5 py-4">
        <form onSubmit={handleSubmit} className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-md space-y-5">

          {/* NAME */}
          <div>
            <label className="block mb-1 font-medium">Item Name</label>
            <input
              type="text"
              placeholder="Eg. iPhone 13"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              placeholder="Describe the item"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />
          </div>

          {/* LOCATION */}
          <div>
            <label className="block mb-1 font-medium">Last Seen Location</label>
            <input
              type="text"
              placeholder="Eg: Library hall"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />
          </div>

          {/* DATE */}
          <div>
            <label className="block mb-1 font-medium">Date Lost</label>
            <input
              type="date"
              value={dateLost}
              onChange={(e) => setDateLost(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />
          </div>

          {/* IMAGE */}
          <div>
            <label className="block mb-1 font-medium">Upload Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full border p-3 rounded-lg"
            />

            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="mt-3 w-full h-40 object-cover rounded-lg"
              />
            )}
          </div>

          {/* CONTACT */}
          <div>
            <label className="block mb-1 font-medium">Contact Info</label>
            <input
              type="text"
              placeholder="Phone or Email"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />
          </div>

          {/* SUBMIT */}
          <button
            disabled={loading}
            className="w-full bg-[var(--primary)] text-white py-3 rounded-xl"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

        </form>
      </section>

      <Footer />
    </div>
  );
}

export default ReportLost;