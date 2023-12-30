import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import useNotification from "./Snackbar";

const Auth = () => {
  const navigate = useNavigate();
  
  const [conf, setConf] = useNotification();

  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [isSignup, setIsSignup] = useState(false);

  const handleChange = (event) => {
    setInputs((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };

  const sendRequest = async (type = "signin") => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/user/${type}`;
    const res = await axios
      .post(url, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => {
       setConf({msg: JSON.parse(err?.request?.response)?.message, variant: "error"})
      });
    const data = await res.data;
    return data;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSignup) {
      if (inputs.password.length < 6) {
        setConf({ msg: "Password should be at least 6 characters", variant: "warning" });
        return; // Stop further execution
      }else if(inputs.password !== inputs.confirm_password){
        setConf({msg: "Passwords do not match!",variant: "warning"})
      }else{
        sendRequest("signup")
          .then((data) => localStorage.setItem("userId", data.user._id))
          .then(() => {
            dispatch(authActions.signin());
          })
          .then(() => {
            navigate("/");
          })
          .then((data) => console.log(data));
      }
    } else {
      sendRequest()
        .then((data) => {
          localStorage.setItem("userId", data.user._id)
          localStorage.setItem("userName", data.user?.name);
      })
        .then(() => {
          dispatch(authActions.signin());
        })
        .then(() => {
          navigate("/");
        })
        .then((data) => console.log(data));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={10}
        >
          <Typography variant="h3" padding={3} textAlign="center">
            {isSignup ? "Sign Up" : "Sign In"}
          </Typography>
          {isSignup && (
            <TextField
              name="name"
              onChange={handleChange}
              placeholder="Name"
              value={inputs.name}
              margin="normal"
              required
            />
          )}
          <TextField
            name="email"
            onChange={handleChange}
            type={"email"}
            value={inputs.email}
            placeholder="Email"
            margin="normal"
            required
          />
          <TextField
            name="password"
            onChange={handleChange}
            type={"password"}
            value={inputs.password}
            placeholder="Password"
            margin="normal"
            required
          />
          {isSignup && (
            <TextField
              name="confirm_password"
              onChange={handleChange}
              type={"password"}
              value={inputs.confirm_password}
              placeholder="Confirm Password"
              margin="normal"
              required
            />
          )}
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
          >
            {isSignup ? "Create Account" : "Sign In"}
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 2 }}
            color="warning"
          >
            {isSignup ? "have an Account? Sign In" : "New User? Register Now"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
