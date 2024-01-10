import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  LinearProgress,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    const strength = calculatePasswordStrength(value);
    setPasswordStrength(strength);
    validatePassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
      setFormData({ email: "", password: "" });
      setErrors({});
      navigate("/signup");
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

  return (
    <Container maxWidth="sm">
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
        <Typography variant="h4">Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type={formData.showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
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
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Button
              endIcon={<LoginOutlinedIcon />}
              type="submit"
              sx={{ marginTop: 3, borderRadius: 3 }}
              variant="contained"
              color="warning"
            >
              LogIn
            </Button>
            <Button
              onClick={() => {
                navigate("/signup");
              }}
              endIcon={<HowToRegOutlinedIcon />}
              sx={{ marginTop: 3, borderRadius: 3 }}
            >
              Change To SignUp
            </Button>
          </div>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
