import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import useStyles from "./styles";
import authApi from "../../../axios/authApi";

const Login = ({ closeModal }) => {
  const classes = useStyles();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    login().then((data) => {
      if (data.data == null) {
        setError(true);
      } else {
        closeModal(true);
        localStorage.setItem("username", data.data.username);
        localStorage.setItem("avatar", data.data.avatar);
        localStorage.setItem("userId", data.data.userId);
        localStorage.setItem("jwtToken", data.data.jwt);
      }
    });
  };

  const login = async () => {
    const response = await authApi.login({
      username: username,
      password: password,
    });

    return response.data;
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography variant="h5">Log in</Typography>
          {error && <div>Wrong usename or password</div>}
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              autoComplete="off"
              label="username"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              name="password"
              label="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={classes.buttonContainer}>
              <Button
                type="submit"
                variant="contained"
                className={classes.submit}
              >
                Log in
              </Button>
            </div>

            <Grid container className={classes.bottomForm}>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Login;
