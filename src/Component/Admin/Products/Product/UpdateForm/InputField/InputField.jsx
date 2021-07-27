import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";

// InputField.propTypes = {
//   form: PropTypes.object.isRequired,
//   name: PropTypes.string.isRequired,
//   label: PropTypes.string,
//   disabled: PropTypes.bool,
// };
const InputField = (props) => {
  const { name, label, form } = props;
  const { formState } = form;
  const hasError = formState.errors[name] && formState.touchedFiedls[name];
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          error={hasError}
          variant="outlined"
          margin="normal"
          helperText={formState.errors[name]?.message}
        />
      )}
    ></Controller>
  );
};

export default InputField;
