import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  text-align: center;
`;

const ShayariText = styled.p`
  font-size: 18px;
  font-style: italic;
  color: #444;
  margin-bottom: 10px;
`;

const Author = styled.p`
  font-size: 14px;
  color: #888;
`;

const ShayariCard = ({ shayari }) => {
  return (
    <Card>
      <ShayariText>"this is shayari"</ShayariText>
      <Author>- Abc</Author>
    </Card>
  );
};

export default ShayariCard;
