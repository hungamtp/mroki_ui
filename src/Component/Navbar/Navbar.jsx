import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Badge,
  Typography,
  IconButton,
  Button,
  Avatar,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import useStyles from "./styles";
import cartApi from "../../axios/cartApi";
import { useHistory } from "react-router";

const Navbar = ({ authenticated, cartIcon }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const [auth, setAuth] = useState(authenticated);
  const history = useHistory();
  const handleClickLogin = () => {
    history.push("/login");
  };
  const handleMenuClickOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("avatar");
    localStorage.removeItem("userId");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("role");
    localStorage.setItem("authenticated", false);
    setAuth(false);
    setAnchorEl(null);
  };

  return (
    <AppBar className={classes.appBar}>
      <Toolbar postion="fixed" color="inherit">
        <Typography variant="h6" className={classes.title} color="inherit">
          <Link to={"/"}>
            <img
              src={logo}
              alt="commerce.js"
              height="35px"
              className={classes.image}
            />
          </Link>
        </Typography>
        {localStorage.getItem("authenticated") === "true" ? (
          <>
            <Link
              style={{ textDecoration: "none" }}
              to={`/cart/${localStorage.getItem("userId")}`}
            >
              <IconButton
                aria-label="Show cart items"
                color="inherit"
                className={classes.cart}
              >
                <Badge badgeContent={cartIcon} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Link>
            <Avatar
              alt="Remy Sharp"
              src={localStorage.getItem("avatar")}
              onClick={handleMenuClickOpen}
            />
            <Menu
              className={classes.menuList}
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>Orders</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Button variant="contained" onClick={handleClickLogin}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
