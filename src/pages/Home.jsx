import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

function Home({user}) {
  return (
    <div>
      <Navbar user={user} />
      <Hero />
      <Footer />
    </div>
  );
}

export default Home;