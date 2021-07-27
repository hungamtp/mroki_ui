import React, { useState } from "react";
import useStyles from "./styles";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  Paper,
  Box,
  Grid,
  TextField,
  Typography,
  MenuItem,
  Select,
  Button,
  CircularProgress,
} from "@material-ui/core";
import categoryApi from "../../../../axios/categoryApi";

export const FormCategory = ({ categories }) => {
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const classes = useStyles();
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    console.log(e.target.value);
  };
  const validationSchema = Yup.object().shape({
    id: Yup.string().required("ID is required").min(1).max(1),
    name: Yup.string()
      .required("Name is required")
      .min(1, "Name must be at least 1 characters")
      .max(25, "Name must not exceed 25 characters"),
    parent: Yup.string(),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = async (data) => {
    setIsLoading(true);

    if (category === "") {
      const response = await categoryApi.addCategory({
        id: data.id,
        name: data.name,
      });
      if (response.data.errorCode !== null) {
        setError("Id is not available");
      } else {
        setError("");
      }
    } else {
      const response = await categoryApi.addCategory({
        id: data.id,
        name: data.name,
        parentId: category,
      });
      if (response.data.errorCode !== null) {
        setError("Id is not available");
      } else {
        setError("");
      }
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Paper elevation={10}>
        {error !== "" && error}
        <Box px={3} py={2}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="id"
                name="id"
                label="ID"
                margin="dense"
                {...register("id")}
                error={errors.id ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.id?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="name"
                name="name"
                label="Name"
                margin="dense"
                {...register("name")}
                error={errors.name ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.name?.message}
              </Typography>
              <Select
                labelId="category"
                value={category}
                onChange={handleCategoryChange}
                className={classes.parentCate}
              >
                <MenuItem value={""}></MenuItem>
                {categories.map((category) => {
                  return (
                    <MenuItem value={category.id}>{category.name}</MenuItem>
                  );
                })}
              </Select>
            </Grid>
          </Grid>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <div className={classes.button}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit(onSubmit)}
              >
                Add
              </Button>
            </div>
          )}
        </Box>
      </Paper>
    </div>
  );
};
