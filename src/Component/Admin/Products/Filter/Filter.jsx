import React, { useState, useEffect } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import SearchIcon from "@material-ui/icons/Search";
import {
  Button,
  Card,
  Slider,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import useStyles from "./styles";
import categoryApi from "../../../../axios/categoryApi";
export const Filter = ({
  openDialog,
  sortBy,
  getSize,
  getName,
  getCategory,
  closeAddForm,
}) => {
  const classes = useStyles();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Category");
  const [categories, setCategories] = useState([]);
  const handleCategoryChange = (e) => {
    getCategory(e.target.value);
    setCategory(e.target.value);
  };
  const handleAdd = () => {
    openDialog();
  };
  useEffect(() => {
    const fetchCategory = async () => {
      const response = await categoryApi.getAllSubCategory();
      await setCategories(response.data.data);
    };
    fetchCategory();
  }, []);
  return (
    <Card className={classes.filterContainer}>
      <form>
        <TextField
          id="standard-basic"
          placeholder="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchIcon onClick={() => getName(search)} cursor />
      </form>
      <FormControl component="fieldset" className={classes.sortForm}>
        <FormLabel component="legend">Sort by</FormLabel>
        <RadioGroup
          name="sort"
          onChange={(e) => sortBy(e.target.value)}
          defaultValue="id"
        >
          <FormControlLabel value="id" control={<Radio />} label="Id" />
          <FormControlLabel value="name" control={<Radio />} label="Name" />
          <FormControlLabel
            value="createdDate"
            control={<Radio />}
            label="Created Date"
          />
          <FormControlLabel
            value="modifiedDate"
            control={<Radio />}
            label="Modified Date"
          />
          <FormControlLabel
            value="category"
            control={<Radio />}
            label="Category"
          />
          <FormControlLabel value="retail" control={<Radio />} label="Retail" />
          <FormControlLabel value="price" control={<Radio />} label="Price" />
        </RadioGroup>
      </FormControl>
      <Typography gutterBottom>Display </Typography>
      <Slider
        defaultValue={12}
        getAriaValueText={(value) => getSize(value)}
        aria-labelledby="discrete-slider-small-steps"
        step={3}
        marks
        min={10}
        max={50}
        valueLabelDisplay="auto"
      />
      <h3>Filter</h3>

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
      <div className={classes.button}>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleAdd}
        >
          Add Product
        </Button>
      </div>
    </Card>
  );
};
