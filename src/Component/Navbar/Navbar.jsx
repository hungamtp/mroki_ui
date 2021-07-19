import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Badge,
  Typography,
  IconButton,
  Button,
  Dialog,
  Slide,
  Avatar,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import logo from "../../assets/logo.jpg";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import Login from "./Login/Login";
import cartApi from "../../axios/cartApi";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Navbar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [avatar, setAvatar] = useState();
  const [username, setUsername] = useState();
  const [userId, setUserId] = useState();
  const [cartIcon, setCartIcon] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
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
    localStorage.removeItem("authenticated");
    setAuthenticated(false);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const closeModal = (close) => {
    setAuthenticated(true);
    handleClose();
  };

  const fetchCartIcon = async () => {
    const response = cartApi.getCartIcon(userId);
    return (await response).data;
  };

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
    setAvatar(localStorage.getItem("avatar"));
    setUserId(localStorage.getItem("userId"));

    fetchCartIcon().then((cartData) => {
      setCartIcon(cartData);
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

          {authenticated ? (
            <>
              <IconButton
                aria-label="Show cart items"
                color="inherit"
                className={classes.cart}
              >
                <Badge badgeContent={cartIcon.count} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              <Avatar
                alt="Remy Sharp"
                src={avatar}
                onClick={handleMenuClickOpen}
              />
              {/* {username} */}
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
            <Button variant="contained" onClick={handleClickOpen}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        disableEscapeKeyDown
        disableBackdropClick
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <Login closeModal={closeModal} />
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </Dialog>
    </>
  );
};

export default Navbar;
