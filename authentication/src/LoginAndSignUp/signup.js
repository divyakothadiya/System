import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  LinearProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const LogInAndSignUp = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    contactNo: "",
    showPassword: false,
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();
  const handleChange = (e) => {
    if (e.target.name === "password") {
      const strength = calculatePasswordStrength(e.target.value);
      setPasswordStrength(strength);
      validatePassword(e.target.value);
    }
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };
  const validatePassword = (password) => {
    if (password.length === 0) {
      setErrors({});
    } else if (password.length < 8) {
      setErrors({ password: "Password should be at least 8 characters" });
    } else if (passwordStrength < 4) {
      setErrors({
        password:
          "Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      });
    } else if (password.length > 0 && passwordStrength === 4) {
      setErrors({});
    } else {
      setErrors({});
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^A-Za-z0-9]/)) strength++;
    return strength;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any of the required fields are empty
    const requiredFields = isSignup
      ? ["name", "email", "password", "address", "contactNo"]
      : ["email", "password"];

    const emptyFieldErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        emptyFieldErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      }
    });

    if (Object.keys(emptyFieldErrors).length > 0) {
      setErrors(emptyFieldErrors);
      return;
    }

    const strength = calculatePasswordStrength(formData.password);
    if (formData.password.length < 8) {
      setErrors({ password: "Password should be at least 8 characters" });
    } else if (strength < 4) {
      setErrors({
        password:
          "Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      });
    } else {
      console.log("Form submitted:", formData);
      resetState();
      setErrors({});
      navigate("/editUserDetails");
    }
  };
  const resetState = () => {
    setIsSignup(!isSignup);
    setFormData({
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
              fullWidth
              onChange={handleChange}
              name="name"
              value={formData.name}
              margin="normal"
              type={"text"}
              variant="outlined"
              label="Name"
              error={!!errors.name}
              helperText={errors.name}
            />
          )}
          {isSignup && (
            <TextField
              fullWidth
              onChange={handleChange}
              name="address"
              value={formData.address}
              margin="normal"
              type={"text"}
              variant="outlined"
              label="Address"
              error={!!errors.address}
              helperText={errors.address}
            />
          )}
          {isSignup && (
            <TextField
              fullWidth
              onChange={handleChange}
              name="contactNo"
              value={formData.contactNo}
              margin="normal"
              type={"text"}
              variant="outlined"
              label="ContactNo"
              error={!!errors.contactNo}
              helperText={errors.contactNo}
            />
          )}
          <TextField
            fullWidth
            onChange={handleChange}
            name="email"
            value={formData.email}
            margin="normal"
            type={"email"}
            variant="outlined"
            label="Email"
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type={formData.showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    {formData.showPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {formData.password && (
            <Box>
              <Typography variant="caption">Password Strength</Typography>
              <LinearProgress
                variant="determinate"
                value={(passwordStrength / 4) * 100}
              />
            </Box>
          )}
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

export default LogInAndSignUp;
