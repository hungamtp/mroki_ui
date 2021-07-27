import React, { useState } from "react";
import useStyles from "./styles";
import { Card, Button, CircularProgress } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import categoryApi from "../../../../axios/categoryApi";

export const Category = ({ category, parentId, editCategory, getParentId }) => {
  const classes = useStyles();
  const [isDeleting, setIsDeleting] = useState(false);
  const handleEdit = () => {
    editCategory(category);
    getParentId(parentId);
  };
  const handleDelete = async () => {
    await setIsDeleting(true);
    await categoryApi.deleteCategory(category.id);
    setIsDeleting(false);
  };
  return (
    <Card className={classes.category}>
      <div>{category.name}</div>
      <div className={classes.button}>
        <Button onClick={handleEdit}>
          <EditIcon />
        </Button>
        {isDeleting ? (
          <CircularProgress />
        ) : (
          <Button onClick={handleDelete}>
            <DeleteIcon />
          </Button>
        )}
      </div>
    </Card>
  );
};
