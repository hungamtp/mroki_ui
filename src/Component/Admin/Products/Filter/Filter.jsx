import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Button } from "@material-ui/core";
import useStyles from "./styles";

export const Filter = ({ openDialog }) => {
  const [value, setValue] = React.useState("female");

  const classes = useStyles();
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleAdd = () => {
    openDialog();
  };

  return (
    <>
      <FormControl component="fieldset" className={classes.sortForm}>
        <FormLabel component="legend">Sort by</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="id" control={<Radio />} label="Id" />
          <FormControlLabel value="name" control={<Radio />} label="Male" />
          <FormControlLabel
            value="createdDate"
            control={<Radio />}
            label="Created Date"
          />
          <FormControlLabel
            value="disabled"
            disabled
            control={<Radio />}
            label="(Disabled option)"
          />
        </RadioGroup>
      </FormControl>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={handleAdd}
      >
        Add Product
      </Button>
    </>
  );
};
