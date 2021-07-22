import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useStyles from "./styles";
import productApi from "../../axios/productApi";
import commentApi from "../../axios/commentApi";
import sizeApi from "../../axios/sizeApi";
import cartApi from "../../axios/cartApi";
import boy from "../../assets/boy.png";
import {
  Grid,
  Container,
  Avatar,
  Button,
  ButtonGroup,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";

const ProductDetail = () => {
  let { id } = useParams();
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [size, setSize] = useState();
  const [rate, setRate] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const classes = useStyles();

  const handleAddToCart = () => {
    if (localStorage.getItem("authenticated") === "true") {
      cartApi.addToCart(localStorage.getItem("userId"), {
        id: id,
        quantity: 1,
        size: size,
      });
    }
  };

  const fetchProduct = async () => {
    const productData = await productApi.getProductDetail(id);
    const data = await productData.data.data;
    return data;
  };
  const fetchComments = async () => {
    const response = await commentApi.getAll(id, currentPage);
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

  const fetchTotalPage = async () => {
    const response = await commentApi.getTotalPageComment(id);
    setTotalPage(response.data);
  };

  useEffect(() => {
    fetchTotalPage();
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
    fetchTotalPage();
  }, []);
  useEffect(() => {
    fetchComments()
      .then((commentData) => {
        setComments([...comments, ...commentData]);
      })
      .then(console.log(comments));
  }, [currentPage]);

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
            <h3>Size</h3>
            <ButtonGroup size="small" aria-label="small outlined button group">
              <Card className={classes.size}>
                {sizes.map((size) => {
                  return (
                    <Button
                      value={size}
                      onClick={() => {
                        setSize(size.size);
                      }}
                    >
                      {size.size}
                    </Button>
                  );
                })}
              </Card>
              <IconButton aria-label="Add to Cart">
                <AddShoppingCart onClick={handleAddToCart} />
              </IconButton>
            </ButtonGroup>
            <h3>Feedback</h3>
            <Card className={classes.rateContainer}>
              <div className={classes.rateCard}>
                <h1>{rate.rate}</h1>
                <div>
                  <Rating value={rate.rate} readOnly />
                  <div>{rate.count} Feedbacks</div>
                </div>
              </div>

              <div className={classes.rateDetail}>
                <Rating value={1} readOnly />
                {rate.countRate1}
              </div>
              <div className={classes.rateDetail}>
                <Rating value={2} readOnly />
                <span>{rate.countRate2} </span>
              </div>
              <div className={classes.rateDetail}>
                <Rating value={3} readOnly />
                <span>{rate.countRate3} </span>
              </div>
              <div className={classes.rateDetail}>
                <Rating value={4} readOnly />
                <span>{rate.countRate4} </span>
              </div>
              <div className={classes.rateDetail}>
                <Rating value={5} readOnly />
                <span>{rate.countRate5} </span>
              </div>
            </Card>

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
                      <div className={classes.content1}>{comment.content}</div>
                      <Rating value={comment.rate} readOnly />
                    </div>
                  </Card>
                );
              })}
              {currentPage === totalPage - 1 ? (
                <></>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  LoadMore
                </Button>
              )}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ProductDetail;
