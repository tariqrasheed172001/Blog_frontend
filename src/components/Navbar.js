import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { Tab, Tabs } from "@mui/material";

//drawer elements used
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FolderIcon from "@mui/icons-material/Folder";
import ImageIcon from "@mui/icons-material/Image";
import DescriptionIcon from "@mui/icons-material/Description";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";

const StyledSearch = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.main, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

//search as JSX
const search = (
  <StyledSearch>
    <SearchIconWrapper>
      <SearchIcon />
    </SearchIconWrapper>
    <StyledInputBase
      placeholder="Suchen…"
      inputProps={{ "aria-label": "search" }}
    />
  </StyledSearch>
);

export default function Navbar() {
  //react useState hook to save the current open/close state of the drawer, normally variables dissapear afte the function was executed
  const [open, setState] = useState(false);

  //function that is being called every time the drawer should open or close, the keys tab and shift are excluded so the user can focus between the elements with the keys
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    //changes the function state according to the value of open
    setState(open);
  };

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState();

  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          "linear-gradient(90deg, rgba(100,5,150,1) 0%, rgba(0,212,255,1) 100%)",
      }}
    >
      <Container maxWidth="lg" disableGutters="true">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h4"
            sx={{ flexGrow: 1, fontWeight: 700 }}
            style={{ textDecoration: "none", color: "white" }}
          >
            Zing Zone
          </Typography>

          {isLoggedIn && (
            <Box
              display="flex"
              marginLeft={"auto"}
              sx={{
                margin: 1,
                borderRadius: 10,
                mr: 2,
                display: {
                  xs: "none",
                  sm: "none",
                  md: "block",
                },
              }}
            >
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(event, val) => setValue(val)}
              >
                <Tab LinkComponent={Link} to="/" label="All Blogs" />
                <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs " />
                <Tab
                  LinkComponent={Link}
                  to="/blogs/add"
                  label="Create Blogs "
                />
              </Tabs>
            </Box>
          )}

          <Box display="flex" marginLeft="auto">
            {!isLoggedIn && (
              <>
                <Button
                  LinkComponent={Link}
                  to="/auth"
                  variant="contained"
                  sx={{
                    margin: 1,
                    borderRadius: 10,
                    mr: 2,
                    display: {
                      xs: "none",
                      sm: "none",
                      md: "block",
                    },
                  }}
                >
                  Sign In
                </Button>
              </>
            )}

            {isLoggedIn && (
              <Button
                onClick={() => dispatch(authActions.logout())}
                LinkComponent={Link}
                to="/"
                variant="contained"
                sx={{
                    margin: 1,
                    borderRadius: 10,
                    mr: 2,
                    display: {
                      xs: "none",
                      sm: "none",
                      md: "block",
                    },
                  }}
              >
                Log Out
              </Button>
            )}
          </Box>

          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            sx={{
              mr: 2,
              display: {
                xs: "block",
                sm: "block",
                md: "none",
                // lg: "none",
                // xl: "none",
              },
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* The outside of the drawer */}
          <Drawer
            //from which side the drawer slides in
            anchor="right"
            //if open is true --> drawer is shown
            open={open}
            //function that is called when the drawer should close
            onClose={toggleDrawer(false)}
            //function that is called when the drawer should open
            onOpen={toggleDrawer(true)}
          >
            {/* The inside of the drawer */}
            <Box
              sx={{
                p: 2,
                height: 1,
                backgroundColor: "#dbc8ff",
              }}
            >
              {/* when clicking the icon it calls the function toggleDrawer and closes the drawer by setting the variable open to false */}
              <IconButton sx={{ mb: 2 }}>
                <CloseIcon onClick={toggleDrawer(false)} />
              </IconButton>

              <Divider sx={{ mb: 2 }} />

              <Box sx={{ mb: 2 }}>
                <ListItemButton
                  LinkComponent={Link}
                  to="/"
                  onClick={toggleDrawer(false)}
                >
                  <ListItemIcon>
                    <ImageIcon sx={{ color: "primary.main" }} />
                  </ListItemIcon>
                  <ListItemText primary="All Blogs" />
                </ListItemButton>

                {isLoggedIn && (
                  <>
                    <ListItemButton
                      value={value}
                      onChange={(event, val) => setValue(val)}
                      LinkComponent={Link}
                      to="/myBlogs"
                      onClick={toggleDrawer(false)}
                    >
                      <ListItemIcon>
                        <DescriptionIcon sx={{ color: "primary.main" }} />
                      </ListItemIcon>
                      <ListItemText primary="MyBlogs" />
                    </ListItemButton>

                    <ListItemButton
                      value={value}
                      onChange={(event, val) => setValue(val)}
                      LinkComponent={Link}
                      to="/blogs/add"
                      onClick={toggleDrawer(false)}
                    >
                      <ListItemIcon>
                        <FolderIcon sx={{ color: "primary.main" }} />
                      </ListItemIcon>
                      <ListItemText primary="Create Blogs" />
                    </ListItemButton>
                  </>
                )}
              </Box>

              {!isLoggedIn ? (
                <Button
                  component={Link}
                  to="/auth"
                  variant="outlined"
                  onClick={toggleDrawer(false)}
                  sx={{ margin: 1, borderRadius: 10 }}
                >
                  Login
                </Button>
              ) : (
                <Button
                  onClick={() => dispatch(authActions.logout())}
                  LinkComponent={Link}
                  to="/"
                  variant="contained"
                  sx={{ margin: 1, borderRadius: 10 }}
                >
                  Log Out
                </Button>
              )}
            </Box>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
