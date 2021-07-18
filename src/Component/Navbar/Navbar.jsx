import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Badge,
  Typography,
  IconButton,
  Button,
  Dialog,
  Slide,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import logo from "../../assets/commerce.png";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import Login from "./Login/Login";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Navbar = ({ cartIcon }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
          <IconButton
            aria-label="Show cart items"
            color="inherit"
            className={classes.cart}
          >
            <Badge badgeContent={cartIcon.count} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <Typography className={classes.root}>
            <Button variant="contained" onClick={handleClickOpen}>
              Login
            </Button>
          </Typography>
        </Toolbar>
      </AppBar>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <Login />
      </Dialog>
    </>
  );
};

export default Navbar;
