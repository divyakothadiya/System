import React from "react";
import {
  Avatar,
  Grid,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { Country, State } from "country-state-city";

export function ReadOnlyDetails({ details }) {
  const { inputs } = details;
  const countryName = Country.getCountryByCode(inputs.country);
  const stateName = State.getStateByCodeAndCountry(
    inputs.state,
    inputs.country
  );
  return (
    <div>
      <form disabled={true}>
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={1000}
          alignItems="right"
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          padding={3}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{ ":hover": { boxShadow: "10px 10px 20px #ccc" } }}
        >
          <Typography variant="h6" padding={3} textAlign="center">
            User Profile
          </Typography>
          <Grid item container justifyContent="center" alignItems="center">
            <Avatar
              alt="User Avatar"
              src={inputs.profilePic}
              style={{ width: 200, height: 200 }}
            />
          </Grid>
          <TextField
            fullWidth
            name="name"
            value={inputs.name}
            margin="normal"
            type={"text"}
            variant="outlined"
            label="Name"
          />
          <TextField
            fullWidth
            name="address"
            value={inputs.address}
            margin="normal"
            type={"text"}
            variant="outlined"
            label="Address"
          />
          <TextField
            fullWidth
            name="contactNo"
            value={inputs.contactNo}
            margin="normal"
            type={"text"}
            variant="outlined"
            label="ContactNo"
          />
          <TextField
            fullWidth
            name="email"
            value={inputs.email}
            margin="normal"
            type={"email"}
            variant="outlined"
            label="Email"
          />
          <TextField
            fullWidth
            label="Country"
            value={countryName.name}
            variant="outlined"
            margin="normal"
            name="country"
          ></TextField>
          <TextField
            fullWidth
            name="state"
            label="State"
            margin="normal"
            value={stateName.name}
            variant="outlined"
          ></TextField>
          <TextField
            fullWidth
            name="city"
            label="City"
            value={inputs.city}
            variant="outlined"
            margin="normal"
          ></TextField>
          <TextField
            fullWidth
            name="pinCode"
            value={inputs.pinCode}
            margin="normal"
            variant="outlined"
            label="Pin Code"
          />
          <TextField
            fullWidth
            label="Date of Birth"
            type="date"
            name="dob"
            value={inputs.dob ? inputs.dob.toISOString().split("T")[0] : ""}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Button
            type="button"
            sx={{ marginTop: 3, borderRadius: 3 }}
            variant="contained"
            color="warning"
          >
            Edit
          </Button>
        </Box>
      </form>
    </div>
  );
}
