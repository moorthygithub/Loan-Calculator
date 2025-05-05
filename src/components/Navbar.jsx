// src/components/Navbar.jsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Switch,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";
import { useLocation } from "react-router-dom";
const Navbar = () => {
  const { mode, toggleTheme } = useThemeContext();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navLinks = [
    { label: "HOMEa", path: "/" },
    { label: "EXCHANGE RATES (LIVE)", path: "/exchange-rates" },
    { label: "ABOUT", path: "/about" },
    { label: "ERROR PAGE", path: "/error" },
  ];

  return (
    <>
      <AppBar position="static" color="primary">
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Loan Calculator
            </Typography>

            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, alignItems: "center" }}>
              {navLinks.map((link) => (
                <Button
                  key={link.path}
                  component={RouterLink}
                  to={link.path}
                  color="inherit"
                >
                  {link.label}
                </Button>
              ))}
              <Switch checked={mode === "dark"} onChange={toggleTheme} />
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
              <Switch checked={mode === "dark"} onChange={toggleTheme} />
              
            </Box>
      
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
  <Box sx={{ width: 250 }} role="presentation">
    <List>
      {navLinks.map((link) => {
        const isActive = location.pathname === link.path;

        return (
          <ListItem
            button
            key={link.path}
            component={RouterLink}
            to={link.path}
            onClick={() => setDrawerOpen(false)}
            selected={isActive} 
            sx={{
              bgcolor: isActive ? "primary.main" : "transparent",
              color: isActive ? "primary.contrastText" : "inherit",
              "&:hover": {
                bgcolor: "primary.light",
                
              },
            }}
          >
            <ListItemText primary={link.label} />
          </ListItem>
        );
      })}
    </List>
  </Box>
</Drawer>
    </>
  );
};

export default Navbar;
