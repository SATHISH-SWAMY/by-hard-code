import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider, CssBaseline, IconButton } from "@mui/material";
import { darkTheme, lightTheme } from "./Theme.js";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ContextProvider from "./context/ContextProvider.jsx";

function Root() {
    // State for managing the theme (light or dark)
  const [theme, setTheme] = useState(lightTheme);  // Default theme is lightTheme


    // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === darkTheme ? lightTheme : darkTheme));
  };

  return (
    // ThemeProvider provides the selected theme to the entire application
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <IconButton
        onClick={toggleTheme}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          backgroundColor: theme.palette.mode === "dark" ? "black" : "yellow",
          color: theme.palette.mode === "dark" ? "white" : "black",
          padding: "8px",
          borderRadius: "50%",
        }}>
        {theme === darkTheme ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
      <ContextProvider>
        <App />
      </ContextProvider>
    </ThemeProvider>
  );
}

// Render the Root component into the DOM
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
