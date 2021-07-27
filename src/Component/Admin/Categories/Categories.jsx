import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { Button, IconButton, Container, Grid } from "@material-ui/core";
import { Category } from "./Category/Category";
import categoryApi from "../../../axios/categoryApi";
import { FormCategory } from "./FormCategory/FormCategory";

export const Categories = () => {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();
  const [parentId, setParentId] = useState("");

  const editCategory = (categoryEdit) => {
    setCategory(categoryEdit);
  };
  const getParentId = (parent) => {
    setParentId(parent);
  };
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await categoryApi.getParentCategory();
      await setCategories(response.data);
    };
    fetchCategories();
  }, []);

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container justify="center" spacing={4} class="main">
        <Grid item xs={12} sm={9} md={9}>
          <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            {categories.map((category) => {
              const { id, name, subCategories } = category;
              return (
                <TreeItem nodeId={id} label={name}>
                  {subCategories.map((subCategory) => {
                    return (
                      <Category
                        parentId={id}
                        category={subCategory}
                        editCategory={editCategory}
                        getParentId={getParentId}
                      />
                    );
                  })}
                </TreeItem>
              );
            })}
          </TreeView>
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <FormCategory categories={categories} />
        </Grid>
      </Grid>
    </Container>
  );
};
