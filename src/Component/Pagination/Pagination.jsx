import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import { Container } from "@material-ui/core";

const Paginations = ({ totalPages, setCurrentPage }) => {
  return (
    <Container maxWidth="lg">
      <Pagination
        count={totalPages}
        variant="outlined"
        color="primary"
        onChange={(event, value) => setCurrentPage(value - 1)}
      />
    </Container>
  );
};

export default Paginations;
