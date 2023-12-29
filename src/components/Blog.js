import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Avatar,
  CardContent,
  CardHeader,
  Typography,
  CardMedia,
  Box,
  IconButton,
} from "@mui/material";
import {
  DeleteForeverOutlined,
  ModeEditOutlineOutlined,
} from "@mui/icons-material";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import axios from "axios";
import useNotification from "./Snackbar";

const Blog = ({ title, content, image, userName, isUser, id,setPopup,setBlogInfo }) => {
  const navigate = useNavigate();
  const [conf,setConf] = useNotification();

  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };

  const deleteRequest = async () => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/blog/${id}`;
      const res = await axios.delete(url);
      const data = res.data;
      
      return data;
    } catch (err) {
      console.log(err);
      setConf({msg:err?.response?.request?.statusText,variant:'error'});
    }
  };

  const handleDelete = () => {
    deleteRequest().then(() => {
      navigate("/");
      window.location.reload();
      setConf({msg:'Blog deleted.', variant:'success'});
    });
    
  };
  
  

  return (
    <div style={{cursor:'pointer'}}>
      <Card
        sx={{
          width: { xs: "95%", sm: "70%", md: "50%" }, // Responsive width
          margin: "auto",
          marginTop: 2,
          // padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": { boxShadow: "10px 10px 20px #ccc" },
        }}
      >
        {isUser && (
          <Box display={{ xs: "flex", md: "flex" }} justifyContent="flex-end">
            {/* Hide on small screens, show on medium and larger screens */}
            <IconButton onClick={handleEdit}>
              <ModeEditOutlineOutlined color="info" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteForeverOutlined color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {userName && userName.charAt(0)}
            </Avatar>
          }
          title={title}
          subheader=""
        />
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt="Paella dish"
        />
        <CardContent>
          <hr />
          <br />
          <Typography variant="body2" color="text.secondary">
            <b>{userName}</b> {": "}
            {content}
          </Typography>
        </CardContent>
        <Box display={{ xs: "flex", md: "flex" }} justifyContent="flex-end">
            <IconButton onClick = {() => {
      setPopup(true);
      setBlogInfo({
      title: title,
      content: content,
      image: image,
      username: userName,
      blog_id: id,
    });
      }}  >
              <p style={{marginRight:"10px"}}>Comments</p>
              <ChatBubbleOutlineIcon color="info" />
            </IconButton>
          </Box>
      </Card>
    </div>
  );
};

export default Blog;
