import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link, useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import useStyles from "../utils/stylesLogin";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, controlLogin } from "../state/user";

export default function Login() {
  const user = useSelector((state) => state.users.allUser);

  const classes = useStyles();
  const [input, setInput] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(input))
      .then((res) => dispatch(controlLogin()))
      .then((res) => {
        if (res.payload) {
          alert("usuario logueado");
          history.push("/peliculas");
        } else {
          alert("usuario o contraseña invalidas ");
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />

        <Grid item xs={12} sm={8} md={5} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              logueate
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
                value={input.email}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                value={input.password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                ingresar
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/forgot">Olvidaste tu contraseña?</Link>
                </Grid>

                <Grid item>
                  <Link to="/register">{"No tienes cuenta? Registrate"}</Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
