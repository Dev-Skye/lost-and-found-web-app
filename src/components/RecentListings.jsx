import ItemCard from "../components/Itemcard";

const items = [
  {
    name: "iPhone 13",
    location: "Library",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Backpack",
    location: "Bus Stop",
    image: "https://via.placeholder.com/150",
  },
];

function RecentListings() {
  return (
    <section className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Recent Listings</h2>
        <button className="text-blue-500">View All</button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <ItemCard key={index} item={item} />
        ))}
      </div>
    </section>
  );
}

export default RecentListings;