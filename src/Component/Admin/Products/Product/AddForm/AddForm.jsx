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
export const AddForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [retail, setRetail] = useState(0);
  const [saleOff, setSaleOff] = useState(0);
  const [thumbnail, setThumbnail] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [image1Url, setImage1Url] = useState("");
  const [image2Url, setImage2Url] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const classes = useStyles();
  const handleChange = (event) => {};
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const uploadTask = storage.ref(`product-image/${name}.1`).put(thumbnail);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(percentage);
      },
      (error) => {},
      () => {
        storage
          .ref("product-image")
          .child(`${name}.1`)
          .getDownloadURL()
          .then((url) => {
            setThumbnailUrl(url);
          });
      }
    );

    if (image1 !== null) {
      const uploadTask = storage.ref(`product-image/${name}.2`).put(image1);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(percentage);
        },
        (error) => {},
        () => {
          storage
            .ref("product-image")
            .child(`${name}.2`)
            .getDownloadURL()
            .then((url) => {
              setImage1Url(url);
            });
        }
      );
    }
    if (image2 !== null) {
      const uploadTask = storage.ref(`product-image/${name}.3`).put(image2);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(percentage);
        },
        (error) => {},
        () => {
          storage
            .ref("product-image")
            .child(`${name}.3`)
            .getDownloadURL()
            .then((url) => {
              setImage2Url(url);
            });
        }
      );
    }
    setIsLoading(false);
  };
  return (
    <div className={classes.form}>
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
              <MenuItem value={10}>Gym</MenuItem>
              <MenuItem value={20}>Life Style</MenuItem>
              <MenuItem value={30}>Running</MenuItem>
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
