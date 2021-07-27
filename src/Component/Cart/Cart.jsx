import { Container } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import cartApi from "../../axios/cartApi";
import Product from "./Product/Product";
import { Button } from "@material-ui/core";
import useStyles from "./styles";
export const Cart = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const { userId } = useParams();

  const deleteProductInCart = (id, size, quantity) => {
    const newProduct = products.filter(
      (product) => product.id !== id && product.size !== size
    );
    setProducts(newProduct);
  };
  useEffect(() => {
    const fetchProductInCart = async () => {
      const response = await cartApi.getCart(userId);
      const productsData = await response.data.products;
      console.log(productsData);
      setProducts(productsData);
    };
    fetchProductInCart();
  }, []);
  return (
    <Container className={classes.container} maxWidth="md">
      {products.map((product) => {
        return (
          <Product
            product={product}
            deleteProductInCart={deleteProductInCart}
          />
        );
      })}
      <div className={classes.button}>
        <Button variant="contained" color="secondary">
          Order
        </Button>
      </div>
    </Container>
  );
};
