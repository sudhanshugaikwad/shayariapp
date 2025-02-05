import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ProfileContainer = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  text-align: center;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #333;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px;
  background: #333;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10px;
`;

const Profile = ({ user, setUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          "http://localhost:5000/api/auth/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Set fetched user data
        setName(data.name);
        setEmail(data.email);
        setProfileImage(data.profileImage || "https://via.placeholder.com/120");
      } catch (error) {
        console.log("Error fetching user profile");
        setMessage("Error fetching profile information.");
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <ProfileContainer>
      <h2>My Profile</h2>
      <ProfileImage
        src={profileImage || "https://via.placeholder.com/120"}
        alt="Profile"
      />
      <div>
        <h3>Name: {name}</h3>
        <h3>Email: {email}</h3>
      </div>
      {message && <p>{message}</p>}
    </ProfileContainer>
  );
};

export default Profile;
