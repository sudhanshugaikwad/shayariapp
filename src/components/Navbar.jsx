import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const NavbarContainer = styled.nav`
  background-color: #000000;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.div`
  a {
    color: white;
    text-decoration: none;
    margin-right: 15px;
  }
`;

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout"); // Logout request
      localStorage.removeItem("token"); // Clear the token from localStorage
      setUser(null); // Reset the user state to null
      navigate("/login"); // Navigate to the login page
      window.location.reload(); // Force page reload to reset everything
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <NavbarContainer>
      <h2 style={{ color: "white" }}>Shayari App</h2>
      <NavLinks>
        {user ? (
          <>
            <Link to="/">Create Shayari</Link>
            <Link to="/Profile">Profile</Link>

            <button
              onClick={handleLogout}
              style={{
                color: "white",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
