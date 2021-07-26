import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";
import authApi from "../../../axios/authApi";
import { useHistory } from "react-router";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RepeatOneSharp } from "@material-ui/icons";

const Register = ({ setIsLogin }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const classes = useStyles();
  const history = useHistory();
  if (localStorage.getItem("authenticated") === "true") {
    history.push("/");
  }
  const onSubmit = (data) => {
    handleRegister(data).then((response) => {
      if (response.errorCode === null) {
        setSuccess("Register successfully");
        setError("");
      } else if (response.errorCode === "USERNAME_NOT_AVAILABLE") {
        setError("Username is not available");
      } else if (response.errorCode === "EMAIL_NOT_AVAILABLE") {
        setError("Email is not available");
      }
    });
  };
  const handleRegister = async (data) => {
    const { username, email, password } = data;
    const response = await authApi.register({
      username: username,
      email: email,
      password: password,
    });
    return response.data;
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(8, "Username must be at least 8 characters")
      .max(16, "Username must not exceed 20 characters"),
    email: Yup.string()
      .required("Email is required")
      .min(6, "Email must be at least 6 characters")
      .max(25, "Email must not exceed 25 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(16, "Password must not exceed 16 characters"),
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
    <div className={classes.formRegister}>
      {error !== "" && <div className={classes.error}>*{error}</div>}
      {success !== "" && <div className={classes.success}>*{success}</div>}
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
        id="email"
        name="email"
        label="Email"
        fullWidth
        margin="dense"
        {...register("email")}
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
        <Button variant="contained" color="palette" onClick={setIsLogin}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default Register;
