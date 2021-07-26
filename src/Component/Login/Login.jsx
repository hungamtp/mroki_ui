import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import useStyles from "./styles";
import authApi from "../../axios/authApi";
import { useHistory } from "react-router";
import * as Yup from "yup";
import Register from "./Register/Register";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const Login = ({ getAuthenticated }) => {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const history = useHistory();

  if (localStorage.getItem("authenticated") === "true") {
    history.push("/");
  }
  const handleRegister = () => {
    setIsSignUp(true);
  };
  const setIsLogin = () => {
    setIsSignUp(false);
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
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data) => {
    login(data).then((response) => {
      if (response.errorCode === null) {
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("avatar", response.data.avatar);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("jwtToken", response.data.jwt);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("authenticated", true);
        getAuthenticated();
        history.push("/");
      } else {
        setError(true);
      }
    });
  };

  const login = async (data) => {
    const { username, password } = data;
    const response = await authApi.login({
      username: username,
      password: password,
    });

    return response.data;
  };

  return (
    <Container className={classes.container} maxWidth="lg">
      <Grid container justify="center" spacing={4}>
        <Grid item xs={0} sm={8} md={8}></Grid>
        <Grid item xs={12} sm={4} md={4}>
          {!isSignUp ? (
            <div className={classes.formLogin}>
              {error && <div>Wrong username or password</div>}
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
              <Typography variant="inherit" color="textSecondary">
                {errors.username?.message}
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
              <div className={classes.buttonLogin}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleSubmit(onSubmit)}
                >
                  Login
                </Button>
              </div>
              <hr />
              <div className={classes.registerButton}>
                <Button
                  variant="contained"
                  color="palette"
                  onClick={handleRegister}
                >
                  Register
                </Button>
              </div>
            </div>
          ) : (
            <Register setIsLogin={setIsLogin} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
