import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 50px auto;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const ShayariCard = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Content = styled.p`
  font-size: 18px;
  color: #333;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const Button = styled.button`
  padding: 8px 12px;
  border: none;
  background: #333;
  color: white;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #555;
  }
`;

const Home = () => {
  const [shayaris, setShayaris] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShayaris = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:5000/api/shayari", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setShayaris(data);
      } catch (error) {
        console.log("Error fetching Shayari data");
      }
    };

    fetchShayaris();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-shayari/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/shayari/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShayaris(shayaris.filter((shayari) => shayari._id !== id)); // Remove deleted shayari from the state
    } catch (error) {
      console.log("Error deleting Shayari");
    }
  };

  return (
    <Container>
      {shayaris.length > 0 ? (
        shayaris.map((shayari) => (
          <ShayariCard key={shayari._id}>
            <Content>{shayari.content}</Content>
            <ButtonGroup>
              <Button onClick={() => handleEdit(shayari._id)}>Edit</Button>
              <Button onClick={() => handleDelete(shayari._id)}>Delete</Button>
            </ButtonGroup>
          </ShayariCard>
        ))
      ) : (
        <div>No Shayari found.</div>
      )}
    </Container>
  );
};

export default Home;
