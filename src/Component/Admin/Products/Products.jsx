import React, { useState, useEffect } from "react";
import productApi from "../../../axios/productApi";
import "./products.css";
import { Product } from "./Product/Product";
import useStyles from "./styles";
import { Filter } from "./Filter/Filter";
import { UpdateForm } from "./Product/UpdateForm/UpdateForm";
import { AddForm } from "./Product/AddForm/AddForm";
import {
  Button,
  Grid,
  Container,
  Dialog,
  Slide,
  DialogTitle,
  Card,
  Fab,
} from "@material-ui/core";
import Paginations from "../../Pagination/Pagination";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export const Products = () => {
  const [products, setProducts] = useState([]);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [openDialogAdd, setOpenDialogAdd] = useState(false);
  const [totalPage, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalElement, setTotalElement] = useState(0);
  const [sort, setSort] = useState("id");
  const [productUpdate, setProductUpdate] = useState({});
  const [productDelete, setProductDelete] = useState({});

  const classes = useStyles();

  const fetchProducts = async () => {
    const response = await productApi.getAllAdminProduct(
      currentPage,
      size,
      sort
    );
    const productsData = response.data;
    return productsData;
  };
  const handleCloseAddForm = () => {
    setOpenDialogAdd(false);
  };
  const handleOpenAddForm = () => {
    setOpenDialogAdd(true);
  };
  const handleCloseUpdateForm = () => {
    setOpenUpdateDialog(false);
  };
  const handleClickOpen = () => {
    setOpenUpdateDialog(true);
  };

  const handleCloseDeleteForm = () => {
    setOpenDialogDelete(false);
  };
  const handleOpenDeleteForm = () => {
    setOpenDialogDelete(true);
  };
  const onUpdate = (product) => {
    handleClickOpen();
    setProductUpdate(product);
  };

  const onDelete = (product) => {
    handleOpenDeleteForm();
    setProductDelete(product);
  };

  const openDialog = () => {
    handleOpenAddForm();
  };

  const getCurrentPage = (currentPage) => {
    setCurrentPage(currentPage);
  };

  const deleteProduct = async () => {
    const response = productApi.deleteProduct(productDelete.id);
    handleCloseDeleteForm();
    const newProducts = products.filter(
      (product) => product.id !== productDelete.id
    );
    setProducts(newProducts);
    console.log((await response).data);
  };

  useEffect(() => {
    fetchProducts().then((response) => {
      setProducts([...products, ...response.data.data]);
      setTotalPage(response.data.totalPage);
      setTotalElement(response.data.totalElement);
    });
  }, [currentPage, size, sort]);
  return (
    <div>
      <Container maxWidth className={classes.big}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card className={classes.filterContainer}>
              <Filter openDialog={openDialog} />
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div id="table-wrapper">
              <div id="table-scroll">
                <table class="products">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Retail</th>
                    <th>Description</th>
                    <th>SaleOff</th>
                    <th>Create Date</th>
                    <th>Modified Date</th>
                    <th>Category</th>
                    <th>Thumbnail</th>
                    <th>Image 1</th>
                    <th>Image 2</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                  {products.map((product) => {
                    return (
                      <Product
                        product={product}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                      />
                    );
                  })}
                </table>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
      <div className={classes.pagination}>
        <Paginations setCurrentPage={getCurrentPage} totalPages={totalPage} />
        <Button onClick={() => setCurrentPage(currentPage + 1)}>
          Load more
        </Button>
        {totalElement} Element
      </div>

      <Dialog
        open={openUpdateDialog}
        TransitionComponent={Transition}
        keepMounted
        disableEscapeKeyDown
        disableBackdropClick
        onClose={handleCloseUpdateForm}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <UpdateForm productUpdate={productUpdate} />
        <Button onClick={handleCloseUpdateForm} color="primary">
          Cancel
        </Button>
      </Dialog>

      <Dialog
        open={openDialogDelete}
        TransitionComponent={Transition}
        keepMounted
        disableEscapeKeyDown
        disableBackdropClick
        onClose={handleCloseDeleteForm}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="responsive-dialog-title">
          Are you sure to delete <b>{productDelete.name}</b>
        </DialogTitle>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={deleteProduct}
        >
          Delete
        </Button>
        <Button onClick={handleCloseDeleteForm} color="primary">
          Cancel
        </Button>
      </Dialog>
      <Dialog
        open={openDialogAdd}
        TransitionComponent={Transition}
        keepMounted
        disableEscapeKeyDown
        disableBackdropClick
        onClose={handleCloseDeleteForm}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <AddForm />
        <Button onClick={handleCloseAddForm} color="primary">
          Cancel
        </Button>
      </Dialog>
    </div>
  );
};
