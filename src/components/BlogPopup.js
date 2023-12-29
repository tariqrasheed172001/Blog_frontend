import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Avatar,
  CardHeader,
  CardMedia,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import axios from "axios";
import useNotification from "./Snackbar";

function BlogPopup({ setPopup, blogInfo }) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("body");
  const [comments, setComments] = React.useState();
  const [loggedIn, setLoggedIn] = React.useState();
  const [addComment, setAddComment] = React.useState(false);
  const labelStyle = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
  const [comment, setComment] = React.useState({});
  const [conf, setConf] = useNotification();

  const handleChange = (event) => {
    setComment((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };



  const handleClose = () => {
    setOpen(false);
    setPopup(false);
  };

  const sendRequest = async (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/blog/comment`;
    const res = await axios
      .post(url, {
        text: comment.text,
        blog: blogInfo?.blog_id,
        user: localStorage.getItem("userName"),
      })
      .catch((err) => {
        setConf({ msg: "Internal server error", variant: "error" });
      });

    const data = await res.data;
    setAddComment(false);
    getCommments().then((data) => setComments(data?.data?.comments));
    return data;
  };

  const getCommments = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/blog/comments/${blogInfo?.blog_id}`;
    const res = await axios.get(url).catch((err) => {
      setConf({ msg: "Internal server error", variant: "error" });
    });
    return res;
  };

  React.useEffect(() => {
    setLoggedIn(localStorage.getItem("userId"));
    setOpen(true);
    setPopup(true);
    getCommments().then((data) => setComments(data?.data?.comments));
  }, []);
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const formatDateTime = (timestamp) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(timestamp)
    );
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {blogInfo?.username?.charAt(0)}
            </Avatar>
          }
          title={blogInfo?.title}
          subheader=""
        />
        <CardMedia
          component="img"
          height="194"
          image={blogInfo?.image}
          alt="Paella dish"
        />
        {/* <DialogTitle id="scroll-dialog-title">{blogInfo.title}</DialogTitle> */}
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <hr />
            <br />
            <Typography variant="body2" color="text.secondary">
              <b>{blogInfo?.username}</b> {": "}
              {blogInfo.content}
            </Typography>
          </DialogContentText>
          <DialogContentText>
            {comments?.length === 0 ? (
              <DialogTitle>
                No comments have graced this masterpiece yet.
              </DialogTitle>
            ) : (
              <DialogTitle>Comments</DialogTitle>
            )}
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {comments?.length > 0 &&
                comments.map((comment) => (
                  <>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                          {comment?.user?.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={comment?.user}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {comment?.text}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                      <Typography>
                        {formatDateTime(comment?.updatedAt)}
                      </Typography>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </>
                ))}
            </List>
          </DialogContentText>
          {addComment && (
            <form
              onSubmit={sendRequest}
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <InputLabel sx={labelStyle}>Add Comment</InputLabel>
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <TextField
                  name="text"
                  onChange={handleChange}
                  margin="normal"
                  placeholder="Write comment"
                  variant="outlined"
                  required
                  sx={{
                    width: "100%",
                    marginTop: 2,
                  }}
                />
                <DialogActions>
                  <Button type="submit" variant="contained">
                    Comment
                  </Button>
                </DialogActions>
              </div>
            </form>
          )}
        </DialogContent>

        <DialogActions>
          {loggedIn && (
            <Button onClick={() => setAddComment(true)}>Add comment</Button>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default BlogPopup;
