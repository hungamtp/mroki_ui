import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  CircularProgress,
} from "@material-ui/core";
import storage from "../../../../../firebase/firebase";
import useStyles from "./styles";
import productApi from "../../../../../axios/productApi";
import categoryApi from "../../../../../axios/categoryApi";
import { useEffect } from "react";
export const AddForm = ({ closeAddForm }) => {
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

  const classes = useStyles();

  const handleChange = (event) => {
    setCategoryId(event.target.value);
  };
  const handleThumbnail = (e) => {
    if (e.target.files[0]) {
      setThumbnail(e.target.files[0]);
    }
  };
  const handleImage1 = (e) => {
    if (e.target.files[0]) {
      setImage1(e.target.files[0]);
    }
  };
  const handleImage2 = (e) => {
    if (e.target.files[0]) {
      setImage2(e.target.files[0]);
    }
  };
  const resetState = () => {
    setName("");
    setCategoryId("");
    setThumbnailUrl("");
    setPrice(0);
    setRetail(0);
    setSaleOff(0);
    setCategoryId("");
    setDescription("");
    setThumbnail(null);
    setImage1(null);
    setImage2(null);
    setImage1Url("");
    setImage2Url("");
  };
  const addProduct = () => {
    productApi.addProduct({
      name: name,
      price: price,
      retail: retail,
      description: description,
      saleOff: saleOff,
      categoryId: categoryId,
      thumbnail: thumbnailUrl,
      image1: image1Url,
      image2: image2Url,
    });
  };
  useEffect(() => {
    const fetchCategory = async () => {
      const response = await categoryApi.getAllSubCategory();
      await setCategories(response.data.data);
    };
    fetchCategory();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const uploadTask = storage.ref(`product-image/${name}.1`).put(thumbnail);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {},
      () => {
        storage
          .ref("product-image")
          .child(`${name}.1`)
          .getDownloadURL()
          .then((url) => {
            setThumbnailUrl(url);
            if (image1 === null) {
              setIsLoading(false);
              closeAddForm();
              resetState();
            } else {
              const uploadTask = storage
                .ref(`product-image/${name}.2`)
                .put(image1);
              uploadTask.on(
                "state_changed",
                (snapshot) => {},
                (error) => {},
                () => {
                  storage
                    .ref("product-image")
                    .child(`${name}.2`)
                    .getDownloadURL()
                    .then((url) => {
                      setImage1Url(url);
                      if (image2 === null) {
                        setIsLoading(false);
                        closeAddForm();
                        resetState();
                      } else {
                        const uploadTask = storage
                          .ref(`product-image/${name}.3`)
                          .put(image2);
                        uploadTask.on(
                          "state_changed",
                          (snapshot) => {},
                          (error) => {},
                          () => {
                            storage
                              .ref("product-image")
                              .child(`${name}.3`)
                              .getDownloadURL()
                              .then((url) => {
                                setImage2Url(url);
                                setIsLoading(false);
                                closeAddForm();
                                resetState();
                              });
                          }
                        );
                      }
                    });
                }
              );
            }
          });
      }
    );
  };
  return (
    <div className={classes.form} onSubmit={addProduct}>
      <h2 className={classes.nameForm}>Add Product</h2>
      <form noValidate onSubmit={handleSubmit}>
        <div className={classes.subForm}>
          <TextField
            variant="outlined"
            margin="dense"
            name="name"
            required
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="dense"
            name="description"
            label="Description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="dense"
            required
            name="retail"
            label="Retail"
            type="number"
            value={retail}
            onChange={(e) => setRetail(e.target.value)}
          />
        </div>
        <div className={classes.saleOff}>
          <TextField
            variant="outlined"
            margin="dense"
            required
            name="saleOff"
            label="SaleOff"
            type="number"
            value={saleOff}
            onChange={(e) => setSaleOff(e.target.value)}
          />
          <div className={classes.categoryPicker}>
            <InputLabel id="category">Cagory</InputLabel>
            <Select
              labelId="category"
              id="category"
              required
              className={classes.selectCategory}
              onChange={handleChange}
            >
              {categories.map((category) => {
                return <MenuItem value={category.id}>{category.name}</MenuItem>;
              })}
            </Select>
          </div>
        </div>

        <div className={classes.imagePick}>
          <label for="thumbnail">Thumbnail</label>
          <input
            id="thumbnail"
            type="file"
            className={classes.imageInput}
            onChange={handleThumbnail}
          />
        </div>
        <div className={classes.imagePick}>
          <label for="image1">Image 1</label>
          <input
            id="image1"
            type="file"
            className={classes.imageInput}
            onChange={handleImage1}
          />
        </div>
        <div className={classes.imagePick}>
          <label for="image2">Image 2</label>
          <input
            id="image2"
            type="file"
            className={classes.imageInput}
            onChange={handleImage2}
          />
        </div>

        <div className={classes.buttonContainer}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button
              type="submit"
              variant="contained"
              className={classes.submit}
            >
              Add
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
