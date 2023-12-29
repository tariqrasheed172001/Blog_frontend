import "./App.css";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";
import { SnackbarProvider } from "notistack";
import Navbar from "./components/Navbar";
import AuthProtection from "./RouteProtection/AuthProtection";
import UserInfoProtection from "./RouteProtection/UserInfoProtection";
import NotFound from "./components/Pages/NotFound";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.signin());
    }
  }, [dispatch]);

  return (
    <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <React.Fragment>
       <Navbar />
        <main>
          <Routes>

              <Route element={<AuthProtection />}>
                <Route path="/auth" element={<Auth />} />
                <Route path="/" element={<Blogs />} />
              </Route>

              <Route element={<UserInfoProtection />}>
                <Route path="/" element={<Blogs />} />
                <Route path="/blogs/add" element={<AddBlog />} />
                <Route path="/myBlogs" element={<UserBlogs />} />
                <Route path="/myBlogs/:id" element={<BlogDetail />} />
              </Route>

              {/* Catch-all route for non-existing paths */}
              <Route path="*" element={<NotFound />} />

          </Routes>
        </main>
      </React.Fragment>
    </SnackbarProvider>
  );
}

export default App;
