import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navigation.css";
import { Cloud, LogoutRounded } from "@mui/icons-material";

// ------------------------------------------------------

const Navigation = ({
  login,
  setLogin,
  user,
  setUser,
  setAlert,
  setOpenAlert,
  setSeverity,
}) => {
  // const isShelter = user ? (user.isShelter ? true : false) : false;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const Navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setLogin(false);
    // setCart([]);
    setUser({});
    handleClose();
    Navigate("/login");
    setAlert("You have been Logged out");
    setSeverity("success");
    setOpenAlert(true);
  };
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const activeClassName = "is-active";

  // var cartCount = cart && cart.products ? cart.products.length : 0;
  // console.log(cart.products ? cart.products.length : 0);
  return (
    <nav className="nav-bar">
      <div className="nav-logo">
        {/* <img src={Logo} alt="" /> */}
        <Box
          sx={{
            fontSize: 20,
            fontWeight: 700,
            color: "#e92e4a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Cloud sx={{ mr: 1 }} />
          COMMUNITY.PK
        </Box>
      </div>
      <div className="nav">
        <div className="nav-links">
          <NavLink
            exact={true}
            to="/"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            Home
          </NavLink>
        </div>
        <Box
          className="auth_links"
          sx={{
            display: "flex",
            aliginItems: "center",
            justifyContent: "center",
            // p: 1,
          }}
        >
          {login ? (
            <>
              <Tooltip title="User Account Area">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar
                    sx={{ width: 30, height: 30, backgroundColor: "white" }}
                  >
                    <img src={user.Image} alt="" style={{ height: 30 }} />
                  </Avatar>
                </IconButton>
              </Tooltip>
              <div className="nav-menu">
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleLogout} sx={style}>
                    <LogoutRounded sx={{ mr: 1, color: "#e92e4a" }} />
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? activeClassName : undefined
                }
              >
                Login
              </NavLink>{" "}
              |{" "}
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? activeClassName : undefined
                }
              >
                Register
              </NavLink>
            </>
          )}
        </Box>
      </div>
    </nav>
  );
};

export default Navigation;
