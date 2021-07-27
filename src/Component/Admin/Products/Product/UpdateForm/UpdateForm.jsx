import React, { useState, useEffect } from "react";
import { Button, Select, MenuItem, InputLabel } from "@material-ui/core";
import InputField from "./InputField/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import useStyles from "./styles";
import categoryApi from "../../../../../axios/categoryApi";
export const UpdateForm = ({ productUpdate }) => {
  const classes = useStyles();

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [image1Url, setImage1Url] = useState("");
  const [image2Url, setImage2Url] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {};

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await categoryApi.getAllSubCategory();
      await setCategories(response.data.data);
      console.log(categories);
    };
    fetchCategory();
  }, []);

  const schema = yup.object().shape({
    name: yup.string().required("Enter name"),
    description: yup.string(),
    price: yup.number().required("Enter price").min(1),
    retail: yup.number().required("Enter retail").min(1),
  });

  const form = useForm({
    defaultValues: {
      name: productUpdate.name,
      description: productUpdate.description,
      price: productUpdate.price,
      retail: productUpdate.retail,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = () => {};
  return (
    <div className={classes.form}>
      <h2 className={classes.nameForm}>Update Product {productUpdate.name}</h2>

      <form noValidate onSubmit={form.handleSubmit(handleSubmit)}>
        <div>
          <InputField name="name" label="Name" form={form} />
          <InputField name="description" label="Description" form={form} />
        </div>
        <div>
          <InputField name="price" label="Price" form={form} />
          <InputField name="retail" label="Retail" form={form} />
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
            value={productUpdate.categoryName}
            className={classes.selectCategory}
            onChange={handleChange}
          >
            {categories.map((category) => {
              <MenuItem value={category.id}>{category.name}</MenuItem>;
            })}
          </Select>
        </div>

        <div className={classes.buttonContainer}>
          <Button type="submit" variant="contained">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};
