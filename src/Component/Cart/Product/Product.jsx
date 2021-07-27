import React, { useState } from "react";
import { Card, Button, CardMedia } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import useStyles from "./styles";
import cartApi from "../../../axios/cartApi";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const Product = ({ product, deleteProductInCart }) => {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(product.quantity);

  const handleDelete = () => {
    cartApi.deleteProductInCart(
      product.id,
      product.size,
      localStorage.getItem("userId")
    );
    deleteProductInCart(product.id, product.size, quantity);
  };
  return (
    <>
      <Card className={classes.product} elevation={5}>
        <CardMedia className={classes.img}>
          <img src={product.thumbnail} />
        </CardMedia>
        <div>
          <div>{product.name}</div>
          <Rating name="read-only" value={product.rate} readOnly />
          <div>Size:{product.size}</div>
        </div>
        <div>{product.price}$</div>
        <div>
          <button onClick={() => setQuantity(quantity - 1)}>-</button>
          <input
            value={quantity}
            min={1}
            className={classes.input}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
        <div>{quantity * product.price} $</div>
        <Button onClick={handleDelete}>
          <DeleteOutlineIcon />
        </Button>
      </Card>
    </>
  );
};

export default Product;
