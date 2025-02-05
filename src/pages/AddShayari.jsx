import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  background: #333;
  color: white;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
  font-size: 16px;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
`;

const AddShayari = () => {
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams(); // For editing existing shayari

  const navigate = useNavigate();

  useEffect(() => {
    // If editing, fetch the existing Shayari and User Profile Info
    if (id) {
      setIsEditing(true);
      const fetchShayari = async () => {
        try {
          const token = localStorage.getItem("token");
          const { data } = await axios.get(
            `http://localhost:5000/api/shayari/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setContent(data.content);
        } catch (error) {
          console.log("Error fetching Shayari for edit.");
        }
      };
      fetchShayari();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const payload = { content, name, profileImage };

      if (isEditing) {
        // If editing, update the Shayari
        await axios.put(`http://localhost:5000/api/shayari/${id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Create new Shayari
        await axios.post("http://localhost:5000/api/shayari", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate("/");
    } catch (error) {
      console.log("Error saving Shayari");
    }
  };

  return (
    <Container>
      <Title>{isEditing ? "Edit Your Shayari" : "Add Your Shayari"}</Title>

      {/* Profile Image */}
      <ProfileImage
        src={profileImage || "https://via.placeholder.com/120"}
        alt="Profile"
      />
      <Input
        type="text"
        placeholder="Update Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Profile Image URL"
        value={profileImage}
        onChange={(e) => setProfileImage(e.target.value)}
        required
      />

      {/* Shayari Text Area */}
      <TextArea
        placeholder="Write your Shayari..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      {/* Submit Button */}
      <Button type="submit" onClick={handleSubmit}>
        {isEditing ? "Update Shayari" : "Submit Shayari"}
      </Button>
    </Container>
  );
};

export default AddShayari;
