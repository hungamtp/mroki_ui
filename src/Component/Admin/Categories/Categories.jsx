import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import categoryApi from "../../../axios/categoryApi";
import { FormatListBulletedTwoTone } from "@material-ui/icons";

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
    <>
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {categories.map((category) => {
          const { id, name, subCategories } = category;
          return (
            <>
              <TreeItem nodeId={id} label={name}>
                {subCategories.map((subCategory) => {
                  const { id, name, subCategories } = subCategory;
                  return <TreeItem nodeId={id} label={name} />;
                })}
              </TreeItem>
            </>
          );
        })}
        <TreeItem nodeId="add" label="Add category" />
      </TreeView>
    </>
  );
};
