import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { Country, State, City } from "country-state-city";
import { postcodeValidator } from "postcode-validator";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import ErrorIcon from "@mui/icons-material/Error";

export function UserDetailsForm({ onSubmit }) {
  const [fileError, setFileError] = useState("");
  const [base64String, setBase64String] = useState("");
  const [isValidPincode, setIsValidPincode] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    address: "",
    contactNo: "",
    country: "",
    state: "",
    city: "",
    pinCode: "",
    dob: "",
    profilePic: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    address: "",
    contactNo: "",
    country: "",
    state: "",
    city: "",
    pinCode: "",
    dob: null,
    profilePic: "",
  });
  // Fetch all countries on component mount
  useEffect(() => {
    const countries = Country.getAllCountries().map((country) => ({
      value: country.isoCode,
      label: country.name,
    }));
    setCountryList(countries);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "profilePic") {
      validateField(name, e.target.files[0]);
    }
    if (name === "dob") {
      validateField(name, e.target.valueAsDate);
    } else {
      validateField(name, value);
      setInputs({ ...inputs, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if any of the required fields are empty
    const requiredFields = [
      "name",
      "email",
      "address",
      "contactNo",
      "country",
      "state",
      "city",
      "pinCode",
      "dob",
      "profilePic",
    ];

    const emptyFieldErrors = {};
    // requiredFields.forEach((field) => {
    //   if (!inputs[field].trim()) {
    //     emptyFieldErrors[field] = `${
    //       field.charAt(0).toUpperCase() + field.slice(1)
    //     } is required`;
    //   }
    // });

    if (Object.keys(emptyFieldErrors).length > 0) {
      setErrors(emptyFieldErrors);
      return;
    } else {
      console.log(inputs);
      onSubmit({ inputs });
    }
  };

  const validateField = (fieldName, value) => {
    let errorMessage = "";
    switch (fieldName) {
      case "name":
        errorMessage = value.trim() === "" ? "Name is required" : "";
        break;
      case "contactNo":
        const phoneRegex = /^\d{10}$/; // Regex for 10-digit phone number
        errorMessage = phoneRegex.test(value)
          ? ""
          : "Please enter a valid 10-digit phone number";
        break;
      case "address":
        errorMessage = value.trim() === "" ? "Address is required" : "";
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        errorMessage = emailRegex.test(value)
          ? ""
          : "Please enter a valid email";
        break;
      case "dob":
        errorMessage = value
          ? setInputs({ ...inputs, [fieldName]: value })
          : "Date of Birth is required";
        break;
      case "country":
        setSelectedCountry(value);
        const states = State.getStatesOfCountry(value).map((state) => ({
          value: state.isoCode,
          label: state.name,
        }));
        setStateList(states);
        // Reset state and city selections
        setSelectedState("");
        setSelectedCity("");
        errorMessage = value.trim() === "" ? "Please select country" : "";
        break;
      case "state":
        setSelectedState(value);
        const cities = City.getCitiesOfState(selectedCountry, value).map(
          (city) => ({
            value: city.name,
            label: city.name,
          })
        );
        setCityList(cities);
        // Reset city selection
        setSelectedCity("");
        errorMessage = value.trim() === "" ? "Please select state" : "";
        break;
      case "city":
        errorMessage = value.trim() === "" ? "Please select city" : "";
        setSelectedCity(value);
        break;
      case "profilePic":
        if (
          value.type === "image/png" ||
          value.type === "image/jpeg" ||
          value.type === "image/jpg"
        ) {
          const selectedFile = value;
          if (selectedFile && selectedFile.size > 1024 * 1024) {
            setFileError("File size exceeds 1 MB"); // Set error message
          } else {
            const reader = new FileReader();
            reader.onload = (e) => {
              setBase64String(e.target.result);
              setInputs({
                ...inputs,
                profilePic: URL.createObjectURL(selectedFile),
              });
              setFileError("");
            };
            reader.readAsDataURL(selectedFile);
          }
        } else {
          // Display error message for unsupported file type
          errorMessage =
            value.trim() === ""
              ? "Unsupported file type. Please select a PNG, JPG, or JPEG file. Resize your image to 1MB"
              : "";
        }
        break;
      case "pinCode":
        // Validate pincode based on the selected country
        if (selectedCountry) {
          const pinCodeValidator = postcodeValidator(value, selectedCountry);
          setIsValidPincode(pinCodeValidator);
        }
        errorMessage = isValidPincode ? "" : "Please enter valid pin code";
        break;
      default:
        break;
    }
    setErrors({ ...errors, [fieldName]: errorMessage });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        display="flex"
        flexDirection={"column"}
        maxWidth={1000}
        alignItems="center"
        justifyContent={"center"}
        margin="auto"
        marginTop={5}
        padding={3}
        borderRadius={5}
        boxShadow={"5px 5px 10px #ccc"}
        sx={{ ":hover": { boxShadow: "10px 10px 20px #ccc" } }}
      >
        <Typography variant="h4" padding={3} textAlign="center">
          User Details
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            accept="image/png, image/jpeg, image/jpg"
            id="contained-button-file"
            multiple={false}
            type="file"
            style={{ display: "none" }}
            onChange={handleChange}
            name="profilePic"
          />
          <label htmlFor="contained-button-file">
            <Avatar
              alt="Uploaded Image"
              src={base64String}
              style={{
                width: 150,
                height: 150,
                border: fileError ? "2px solid red" : "none", // Apply border for error indication
              }}
            >
              {fileError ? <ErrorIcon /> : <PhotoCamera />}{" "}
            </Avatar>
          </label>
          {fileError && <p style={{ color: "red" }}> {fileError} </p>}{" "}
          {/* Display error message */}
        </div>
        <TextField
          fullWidth
          onChange={handleChange}
          name="name"
          value={inputs.name}
          margin="normal"
          type={"text"}
          variant="outlined"
          label="Name"
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          fullWidth
          onChange={handleChange}
          name="address"
          value={inputs.address}
          margin="normal"
          type={"text"}
          variant="outlined"
          label="Address"
          error={!!errors.address}
          helperText={errors.address}
        />
        <TextField
          fullWidth
          onChange={handleChange}
          name="contactNo"
          value={inputs.contactNo}
          margin="normal"
          type={"text"}
          variant="outlined"
          label="ContactNo"
          error={!!errors.contactNo}
          helperText={errors.contactNo}
        />
        <TextField
          fullWidth
          onChange={handleChange}
          name="email"
          value={inputs.email}
          margin="normal"
          type={"email"}
          variant="outlined"
          label="Email"
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          fullWidth
          select
          label="Country"
          value={selectedCountry}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          name="country"
          error={!!errors.country}
          helperText={errors.country}
        >
          {countryList.map((country) => (
            <MenuItem key={country.value} value={country.value}>
              {country.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          select
          name="state"
          label="State"
          margin="normal"
          value={selectedState}
          onChange={handleChange}
          variant="outlined"
          error={!!errors.state}
          helperText={errors.state}
          disabled={!selectedCountry}
        >
          {stateList.map((state) => (
            <MenuItem key={state.value} value={state.value}>
              {state.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          select
          name="city"
          label="City"
          value={selectedCity}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          error={!!errors.city}
          helperText={errors.city}
          disabled={!selectedState}
        >
          {cityList.map((city) => (
            <MenuItem key={city.value} value={city.value}>
              {city.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          onChange={handleChange}
          name="pinCode"
          value={inputs.pinCode}
          margin="normal"
          variant="outlined"
          label="Pin Code"
          error={!!errors.pinCode}
          helperText={errors.pinCode}
          disabled={!selectedCountry}
        />
        <TextField
          label="Date of Birth"
          type="date"
          name="dob"
          value={inputs.dob ? inputs.dob.toISOString().split("T")[0] : ""}
          onChange={handleChange}
          error={!!errors.dob}
          helperText={errors.dob}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          type="submit"
          sx={{ marginTop: 3, borderRadius: 3 }}
          variant="contained"
          color="warning"
        >
          Save
        </Button>
      </Box>
    </form>
  );
}
