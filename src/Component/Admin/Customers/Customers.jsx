import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import customerApi from "../../../axios/customerApi";
import { Customer } from "./Customer/Customer";
import {
  Container,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Card,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

export const Customers = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [totalElements, setElements] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [nameSearch, setNameSearch] = useState("");
  const [phoneSearch, setPhoneSearch] = useState("");
  const [emailSearch, setEmailSearch] = useState("");
  const [sort, setSort] = useState("id");
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState("");
  const classes = useStyles();

  const handleNameChange = (e) => {
    setNameSearch(e.target.value);
    setSearch(
      `username:${e.target.value},email:${emailSearch},phone:${phoneSearch}`
    );
  };
  const handleEmailChange = (e) => {
    setEmailSearch(e.target.value);
    setSearch(
      `username:${nameSearch},email:${e.target.value},phone:${phoneSearch}`
    );
  };
  const handlePhoneChange = (e) => {
    setPhoneSearch(e.target.value);
    setSearch(
      `username:${nameSearch},email:${emailSearch},phone:${e.target.value}`
    );
  };
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };
  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await customerApi.getCustomers(
        currentPage,
        size,
        sort,
        search
      );
      setCustomers(response.data.data.data);
      setTotalPage(response.data.data.totalPage);
      setElements(response.data.data.totalElement);
    };
    fetchCustomers();
  }, [currentPage, search, sort]);
  return (
    <Container maxWidth="lg">
      <Grid item xs={12} sm={12} md={12}>
        <Card elevation={5} className={classes.filterContainer}>
          <div>
            <TextField
              label="Username"
              onChange={handleNameChange}
              className={classes.nameField}
            />
            <TextField
              label="Email"
              onChange={handleEmailChange}
              className={classes.emailField}
            />
            <TextField label="Phone" onChange={handlePhoneChange} />
          </div>
          <div className={classes.size}>
            <InputLabel id="size">Size</InputLabel>
            <Select
              labelId="size"
              value={size}
              onChange={handleSizeChange}
              className={classes.sizeField}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={40}>40</MenuItem>
            </Select>
          </div>
        </Card>
        <TableContainer component={Paper} className={classes.products}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center">Username</TableCell>
                {/* <TableCell align="center">Avatar</TableCell> */}
                <TableCell align="center">Phone</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <Customer customer={customer} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={classes.pagination}>
          <Pagination
            count={totalPage}
            variant="outlined"
            color="primary"
            onChange={(event, value) => setCurrentPage(value - 1)}
          />
          <div className={classes.total}>
            <b>Total : {totalElements}</b>
          </div>
        </div>
      </Grid>
    </Container>
  );
};
