import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import NativeSelect from "@material-ui/core/NativeSelect";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../state/user";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Link, useHistory } from "react-router-dom";
import useStyles from "../utils/stylesRegister";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

const User = () => {
  const history = useHistory();
  const classes = useStyles();

  const [input, setInput] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await dispatch(registerUser(input));
      const { payload } = res;

      return history.push("/"); //REDIRECCIONO AL LOGIN
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div style={{ paddingTop: "2rem" }}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Registro
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="Nombre"
                    autoFocus
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    name="lastName"
                    fullWidth
                    id="lastName"
                    label="Apellido"
                    name="lastName"
                    autoComplete="lname"
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Registrarse
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to="/">Ya tienes una cuenta? Logueate.</Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </div>
    </>
  );
};
export default User;
