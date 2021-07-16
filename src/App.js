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

  const onAddToCart = (product, quantity) => {
    product.quantity = quantity;
    cartApi.addToCart(28, product);
  };

  const fetchCartIcon = async () => {
    const response = await cartApi.getCartIcon(5);
    return response.data;
  };

  const fetchProducts = async () => {
    const response = await productApi.getAll(0);
    const productsData = response.data.data.content;
    return productsData;
  };
  useEffect(() => {
    fetchProducts().then((productsData) => {
      setProducts(productsData);
    });
    fetchCartIcon().then((data) => {
      setCartIcon(data);
    });
  }, []);

  return (
    <Router>
      <Container maxWidth="lg">
        <div className="main-container">
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
              <Products products={products} onAddToCart={onAddToCart} />
              <Paginations className="pagination" />
            </Route>
          </Switch>
        </div>
      </Container>
    </Router>
  );
}

export default App;
