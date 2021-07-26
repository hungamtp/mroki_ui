import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import {
  Card,
  Slider,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import useStyles from "./styles";
import categoryApi from "../../axios/categoryApi";

export const Filter = ({ getName, getPrice, getCategory }) => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState([30, 200]);
  const [category, setCategory] = useState("All Category");
  const [categories, setCategories] = useState([]);
  const handlePriceChange = (event, price) => {
    setPrice(price);
    getPrice(price);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    getCategory(e.target.value);
  };
  useEffect(() => {
    const fetchCategory = async () => {
      const response = await categoryApi.getAllSubCategory();
      await setCategories(response.data.data);
    };
    fetchCategory();
  }, []);
  return (
    <Card className={classes.filterContainer} elevation={10}>
      <form>
        <TextField
          id="standard-basic"
          placeholder="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchIcon onClick={() => getName(search)} cursor />
      </form>

      <h3>Filter</h3>
      <div className={classes.price}>
        <Typography id="range-slider" gutterBottom>
          Price :{price[0]}-{price[1]} $
        </Typography>
        <Slider
          value={price}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={30}
          max={300}
          aria-labelledby="range-slider"
        />
      </div>
      <InputLabel id="category">Category</InputLabel>
      <Select
        labelId="category"
        value={category}
        fullWidth
        onChange={handleCategoryChange}
      >
        <MenuItem value={"All Category"}>All Category</MenuItem>
        {categories.map((category) => {
          return <MenuItem value={category.id}>{category.name}</MenuItem>;
        })}
      </Select>
    </Card>
  );
};
