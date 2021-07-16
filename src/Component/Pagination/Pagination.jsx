import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import useStyles from "./styles";

const Paginations = ({ page }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination count={5} variant="outlined" color="primary" />
    </div>
  );
};

export default Paginations;
