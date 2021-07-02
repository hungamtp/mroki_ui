import "./App.css";
import { useEffect, useReducer, useState } from "react";
import productApi from "./axios/productApi";
import { reducer } from "./reducer/indexReducer";

const defaultState = {
  products: [],
};

function App() {
  const [state, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await productApi.getAll(0);
      const products = response.data.content;
      console.log(products);
      dispatch({ type: "SHOW_PRODUCT", payload: products });
    };
    fetchProduct();
  }, []);
  return (
    <div className="container">
      {state.products.map((product) => {
        return (
          <div className="col" key={product.id}>
            <div className="avatar">
              <img
                className="img"
                src={product.productImage.thumbnail}
                alt="default"
              />
            </div>
            <div>{product.price}</div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
