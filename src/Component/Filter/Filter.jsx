import React, { useState } from "react";
import { Card } from "@material-ui/core";
import useStyles from "./styles";
import categoryApi from "../../axios/categoryApi";

export const Filter = () => {
  const classes = useStyles();
  const [categories, setCategories] = useState();
  return (
    <div className={classes.filterContainer}>
      <Card></Card>
    </div>
  );
};
