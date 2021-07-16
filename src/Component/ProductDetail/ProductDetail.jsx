import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useStyles from "./styles";
import productApi from "../../axios/productApi";
import commentApi from "../../axios/commentApi";

const ProductDetail = () => {
  let { id } = useParams();
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);
  const classes = useStyles();

  const fetchProduct = async () => {
    const productData = await productApi.getProductDetail(id);
    const data = await productData.data.data;
    return data;
  };
  const fetchComments = async () => {
    const response = await commentApi.getAll(id, 0);
    const data = await response.data;
    return data;
  };

  useEffect(() => {
    fetchProduct().then((data) => {
      setProduct(data);
    });
  }, []);
  useEffect(() => {
    fetchComments().then((commentData) => {
      setComments(commentData);
    });
  }, []);

  return <div className={classes.root}>{product.name}</div>;
};

export default ProductDetail;
