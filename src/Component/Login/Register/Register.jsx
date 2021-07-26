import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import useStyles from "./styles";

import { useHistory } from "react-router";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const Register = ({ setIsLogin }) => {
  const classes = useStyles();
  const onSubmit = (data) => {
    console.log(data);
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(8, "Username must be at least 8 characters")
      .max(16, "Username must not exceed 20 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(16, "Password must not exceed 40 characters"),
    email: Yup.string()
      .required("Email is required")
      .min(6, "Email must be at least 6 characters")
      .max(16, "Email must not exceed 40 characters"),
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  return (
    <div className={classes.formLogin}>
      <TextField
        required
        id="username"
        name="username"
        label="Username"
        fullWidth
        margin="dense"
        {...register("username")}
        error={errors.username ? true : false}
      />
      <TextField
        required
        id="username"
        name="username"
        label="Username"
        fullWidth
        margin="dense"
        {...register("username")}
        error={errors.email ? true : false}
      />
      <Typography variant="inherit" color="textSecondary">
        {errors.email?.message}
      </Typography>
      <TextField
        required
        id="password"
        name="password"
        label="Password"
        type="password"
        fullWidth
        margin="dense"
        {...register("password")}
        error={errors.password ? true : false}
      />
      <Typography variant="inherit" color="textSecondary">
        {errors.password?.message}
      </Typography>
      <div className={classes.button}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit(onSubmit)}
        >
          Register
        </Button>
      </div>
      <hr />
      <div className={classes.registerButton}>
        <Button variant="contained" color="palette" onCLick={setIsLogin}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default Register;
