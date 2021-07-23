import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import useStyles from "./styles";

const Paginations = ({ totalPages, setCurrentPage }) => {
  const classes = useStyles();
  return (
    <div className={classes.pagination}>
      <Pagination
        count={totalPages}
        variant="outlined"
        color="primary"
        onChange={(event, value) => setCurrentPage(value - 1)}
      />
    </div>
  );
};

export default Paginations;
