import React from "react";
import { TableCell, TableRow } from "@material-ui/core";
export const Customer = ({ customer }) => {
  return (
    <TableRow key={customer.id}>
      <TableCell align="center">{customer.id}</TableCell>
      <TableCell align="center">{customer.username}</TableCell>
      {/* <TableCell align="center">
        <img src={customer.avatar} />
      </TableCell> */}
      <TableCell align="center">{customer.phone}</TableCell>
      <TableCell align="center">{customer.email}</TableCell>
      <TableCell align="center">{customer.roleName}</TableCell>
    </TableRow>
  );
};
