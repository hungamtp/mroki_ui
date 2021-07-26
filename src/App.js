import { useEffect, useState } from "react";
import "./App.css";
import Products from "./Component/Products/Products";
import Navbar from "./Component/Navbar/Navbar";
import productApi from "./axios/productApi";
import { Cart } from "./Component/Cart/Cart";
import { Container, Grid } from "@material-ui/core";
import ProductDetail from "./Component/ProductDetail/ProductDetail";
import Paginations from "./Component/Pagination/Pagination";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Component/Login/Login";
import cartApi from "./axios/cartApi";
import { Admin } from "./Component/Admin/Admin";
import { Filter } from "./Component/Filter/Filter";

function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [nameSearch, setNameSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [priceSearch, setPriceSearch] = useState([30, 200]);
  const [search, setSearch] = useState("");
  const size = 9;
  const [sort, setSort] = useState("id");
  const [authenticated, setAuthenticated] = useState(false);
  const [cartIcon, setCartIcon] = useState(0);

  const addToCart = () => {
    setCartIcon(cartIcon + 1);
  };
  const fetchCartIcon = async () => {
    const response = cartApi.getCartIcon(localStorage.getItem("userId"));
    return (await response).data;
  };
  useEffect(() => {
    fetchCartIcon().then((count) => {
      setCartIcon(count.data);
    });
    fetchCartIcon();
  }, []);
  const getCurrentPage = (page) => {
    setCurrentPage(page);
  };

  const getAuthenticated = () => {
    setAuthenticated(true);
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

  const fetchProducts = async () => {
    const response = await productApi.getAll(currentPage, size, sort, search);
    const productsData = response.data.data;
    return productsData;
  };

  useEffect(() => {
    fetchProducts().then((productsData) => {
      setIsLoading(true);
      setProducts(productsData.data);
      setTotalPage(productsData.totalPage);
      setIsLoading(false);
    });
  }, [currentPage, sort, search]);

  return (
    <Router>
      <Container maxWidth="lg" class="mainGrid">
        <Navbar authenticated={authenticated} cartIcon={cartIcon} />
        <Grid Container justify="center" spacing={4} class="main">
          <Route exact path="/">
            <Grid item xs={0} sm={2} md={2} class="filter-container">
              <Filter
                getName={getName}
                getPrice={getPrice}
                getCategory={getCategory}
              />
            </Grid>
            <Grid item xs={12} sm={8} md={8}>
              <Products products={products} isLoading={isLoading} />
              <Paginations
                totalPages={totalPages}
                setCurrentPage={getCurrentPage}
              />
            </Grid>
          </Route>
        </Grid>

        <Switch>
          <Route exact path="/product/:id">
            <ProductDetail addToCart={addToCart} />
          </Route>
          <Route exact path="/cart/:userId">
            <Cart />
          </Route>
          <Route exact path="/admin">
            <Admin />
          </Route>
          <Route exact path="/login">
            <Login getAuthenticated={getAuthenticated} />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
