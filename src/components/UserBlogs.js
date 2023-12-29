import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import NoBlogs from "./Pages/NoBlogs";
import useNotification from "./Snackbar";

function UserBlogs() {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");
  const[conf,setConf] = useNotification();
  const sendRequest = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/blog/user/${id}`;
    const res = await axios
      .get(url)
      .catch((err) => {
        console.log(err)
        setConf({msg:'Internal server error, Try again later',variant:'error'})
      });
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);


  return (
    <div>
      {" "}
      {user &&
        user.blogs.length > 0 ?
        user.blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            key={index}
            isUser={true}
            title={blog.title}
            content={blog.content}
            image={blog.image}
            userName={user.name}
          />
        )) : (<NoBlogs />)}
    </div>
  );
}

export default UserBlogs;
