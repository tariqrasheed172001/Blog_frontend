import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import BlogPopup from "./BlogPopup";
import FirstBlog from "./Pages/FirstBlog";
import useNotification from "./Snackbar";

function Blogs() {
  const [blogs, setBlogs] = useState();
  const [popup, setPopup] = useState(false);
  const [conf,setConf] = useNotification();
  const [blogInfo, setBlogInfo] = useState({
    title: "",
    content: "",
    image: "",
    username: "",
    blog_id: "",
  });
  const sendRequest = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/blog`;
    const res = await axios
      .get(url)
      .catch((err) => setConf({msg:'Internal server error, Try again later!',variant: "error"}));
    const data = await res.data;
    return data;
  };



  useEffect(() => {
    setBlogs(null);
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);

  return (
    <div>
      {blogs ?
        blogs.map((blog, index) => (
          
          <Blog
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.user._id}
            title={blog.title}
            content={blog.content}
            image={blog.image}
            userName={blog.user.name}
            setPopup={setPopup}
            setBlogInfo={setBlogInfo}
          />
        )) : (<FirstBlog />)}
      {popup && <BlogPopup blogInfo={blogInfo} setPopup={setPopup} />}
    </div>
  );
}

export default Blogs;
