import React from "react";
import { Button } from "@material-ui/core";
export const Product = ({ product, onUpdate, onDelete }) => {
  const handleUpdate = () => {
    onUpdate(product);
  };
  const handleDelete = () => {
    onDelete(product);
  };
  return (
    <tr key={product.id}>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>{product.retail}</td>
      <td>{product.description}</td>
      <td>{product.saleOff}</td>
      <td>{product.createdDate}</td>
      <td>{product.modifiedDate}</td>
      <td>{product.categoryName}</td>
      <td class="product-img">
        <img src={product.thumbnail} />
      </td>
      <td class="product-img">
        <img src={product.image1} />
      </td>
      <td class="product-img">
        <img src={product.image2} />
      </td>
      <td>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleUpdate}
        >
          Update
        </Button>
      </td>
      <td>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};
