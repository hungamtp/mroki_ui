import { useHistory } from "react-router";
import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Products } from "./Products/Products";
import { Categories } from "./Categories/Categories";

export const Admin = () => {
  const history = useHistory();
  const [currentTab, setCurrentTab] = useState();
  if (localStorage.getItem("role") !== "Admin") {
    history.push("/");
  }
  const classes = useStyles();
  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Paper square>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab
            label="Product"
            onClick={() => {
              setCurrentTab("Product");
            }}
          />
          <Tab
            label="Customer"
            onClick={() => {
              setCurrentTab("Customer");
            }}
          />
          <Tab
            label="Profit"
            onClick={() => {
              setCurrentTab("Profit");
            }}
          />
          <Tab
            label="Category"
            onClick={() => {
              setCurrentTab("Categories");
            }}
          />
        </Tabs>
      </Paper>
      {currentTab === "Product" && <Products />}
      {currentTab === "Categories" && <Categories />}
    </div>
  );
};
