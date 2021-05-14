import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../state/user";
import useStyles from "../utils/stylesNavbar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Menu, MenuItem } from "@material-ui/core";
import MoreIcon from "@material-ui/icons/MoreVert";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const classes = useStyles();
  const history = useHistory();

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.users.control);

  const logoutUser = () => {
    localStorage.removeItem("token");
    handleMobileMenuClose();
    dispatch(logout()) && history.push("/");
  };
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        ></IconButton>
      </MenuItem>

      {!token ? (
        <>
          <MenuItem>
            <Link
              to="/register"
              style={{ color: "inherit" }}
              onClick={handleMobileMenuClose}
            >
              <Button color="inherit">Register</Button>
            </Link>
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem>
            <Button color="inherit" onClick={logoutUser}>
              Logout
            </Button>
          </MenuItem>
        </>
      )}
    </Menu>
  );

  const menuId = "primary-search-account-menu";

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes}>
        <Toolbar>
          <Typography variant="h5" className={classes.title}></Typography>
          <div className={classes.sectionDesktop}>
            {!token ? (
              <>
                <Typography variant="h5" className={classes.title}>
                  Bienvendido ingresa para disfrutar
                </Typography>
                <Link to="/register" style={{ color: "inherit" }}>
                  <Button color="inherit">Register</Button>
                </Link>
              </>
            ) : (
              <>
                <Typography variant="h5" className={classes.title}>
                  {user ? `Hola ${user.firstName}` : null}
                </Typography>
                <Button color="inherit" onClick={logoutUser}>
                  Logout
                </Button>
              </>
            )}
          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            ></IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
};
export default Navbar;
