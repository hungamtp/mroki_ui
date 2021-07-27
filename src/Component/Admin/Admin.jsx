import { useHistory } from "react-router";
import React, { useState } from "react";
import useStyles from "./styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Products } from "./Products/Products";
import { Categories } from "./Categories/Categories";
import { Container } from "@material-ui/core";
import { Customers } from "./Customers/Customers";

export const Admin = () => {
  const history = useHistory();

  if (localStorage.getItem("authenticated") === "false") {
    history.push("/login");
  } else {
    if (localStorage.getItem("role") !== "Admin") {
      history.push("/");
    }
  }

  const classes = useStyles();
  const [value, setValue] = useState(0);

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Paper square className={classes.tab}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={(e, value) => setValue(value)}
        >
          <Tab label="Product" aria-selected />
          <Tab label="Customer" />
          <Tab label="Category" />
        </Tabs>
      </Paper>
      {value === 0 && <Products />}
      {value === 1 && <Customers />}
      {value === 2 && <Categories />}
    </Container>
  );
};
