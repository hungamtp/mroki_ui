import React from "react";
import useStyles from "./styles";
import { Card, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

export const Category = ({ category }) => {
  const classes = useStyles();
  return (
    <Card className={classes.category}>
      <div>{category.name}</div>
      <div className={classes.button}>
        <Button>
          <EditIcon />
        </Button>
        <Button>
          <DeleteIcon />
        </Button>
      </div>
    </Card>
  );
};
