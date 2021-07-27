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
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import Paginations from "../../Pagination/Pagination";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
  const [search, setSearch] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [priceSearch, setPriceSearch] = useState([30, 200]);

  const classes = useStyles();

  const getCategory = (category) => {
    if (category === "All Category") {
      setCategorySearch("");
    } else {
      setCategorySearch(category);
    }
    setSearch(
      `,name:${nameSearch},categoryId:${category},price${priceSearch[0]}:${priceSearch[1]}`
    );
  };
  const getName = (name) => {
    setNameSearch(name);
    setSearch(
      `,name:${name},categoryId:${categorySearch},price${priceSearch[0]}:${priceSearch[1]}`
    );
  };
  const getPrice = (price) => {
    setPriceSearch(price);
    setSearch(
      `,name:${nameSearch},categoryId:${categorySearch},price${price[0]}:${price[1]}`
    );
  };

  const fetchProducts = async () => {
    const response = await productApi.getAllAdminProduct(
      currentPage,
      size,
      sort,
      search
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

  const closeAddForm = () => {
    handleCloseAddForm();
  };

  const sortBy = (sortType) => {
    setSort(sortType);
  };

  const openDialog = () => {
    handleOpenAddForm();
  };
  const getSize = (size) => {
    setSize(size);
  };
  const getCurrentPage = (currentPage) => {
    setCurrentPage(currentPage);
  };

  const deleteProduct = async () => {
    productApi.deleteProduct(productDelete.id);
    handleCloseDeleteForm();
    const newProducts = products.filter(
      (product) => product.id !== productDelete.id
    );
    setProducts(newProducts);
  };

  useEffect(() => {
    fetchProducts().then((response) => {
      setIsLoading(true);
      setProducts(response.data.data);
      setTotalPage(response.data.totalPage);
      setTotalElement(response.data.totalElement);
      setTimeout(() => setIsLoading(false), 300);
    });
  }, [currentPage, size, sort, search]);

  return (
    <div>
      <Container maxWidth="lg" class="big">
        <Grid container justify="center" spacing={4} class="main">
          <Grid item xs={2} sm={2} md={2}>
            <Filter
              sortBy={sortBy}
              getSize={getSize}
              getName={getName}
              getCategory={getCategory}
              openDialog={openDialog}
              closeAddForm={closeAddForm}
              getPrice={getPrice}
            />
          </Grid>

          <Grid item xs={10} sm={10} md={10}>
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

        <div className={classes.totalElement}>
          <b>Total products:{totalElement}</b>
        </div>
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
        <AddForm closeAddForm={closeAddForm} />
        <Button onClick={handleCloseAddForm} color="primary">
          Cancel
        </Button>
      </Dialog>
    </div>
  );
};
