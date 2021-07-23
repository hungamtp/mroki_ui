import React from "react";
import Grid from "@material-ui/core/Grid";
import Product from "./Product/Product";
import useStyles from "./styles";
import { Skeleton } from "@material-ui/lab";

const Products = ({ products, onAddToCart, isLoading }) => {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <Grid container justify="center" spacing={2}>
        {products.map((product) => {
          return (
            <Grid item key={product.id} xs={12} sm={4} md={4}>
              {isLoading ? (
                <Skeleton variant="rect" width={210} height={320} />
              ) : (
                <Product product={product} onAddToCart={onAddToCart} />
              )}
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Products;
