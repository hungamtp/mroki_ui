import React from "react";
import Grid from "@material-ui/core/Grid";
import Product from "./Product/Product";
import useStyles from "./styles";
import { Skeleton } from "@material-ui/lab";

const Products = ({ products, onAddToCart, isLoading }) => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" spacing={4}>
        {products.map((product) => {
          return (
            <Grid item key={product.id} xs={12} sm={3} md={3}>
              {isLoading ? (
                <Skeleton variant="rect" width={210} height={320} />
              ) : (
                <Product product={product} onAddToCart={onAddToCart} />
              )}
            </Grid>
          );
        })}
      </Grid>
    </main>
  );
};

export default Products;
