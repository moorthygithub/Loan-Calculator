import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";
const Navbar = () => {
  const { mode, toggleTheme } = useThemeContext();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Exchnage Rates (Live)", path: "/exchange_rates_live" },
    { label: "About", path: "/about" },
    { label: "Error Page", path: "/error" },
  ];

  return (
    <>
      <AppBar position="static" color="primary" sx={{ mb: "10px" }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between", padding: "0px" }}>
            <Box
              sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
            >
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Typography variant="h6">Loan Calculator</Typography>

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 2,
                alignItems: "center",
              }}
            >
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;

                return (
                  <Button
                    key={link.path}
                    component={RouterLink}
                    to={link.path}
                    color="inherit"
                    sx={{
                      bgcolor: isActive
                        ? "rgba(255, 255, 255, 0.2)"
                        : "transparent",
                      textTransform: "uppercase",
                    }}
                  >
                    {link.label}
                  </Button>
                );
              })}
              <Switch checked={mode === "dark"} onChange={toggleTheme} />
            </Box>
            <Box
              sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
            >
              <Switch checked={mode === "dark"} onChange={toggleTheme} />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
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

                    mx: 1.5,
                    borderRadius: 1,
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
