import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Community from "./pages/Community/Community";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import { Alert, Collapse, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import url from "./apiCalls/api";

function App() {
  const [alert, setAlert] = useState("true");
  const [severity, setSeverity] = useState("success");
  const [openAlert, setOpenAlert] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState({});
  if (openAlert === true) {
    setTimeout(() => {
      setOpenAlert(false);
    }, 5000);
  }
  useEffect(() => {
    fetchItem();
  }, []);
  // ----------------------------------------
  const fetchItem = () => {
    axios
      .get(url + "/shop/show/all")
      .then((res) => {
        // setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <BrowserRouter>
        <Navigation
          login={login}
          setLogin={setLogin}
          user={user}
          setUser={setUser}
          setAlert={setAlert}
          setOpenAlert={setOpenAlert}
          setSeverity={setSeverity}
        />
        {/* Alert Area */}
        <Collapse in={openAlert}>
          <Alert
            severity={severity}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenAlert(false);
                }}
              >
                <i className="fa fa-times"></i>
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {alert}
          </Alert>
        </Collapse>
        {/* App Structure */}
        <div className="App">
          <Routes>
            {/* Home */}
            <Route path="/" element={<Community user={user} />}></Route>
            <Route
              exact
              path="/login"
              element={
                <Login
                  setAlert={setAlert}
                  setOpenAlert={setOpenAlert}
                  setSeverity={setSeverity}
                  setLogin={setLogin}
                  setUser={setUser}
                  user={user}
                />
              }
            />
            <Route
              path="/register"
              element={
                <Register
                  setAlert={setAlert}
                  setOpenAlert={setOpenAlert}
                  setSeverity={setSeverity}
                />
              }
            ></Route>
            <Route path="*" element={<ErrorPage />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
