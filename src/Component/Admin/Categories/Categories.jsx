import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { Button, IconButton, Container, Grid } from "@material-ui/core";
import { Category } from "./Category/Category";
import categoryApi from "../../../axios/categoryApi";

export const Categories = () => {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);

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
        <Grid item xs={12} sm={6} md={6}>
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
                    return <Category category={subCategory} />;
                  })}
                </TreeItem>
              );
            })}
          </TreeView>
        </Grid>
        <Grid item xs={12} sm={6} md={6}></Grid>
      </Grid>
    </Container>
  );
};
