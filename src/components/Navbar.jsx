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
    await axios.post("http://localhost:5000/api/auth/logout");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <NavbarContainer>
      <h2 style={{ color: "white" }}>Shayari App</h2>
      <NavLinks>
        {user ? (
          <>
            <Link to="/">Create Shayari</Link>
            <Link to="/">Profile</Link>

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
