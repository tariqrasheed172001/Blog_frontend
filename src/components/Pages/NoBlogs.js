import React from "react";
import { Typography, Button, Container } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

function NoBlogs() {
  const navigate = useNavigate();
  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h1">😕</Typography>
      <Typography variant="h5">
        Oops! It seems like you haven't embarked on the blogging journey yet.
        Hit the button below to chronicle your thoughts and ideas.
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

export default NoBlogs;
