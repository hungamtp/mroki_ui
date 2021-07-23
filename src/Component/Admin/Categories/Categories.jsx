import React from "react";
import useStyles from "./styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { FormatListBulletedTwoTone } from "@material-ui/icons";

export const Categories = () => {
  const classes = useStyles();
  const categoriesData = [
    {
      id: 1,
      name: "1",
      subCategories: [
        {
          id: 3,
          name: "3",
          subCategories: [],
        },
      ],
    },
    {
      id: 2,
      name: "2",
      subCategories: [
        {
          id: 4,
          name: "4",
          subCategories: [],
        },
      ],
    },
    {
      id: 7,
      name: "Temp",
      subCategories: [],
    },
  ];

  return (
    <>
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        <TreeItem nodeId="1" label="Applications">
          <TreeItem nodeId="2" label="Calendar" />
          <TreeItem nodeId="3" label="Chrome" />
          <TreeItem nodeId="4" label="Webstorm" />
        </TreeItem>
        <TreeItem nodeId="5" label="Documents">
          <TreeItem nodeId="10" label="OSS" />
          <TreeItem nodeId="6" label="Material-UI">
            <TreeItem nodeId="7" label="src">
              <TreeItem nodeId="8" label="index.js" />
              <TreeItem nodeId="9" label="tree-view.js" />
            </TreeItem>
          </TreeItem>
        </TreeItem>
      </TreeView>
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {categoriesData.map((category) => {
          const { id, name, subCategories } = category;
          return (
            <TreeItem nodeId={id} label={name}>
              {subCategories.map((subCategory) => {
                const { id, name, subCategories } = subCategory;
                console.log(name);
                return <TreeItem nodeId={id} label={name} />;
              })}
            </TreeItem>
          );
        })}
      </TreeView>
    </>
  );
};
