import React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const NotFound = () => {

  const navigate = useNavigate();
  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h1">404</Typography>
      <Typography variant="h5">Page not found</Typography>
      <Button onClick={() => navigate('/')} variant="contained" color="primary" style={{ marginTop: "20px" }}>
        Back to Home
      </Button>
    </Container>
  );
};

export default NotFound;
