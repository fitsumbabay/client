import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  CssBaseline,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import CloudIcon from "@mui/icons-material/Cloud";
import ListIcon from "@mui/icons-material/List";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import InfoIcon from "@mui/icons-material/Info";
import ItemManager from "./assets/components/ItemManager";
import Weather from "./assets/components/Weather";
import Login from "./assets/components/Login";
import Contact from "./assets/components/Contact";
import About from "./assets/components/About";
import ProtectedRoute from "./assets/components/ProtectedRoute";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Register from "./assets/components/Register";
import Footer from "./assets/components/Footer";
import "./index.css"; 
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#ff4081",
    },
    background: {
      default: "#f0f4f8",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h4: {
      fontWeight: 600,
    },
  },
});

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Check if the user is logged in when the app loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // User is logged in
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = (
    <div onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/weather">
          <ListItemIcon>
            <CloudIcon />
          </ListItemIcon>
          <ListItemText primary="Weather" />
        </ListItem>
        <ListItem button component={Link} to="/items">
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary="Items" />
        </ListItem>
        {isLoggedIn ? (
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          <ListItem button component={Link} to="/login">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        )}
        <ListItem button component={Link} to="/contact">
          <ListItemIcon>
            <ContactMailIcon />
          </ListItemIcon>
          <ListItemText primary="Contact" />
        </ListItem>
        <ListItem button component={Link} to="/about">
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Weather and Item App
            </Typography>

            {isMobile ? (
              <>
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
                <Drawer
                  anchor="right"
                  open={drawerOpen}
                  onClose={toggleDrawer(false)}
                >
                  {drawerList}
                </Drawer>
              </>
            ) : (
              <div className="desktop-menu">
                <Button component={Link} to="/" color="inherit">
                  Home
                </Button>
                <Button component={Link} to="/weather" color="inherit">
                  Weather
                </Button>
                <Button component={Link} to="/items" color="inherit">
                  Items
                </Button>
                {isLoggedIn ? (
                  <Button onClick={handleLogout} color="inherit">
                    Logout
                  </Button>
                ) : (
                  <Button component={Link} to="/login" color="inherit">
                    Login
                  </Button>
                )}
                <Button component={Link} to="/register" color="inherit">
                  Register
                </Button>
                <Button component={Link} to="/contact" color="inherit">
                  Contact
                </Button>
                <Button component={Link} to="/about" color="inherit">
                  About
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <Container
          maxWidth="md"
          sx={{
            marginTop: 4,
            padding: 4,
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <Typography variant="h4" align="center">
                  Welcome to the Weather and Item App
                </Typography>
              }
            />
            <Route path="/weather" element={<Weather />} />
            <Route
              path="/items"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <ItemManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            {/* Redirect all other paths to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
