import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useStyles from "./styles";
import productApi from "../../axios/productApi";
import commentApi from "../../axios/commentApi";
import sizeApi from "../../axios/sizeApi";
import { Grid, Paper, Container } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";

const ProductDetail = () => {
  let { id } = useParams();
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);
  const [sizes, setSizes] = useState([]);
  const classes = useStyles();

  const fetchProduct = async () => {
    const productData = await productApi.getProductDetail(id);
    const data = await productData.data.data;
    return data;
  };
  const fetchComments = async () => {
    const response = await commentApi.getAll(id, 0);
    const data = await response.data.data;
    return data;
  };

  const fetchSize = async () => {
    const response = await sizeApi.getAllSize(id);

    return response.data;
  };

  useEffect(() => {
    fetchProduct().then((data) => {
      setProduct(data);
      console.log(data);
    });
    fetchComments().then((commentData) => {
      setComments(commentData);
    });
    fetchSize().then((sizeData) => {
      setSizes(sizeData);
    });
  }, []);
  useEffect(() => {
    fetchComments().then((commentData) => {
      setComments(commentData);
    });
  }, []);

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Card className={classes.root} height="75%">
              <CardMedia
                className={classes.media}
                title={product.name}
                image={product.thumbnail}
              />
              <CardMedia className={classes.media} image={product.image1} />
              <CardMedia className={classes.media} image={product.image2} />
              <CardContent>
                <div className={classes.cardContent}>
                  <Typography variant="h5" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="h6">{product.retail}$</Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card className={classes.root} height="75%">
              rate
            </Card>
          </Grid>
        </Grid>
      </Container>

      {comments.map((comment) => {
        return <div className="comment">{comment.username}</div>;
      })}
    </div>
  );
};

export default ProductDetail;
