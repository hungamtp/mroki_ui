import { useEffect, useState } from "react";
import "./App.css";
import Products from "./Component/Products/Products";
import Navbar from "./Component/Navbar/Navbar";
import productApi from "./axios/productApi";
import cartApi from "./axios/cartApi";
import { Cart } from "./Component/Cart/Cart";
import { Container } from "@material-ui/core";
import ProductDetail from "./Component/ProductDetail/ProductDetail";
import About from "./Component/About/About";
import Paginations from "./Component/Pagination/Pagination";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);
  const [cartIcon, setCartIcon] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onAddToCart = (product, quantity) => {
    product.quantity = quantity;
    cartApi.addToCart(28, product);
  };

  const getCurrentPage = (page) => {
    setCurrentPage(page);
    console.log(currentPage);
  };

  const fetchCartIcon = async () => {
    const response = await cartApi.getCartIcon(9);
    return response.data;
  };

  const fetchProducts = async () => {
    const response = await productApi.getAll(currentPage);
    const productsData = response.data.data;
    return productsData;
  };

  const fetchTotalPage = async () => {
    const response = await productApi.getTotalPage(currentPage);
    const totalPage = response.data;
    return totalPage;
  };
  useEffect(() => {
    fetchProducts().then((productsData) => {
      setProducts(productsData);
    });
  }, [currentPage]);

  useEffect(() => {
    fetchCartIcon().then((data) => {
      setCartIcon(data);
    });
    fetchTotalPage().then((totalPage) => {
      setTotalPage(totalPage);
    });
  }, []);

  return (
    <Router>
      <Container maxWidth="lg">
        <Navbar cartIcon={cartIcon} />
        <Switch>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/product/:id">
            <ProductDetail />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/">
            <Products
              products={products}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
            />
            <Paginations
              className="pagination"
              totalPages={totalPages}
              setCurrentPage={getCurrentPage}
            />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
