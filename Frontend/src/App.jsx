import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMemo, useState } from "react";
import { themeSettings } from "./theme";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Navbar from "./pages/navbar";
import Dashboard from "./pages/dashboard";

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
            <Navbar isLoggedIn={isLoggedIn} />
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/register" />
              <Route path="/login" />
              <Route
                path="*"
                element={<Navigate to="/login" replace />}
              />
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;