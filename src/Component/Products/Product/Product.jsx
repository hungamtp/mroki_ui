import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import useStyles from "./styles";
import { Link } from "react-router-dom";

const Product = ({ product, onAddToCart }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} height="75%">
      <Link style={{ textDecoration: "none" }} to={`/product/${product.id}`}>
        {" "}
        <CardMedia
          className={classes.media}
          image={product.thumbnail}
          title={product.name}
        />
        <CardContent>
          <div className={classes.cardContent}>
            <Typography variant="h5" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="h6">{product.price}$</Typography>
          </div>
          <Rating value={product.rate} readOnly />
        </CardContent>
      </Link>
    </Card>
  );
};
export default Product;
