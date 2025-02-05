import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import ShayariCard from "../components/ShayariCard";
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
  const [shayaris, setShayaris] = useState([]);
  const [name, setName] = useState(user?.name || "");
  const [profileImage, setProfileImage] = useState(user?.profileImage || "");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserShayaris = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          "http://localhost:5000/api/shayari/mine",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setShayaris(data);
      } catch (error) {
        console.log("Error fetching shayaris");
      }
    };

    fetchUserShayaris();
  }, []);

  const handleProfileUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        "http://localhost:5000/api/auth/update",
        { name, profileImage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(data);
    } catch (error) {
      console.log("Error updating profile");
    }
  };

  const handleDeleteShayari = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/shayari/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShayaris(shayaris.filter((shayari) => shayari._id !== id));
    } catch (error) {
      console.log("Error deleting Shayari");
    }
  };

  return (
    <ProfileContainer>
      <h2>My Profile</h2>
      <ProfileImage
        src={profileImage || "https://via.placeholder.com/120"}
        alt="Profile"
      />
      <Input
        type="text"
        placeholder="Update Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Profile Image URL"
        value={profileImage}
        onChange={(e) => setProfileImage(e.target.value)}
      />
      <Button onClick={handleProfileUpdate}>Update Profile</Button>

      <h3>My Shayaris</h3>
      {shayaris.map((shayari) => (
        <div key={shayari._id}>
          <ShayariCard shayari={shayari} />
          <Button onClick={() => navigate(`/edit-shayari/${shayari._id}`)}>
            Edit
          </Button>
          <Button
            onClick={() => handleDeleteShayari(shayari._id)}
            style={{ background: "red" }}
          >
            Delete
          </Button>
        </div>
      ))}
    </ProfileContainer>
  );
};

export default Profile;
