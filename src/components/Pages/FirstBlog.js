import React from "react";
import { Typography, Button, Container } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

function FirstBlog() {
  const navigate = useNavigate();
  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h1">✍️</Typography>
      <Typography variant="h5">
        Be the first to embark on the blogging journey! Your words have the
        power to inspire and enlighten.
      </Typography>
      <button
        style={{
          marginTop: "20px",
          border: "1px solid #1976D2",
          borderRadius: "30px",
          background: "white",
          padding: "10px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/blogs/add")}
        variant="outlined"
        color="primary"
      >
        Create Blog
      </button>
    </Container>
  );
}

export default FirstBlog;
