import React from "react";
import {
  AppBar,
  Toolbar,
  Badge,
  Typography,
  IconButton,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import logo from "../../assets/commerce.png";
import { Link } from "react-router-dom";
import useStyles from "./styles";
const Navbar = ({ cartIcon }) => {
  const classes = useStyles();
  return (
    <>
      <AppBar>
        <Toolbar postion="fixed" className={classes.appBar} color="inherit">
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
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
