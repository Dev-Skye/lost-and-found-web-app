import { useNavigate } from "react-router-dom";

function Itemcard({ item, type }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/item/${item.id}?type=${type}`)}
      className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition cursor-pointer"
    >
      <img
        src={item.image || "/images/placeholder.jpg"}
        className="w-full h-60 object-cover rounded-xl"
      />

      <h3 className="mt-3 font-bold">{item.name}</h3>
      <p className="text-gray-500">{item.location}</p>
    </div>
  );
}

export default Itemcard;