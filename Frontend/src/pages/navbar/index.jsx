import React, { useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { Box, Typography, useTheme } from "@mui/material";
import Flex from "../../components/Flex";
import styled from 'styled-components';
import { Route, Routes } from "react-router-dom"
import Login from '../Login';
import Signup from '../Signup';

const NavbarContainer = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px; /* Adjust the height as needed */
  z-index: 999; /* Ensure it's on top of other content */
`;

const Navbar = () => {
  const { palette } = useTheme();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogin = () => {
    // Perform login logic here
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Perform logout logic here
    setIsLoggedIn(false);
  };

  console.log('FBisLoggedIn ->', isLoggedIn)

  return (
    <NavbarContainer>
      <Flex p="0.5rem 1rem" color={palette.grey[300]} alignItems="center">
        {location.pathname === '/dashboard' && (
          <AcUnitIcon />
        )}
        <Typography variant="h4" fontSize={location.pathname !== '/dashboard' ? "72px" : "18px"}
        style={{ textTransform: location.pathname !== '/dashboard' ? 'uppercase' : 'none' }}>
          Dashboard
        </Typography>

        <Flex ml="auto" gap="2rem">
          {(!isLoggedIn && location.pathname !== '/login' && location.pathname !== '/register') && (
            <Box
              sx={{ "&:hover": { color: palette.primary[100] } }}
              style={{ color: palette.grey[700], textDecoration: "inherit" }}
            >
              <Link to="/login" style={{ color: "inherit" }}>Login</Link>
            </Box>
          )}

          {isLoggedIn && (
            <Box
              sx={{ "&:hover": { color: palette.primary[100] } }}
              style={{
                color: (location.pathname === '/login' || location.pathname === '/register') ? 'transparent' : palette.grey[700],
                textDecoration: "inherit"
              }}
            >
              <Link to="/login" style={{ color: "inherit" }} onClick={handleLogout}>Logout</Link>
            </Box>
          )}

          {isLoggedIn && location.pathname === '/register' && (
            <Box
              sx={{ "&:hover": { color: palette.primary[100] } }}
              style={{
                color: (location.pathname === '/login' || location.pathname === '/register') ? 'transparent' : palette.grey[700],
                textDecoration: "inherit"
              }}
            >
              <Link to="/register" style={{ color: "inherit" }}>Register</Link>
            </Box>
          )}
        </Flex>
        <Routes>
          <Route path="/dashboard" element={<Navigate to="/dashboard" />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </Flex>
    </NavbarContainer>
  );
};

export default Navbar;