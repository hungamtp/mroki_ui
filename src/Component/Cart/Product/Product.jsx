import React, { useState } from "react";
import { Card, Checkbox, Button, CardMedia } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import useStyles from "./styles";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const Product = ({ product }) => {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(product.quantity);
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
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
        <Button>
          <DeleteOutlineIcon />
        </Button>
      </Card>
    </>
  );
};

export default Product;
