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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [retail, setRetail] = useState(0);
  const [saleOff, setSaleOff] = useState(0);
  const [thumbnail, setThumbnail] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [image1Url, setImage1Url] = useState("");
  const [image2Url, setImage2Url] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {};

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
            onChange={(e) => setName(e.target.value)}
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
            value={productUpdate.retail}
          />
        </div>

        <div className={classes.imagePick}>
          <img className={classes.productImg} src={productUpdate.thumbnail} />
          <input type="file" className={classes.imageInput} />
        </div>
        <div className={classes.imagePick}>
          <img className={classes.productImg} src={productUpdate.image1} />
          <input type="file" className={classes.imageInput} />
        </div>
        <div className={classes.imagePick}>
          <img className={classes.productImg} src={productUpdate.image2} />
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
