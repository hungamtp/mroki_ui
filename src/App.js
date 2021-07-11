import { useEffect, useReducer, useState } from "react";
import Products from "./Component/Products/Products";
import Navbar from "./Component/Navbar/Navbar";
import productApi from "./axios/productApi";

function App() {
  const [products, setProducts] = useState([]);

  const [number, setNumber] = useState(0);
  const onAddToCart = () => {
    setNumber(number + 1);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await productApi.getAll(0);
      const products = response.data;
      setProducts(products);
    };
    fetchProduct();
  }, []);

  return (
    <div className="container">
      <Navbar number={number} />
      <Products products={products} onAddToCart={onAddToCart} />
    </div>
  );
}

export default App;
