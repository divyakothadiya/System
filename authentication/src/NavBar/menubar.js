import * as React from "react";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function HorizontalList() {
  return (
    <Box component="nav" aria-label="My site" sx={{ flexGrow: 1 }}>
      <List role="menubar" orientation="horizontal">
        <ListItem role="none">
          <ListItemButton
            role="menuitem"
            component="a"
            href="#horizontal-list"
            sx={{ color: "white" }}
          >
            Dashbaord
          </ListItemButton>
        </ListItem>
        <ListDivider sx={{ backgroundColor: "white" }} />
        <ListItem role="none">
          <ListItemButton
            role="menuitem"
            component="a"
            href="#horizontal-list"
            sx={{ color: "white" }}
          >
            Profile
          </ListItemButton>
        </ListItem>
        <ListDivider sx={{ backgroundColor: "white" }} />
        <ListItem role="none">
          <ListItemButton
            role="menuitem"
            component="a"
            href="#horizontal-list"
            sx={{ color: "white" }}
          >
            Contact US
          </ListItemButton>
        </ListItem>
        <ListItem role="none" sx={{ marginInlineStart: "auto" }}>
          <ListItemButton
            role="menuitem"
            component="a"
            href="#horizontal-list"
            aria-label="Profile"
            sx={{ color: "white" }}
          >
            <AccountCircleIcon />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
