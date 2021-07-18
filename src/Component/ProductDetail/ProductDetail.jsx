import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useStyles from "./styles";
import productApi from "../../axios/productApi";
import commentApi from "../../axios/commentApi";
import sizeApi from "../../axios/sizeApi";
import boy from "../../assets/boy.png";
import { Grid, Container, Avatar } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";

const ProductDetail = () => {
  let { id } = useParams();
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [rate, setRate] = useState([]);
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

  const fetchAverageEate = async () => {
    const response = await commentApi.getEverageRate(id);
    return response.data;
  };

  useEffect(() => {
    fetchProduct().then((data) => {
      setProduct(data);
    });
    fetchComments().then((commentData) => {
      setComments(commentData);
    });
    fetchSize().then((sizeData) => {
      setSizes(sizeData);
    });
    fetchAverageEate().then((everagrate) => {
      setRate(everagrate);
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
            <Card className={classes.root}>
              <CardMedia
                className={classes.media}
                title={product.name}
                image={product.thumbnail}
              />
              <CardMedia className={classes.media} image={product.image1} />
              <CardMedia className={classes.media} image={product.image2} />
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card className={classes.root}>
              <CardContent>
                <div className={classes.cardContent}>
                  <Typography variant="h5" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="h6">{product.retail}$</Typography>
                </div>
              </CardContent>
            </Card>
            <Card className={classes.size}>
              {sizes.map((size) => {
                return <Card className={classes.root}>{size.size}</Card>;
              })}
            </Card>
            <Card className={classes.root}>
              <div className={classes.rateCard}>
                <h1>{rate.rate}</h1>
                <div>
                  <Rating value={rate.rate} readOnly />
                  <div>{rate.count} comments</div>
                </div>
              </div>

              <div>
                <Rating value={1} readOnly />
                {rate.countRate1}
              </div>
              <div>
                <Rating value={2} readOnly />
                <span>{rate.countRate2} </span>
              </div>
              <div>
                <Rating value={3} readOnly />
                <span>{rate.countRate3} </span>
              </div>
              <div>
                <Rating value={4} readOnly />
                <span>{rate.countRate4} </span>
              </div>
              <div>
                <Rating value={5} readOnly />
                <span>{rate.countRate5} </span>
              </div>
            </Card>
            <h3>Feedback</h3>
            <Card className={classes.commentContainer}>
              {comments.map((comment) => {
                return (
                  <Card className={classes.comment}>
                    <div className={classes.user}>
                      <Avatar alt="Remy Sharp" src={boy} />
                      <div>
                        <b>{comment.username}</b>
                      </div>
                    </div>
                    <div className={classes.commentDetail}>
                      <div className={classes.content}>{comment.content}</div>
                      <Rating value={comment.rate} readOnly />
                    </div>
                  </Card>
                );
              })}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ProductDetail;
