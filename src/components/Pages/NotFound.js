import React from "react";
import { Typography, Button, Container } from "@material-ui/core";
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
