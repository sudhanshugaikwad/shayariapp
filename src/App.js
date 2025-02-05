// import React, { useEffect, useState } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import GlobalStyles from "./styles/GlobalStyles";
// import Navbar from "./components/Navbar";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import Home from "./pages/Home";
// import axios from "axios";

// const App = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         // Fetch user data using cookies and set headers for authentication
//         const { data } = await axios.get("http://localhost:5000/api/auth/me", {
//           withCredentials: true, // Send cookies with the request
//         });
//         setUser(data);
//       } catch (error) {
//         console.log("Not authenticated");
//       }
//     };
//     fetchUser();
//   }, []);

//   return (
//     <Router>
//       <GlobalStyles />
//       <Navbar user={user} setUser={setUser} />
//       <Routes>
//         <Route
//           path="/"
//           element={user ? <Home user={user} /> : <Navigate to="/login" />}
//         />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login setUser={setUser} />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import axios from "axios";

const App = () => {
  const [user, setUser] = useState(null);

  // You can remove the logic to check if the user is authenticated, as it's not required in this case.
  // The user state will not be automatically set unless login or registration is successful.

  return (
    <Router>
      <GlobalStyles />
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route
          path="/"
          element={user ? <Home user={user} /> : <Navigate to="/login" />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
      </Routes>
    </Router>
  );
};

export default App;
