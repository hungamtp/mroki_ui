import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import useStyles from "./styles";
export const UpdateForm = ({ productUpdate }) => {
  const classes = useStyles();
  const [product, setProduct] = useState(productUpdate);
  const [category, setCategory] = useState("Gym");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = () => {};
  return (
    <div className={classes.form}>
      <h2 className={classes.nameForm}>Update Product {productUpdate.name}</h2>
      <form noValidate onSubmit={handleSubmit}>
        <div>
          <TextField
            variant="outlined"
            margin="dense"
            name="name"
            label="Name"
            type="text"
            value={productUpdate.name}
          />
          <TextField
            variant="outlined"
            margin="dense"
            name="description"
            label="Description"
            type="text"
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            margin="dense"
            required
            name="price"
            label="Price"
            type="number"
          />
          <TextField
            variant="outlined"
            margin="dense"
            required
            name="retail"
            label="Retail"
            type="number"
          />
        </div>

        <div className={classes.imagePick}>
          <img className={classes.productImg} src={product.thumbnail} />
          <input type="file" className={classes.imageInput} />
        </div>
        <div className={classes.imagePick}>
          <img className={classes.productImg} src={product.image1} />
          <input type="file" className={classes.imageInput} />
        </div>
        <div className={classes.imagePick}>
          <img className={classes.productImg} src={product.image2} />
          <input type="file" className={classes.imageInput} />
        </div>

        <div className={classes.categoryPicker}>
          <InputLabel id="category">Cagory</InputLabel>
          <Select
            labelId="category"
            id="category"
            className={classes.selectCategory}
            onChange={handleChange}
          >
            <MenuItem value={10}>Gym</MenuItem>
            <MenuItem value={20}>Life Style</MenuItem>
            <MenuItem value={30}>Running</MenuItem>
          </Select>
        </div>

        <div className={classes.buttonContainer}>
          <Button type="submit" variant="contained" className={classes.submit}>
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};
