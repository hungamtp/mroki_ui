import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Badge,
  Typography,
  IconButton,
  Button,
  Slide,
  Avatar,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import logo from "../../assets/logo.jpg";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import cartApi from "../../axios/cartApi";
import { useHistory } from "react-router";

const Navbar = () => {
  const classes = useStyles();
  const [authenticated, setAuthenticated] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const [cartIcon, setCartIcon] = useState(0);

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
    localStorage.setItem("authenticated", false);
    setAuthenticated(false);
    setAnchorEl(null);
  };

  const fetchCartIcon = async () => {
    const response = cartApi.getCartIcon(localStorage.getItem("userId"));
    return (await response).data;
  };

  useEffect(() => {
    fetchCartIcon().then((count) => {
      setCartIcon(count.data);
    });
  }, [authenticated]);

  return (
    <>
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
              <IconButton
                aria-label="Show cart items"
                color="inherit"
                className={classes.cart}
              >
                <Badge badgeContent={cartIcon} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
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
    </>
  );
};

export default Navbar;
