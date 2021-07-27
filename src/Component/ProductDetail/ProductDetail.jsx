import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useStyles from "./styles";
import productApi from "../../axios/productApi";
import commentApi from "../../axios/commentApi";
import sizeApi from "../../axios/sizeApi";
import cartApi from "../../axios/cartApi";
import boy from "../../assets/boy.png";
import { useHistory } from "react-router";
import { Grid, Container, Avatar, Button, MenuItem } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Select,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";

const ProductDetail = ({ addToCart }) => {
  let { id } = useParams();
  const history = useHistory();
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
      addToCart();
      cartApi.addToCart(localStorage.getItem("userId"), {
        id: id,
        quantity: 1,
        size: size,
      });
    } else {
      history.push("/login");
    }
  };

  const fetchProduct = async () => {
    const productData = await productApi.getProductDetail(id);
    const data = await productData.data.data;
    return data;
  };
  const fetchComments = async () => {
    const response = await commentApi.getAll(id, currentPage);
    return await response.data.data;
  };

  const fetchSize = async () => {
    const response = await sizeApi.getAllSize(id);
    return response.data;
  };

  const fetchAverageEate = async () => {
    const response = await commentApi.getEverageRate(id);
    return response.data;
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  useEffect(() => {
    fetchProduct().then((data) => {
      setProduct(data);
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
      setComments([...comments, ...commentData.data]);
      setTotalPage(commentData.totalPage);
    });
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
            <siv className={classes.sizeHolder}>
              <Select
                value={size}
                onChange={handleSizeChange}
                displayEmpty
                className={classes.selectEmpty}
                inputProps={{ "aria-label": "Without label" }}
              >
                {sizes.map((size) => {
                  return <MenuItem value={size.size}>{size.size}</MenuItem>;
                })}
              </Select>
              <IconButton aria-label="Add to Cart">
                <AddShoppingCart onClick={handleAddToCart} />
              </IconButton>
            </siv>
            <h3>Feedback</h3>
            <Card className={classes.rateContainer}>
              <div className={classes.rateCard}>
                <h1>{parseFloat(rate.rate).toFixed(1)}</h1>
                <div>
                  <Rating value={parseInt(rate.rate)} readOnly />
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
            </Card>
            {currentPage === totalPage - 1 ? (
              <></>
            ) : (
              <div className={classes.button}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Show More
                </Button>
              </div>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ProductDetail;
