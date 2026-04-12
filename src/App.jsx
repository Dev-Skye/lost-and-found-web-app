import Home from "./pages/Home";
import Lost from "./pages/Lost";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import ReportLost from "./pages/ReportLost";
import Found from "./pages/Found";
import ReportFound from "./pages/ReportFound";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Confirmation from "./pages/Confirmation";
import ItemDetail from "./pages/ItemDetail";



function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // cleanup
  }, []);

  // Prevent flashing before auth loads
  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }


  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home user={user} />}/>
          <Route path="/lost" element={<Lost user={user} />}/>
          <Route path="/report-lost" element={<ReportLost user={user}/>} />
          <Route path="/found" element={<Found user={user}/>}/> 
          <Route path="/report-found" element={<ReportFound user={user}/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard user={user} /> }/>
          <Route path="/confirmation" element={<Confirmation user={user} />} />
          <Route path="/item/:id" element={<ItemDetail user={user}/>} />
        </Routes>
      </BrowserRouter>
);
}

export default App;