import { useEffect, useState } from "react";
import "./App.css";
import Products from "./Component/Products/Products";
import Navbar from "./Component/Navbar/Navbar";
import productApi from "./axios/productApi";
import { Cart } from "./Component/Cart/Cart";
import { Container } from "@material-ui/core";
import ProductDetail from "./Component/ProductDetail/ProductDetail";
import Paginations from "./Component/Pagination/Pagination";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Component/Navbar/Login/Login";
import { Admin } from "./Component/Admin/Admin";

function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [size, setSize] = useState(9);
  const [sort, setSort] = useState("id");

  const getCurrentPage = (page) => {
    setCurrentPage(page);
  };

  const fetchProducts = async () => {
    const response = await productApi.getAll(currentPage, size, sort);
    const productsData = response.data.data;
    return productsData;
  };

  // const fetchTotalPage = async () => {
  //   const response = await productApi.getTotalPage(currentPage);
  //   const totalPage = response.data;
  //   return totalPage;
  // };
  useEffect(() => {
    fetchProducts().then((productsData) => {
      setIsLoading(true);
      setProducts(productsData.content);
      setTotalPage(productsData.totalPages);
      setIsLoading(false);
    });
  }, [currentPage, sort]);

  return (
    <Router>
      <div>
        <Container maxWidth="lg">
          <Navbar />
          <Switch>
            <Route exact path="/product/:id">
              <ProductDetail />
            </Route>
            <Route exact path="/admin">
              <Admin />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>
            <Route exact path="/">
              <Products products={products} isLoading={isLoading} />

              <Paginations
                totalPages={totalPages}
                setCurrentPage={getCurrentPage}
              />
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
