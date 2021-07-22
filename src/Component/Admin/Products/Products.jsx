import React, { useState, useEffect } from "react";
import productApi from "../../../axios/productApi";
import { DataGrid } from "@material-ui/data-grid";
export const Products = () => {
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [size, setSize] = useState(20);
  const [sort, setSort] = useState("id");

  const fetchProducts = async () => {
    const response = await productApi.getAllAdminProduct(
      currentPage,
      size,
      sort
    );
    const productsData = response.data;
    return productsData;
  };

  const columns = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "price", headerName: "Price", width: 130 },
    { field: "retail", headerName: "Retail", width: 150 },
    { field: "description", headerName: "Description", width: 150 },
    { field: "saleOff", headerName: "SaleOff", width: 150 },
    { field: "createdDate", headerName: "Create Date", width: 150 },
    { field: "modifiedDate", headerName: "Modified Date", width: 150 },
    { field: "categoryName", headerName: "Category", width: 150 },
    { field: "thumbnail", headerName: "Thumbnail", width: 150 },
    { field: "image1", headerName: "Image 1", width: 150 },
    { field: "image2", headerName: "Image 2", width: 150 },
    { field: "Deleted", headerName: "Deleted", width: 150 },
  ];

  useEffect(() => {
    fetchProducts().then((response) => {
      setProducts(response.data.content);
      setTotalPage(response.totalPages);
      console.log(products);
    });
  }, [currentPage]);
  return (
    <div>
      <div style={{ height: 800, width: "100%" }}>
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid columns={columns} rows={products} checkboxSelection />
          </div>
        </div>
      </div>
    </div>
  );
};
