import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  LinearProgress,
} from "@mui/material";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    contactNo: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();
  const handleChange = (e) => {
    if (e.target.name === "password") {
      // if (e.target.type === "password") {
      //   e.target.type = "text";
      // } else {
      //   e.target.type = "password";
      // }
      passwordvalidation(e.target.value);
    }
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const passwordvalidation = (value) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Password criteria
    if (!passwordRegex.test(value)) {
      setPasswordError(
        "Password should have at least 8 characters, Lowe case, Upper case, numeric and Special character"
      );
    } else {
      setPasswordError("");
    }
    // Calculate password strength based on length
    const strength = Math.min(value.length / 8, 1);
    setPasswordStrength(strength);
  };
  const getPasswordStrengthColor = () => {
    if (passwordStrength === 1) {
      return "success";
    } else if (passwordStrength >= 0.5) {
      return "warning";
    } else {
      return "error";
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    navigate("/editUserDetails");
  };
  const resetState = () => {
    setIsSignup(!isSignup);
    setInputs({
      name: "",
      email: "",
      password: "",
      address: "",
      contactNo: "",
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={400}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          padding={3}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{ ":hover": { boxShadow: "10px 10px 20px #ccc" } }}
        >
          <Typography variant="h2" padding={3} textAlign="center">
            {isSignup ? "Create User" : "LogIn User"}
          </Typography>
          {isSignup && (
            <TextField
              onChange={handleChange}
              name="name"
              value={inputs.name}
              margin="normal"
              type={"text"}
              variant="outlined"
              label="Name"
            />
          )}
          {isSignup && (
            <TextField
              onChange={handleChange}
              name="address"
              value={inputs.address}
              margin="normal"
              type={"text"}
              variant="outlined"
              label="Address"
            />
          )}
          {isSignup && (
            <TextField
              onChange={handleChange}
              name="contactNo"
              value={inputs.contactNo}
              margin="normal"
              type={"text"}
              variant="outlined"
              label="ContactNo"
            />
          )}
          <TextField
            onChange={handleChange}
            name="email"
            value={inputs.email}
            margin="normal"
            type={"email"}
            variant="outlined"
            label="Email"
          />
          <div margin="normal" variant="outlined">
            <TextField
              onChange={handleChange}
              name="password"
              value={inputs.password}
              margin="normal"
              type={"password"}
              variant="outlined"
              label="Password"
              InputLabelProps={{
                shrink: true,
              }}
              error={passwordError.length > 0}
              helperText={passwordError}
            />
            {/* <TextField type="checkbox" onClick={handleChange} label="show password" margin="normal" variant="outlined"/> */}
            {/* <input type="checkbox" onclick="myFunction()">Show Password</input> */}
            <LinearProgress
              variant="outlined"
              margin="normal"
              value={passwordStrength * 100}
              color={getPasswordStrengthColor()}
            />
          </div>
          <Button
            endIcon={
              isSignup ? <HowToRegOutlinedIcon /> : <LoginOutlinedIcon />
            }
            type="submit"
            sx={{ marginTop: 3, borderRadius: 3 }}
            variant="contained"
            color="warning"
          >
            {isSignup ? "SignUp" : "LogIn"}
          </Button>
          <Button
            endIcon={
              isSignup ? <LoginOutlinedIcon /> : <HowToRegOutlinedIcon />
            }
            onClick={resetState}
            sx={{ marginTop: 3, borderRadius: 3 }}
          >
            Change To {isSignup ? "LogIn" : "SignUp"}{" "}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default SignUp;