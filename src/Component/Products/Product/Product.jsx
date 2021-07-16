import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import useStyles from "./styles";
import { Link } from "react-router-dom";

const Product = ({ product, onAddToCart }) => {
  const classes = useStyles();

  const handleAddToCart = () => onAddToCart(product, 1);
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product.thumbnail}
        title={product.name}
      />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="h5" gutterBottom>
            <Link
              style={{ textDecoration: "none" }}
              to={`/product/${product.id}`}
            >
              {product.name}
            </Link>
          </Typography>
          <Typography variant="h5">{product.price}$</Typography>
        </div>
        <Box component="fieldset" borderColor="transparent">
          <Rating value={product.rate} readOnly />
        </Box>
      </CardContent>
      <CardActions disableSpacing className={classes.cardAction}>
        <IconButton aria-label="Add to cart" onClick={handleAddToCart}>
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};
export default Product;
