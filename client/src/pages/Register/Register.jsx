import {
  Box,
  Button,
  CircularProgress,
  Divider,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import url from "../../apiCalls/api";

const Register = ({ setAlert, setOpenAlert, setSeverity, setUserDetails }) => {
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const [values, setvalues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  // const [disabled, setDisabled] = useState(true);
  const [fName, setFname] = useState({ error: false, helperText: "" });
  const [lName, setLname] = useState({ error: false, helperText: "" });
  const [mail, setMail] = useState({ error: false, helperText: "" });
  const [pass, setPass] = useState({
    error: false,
    helperText:
      "Password must contain 8-digit and Should be Alpha-Numeric and must contain one of following special Character (!@#$%^&*-_.)",
  });
  const [rePass, setRePass] = useState({ error: false, helperText: "" });

  const { firstName, lastName, email, password, repassword } = values;

  const isFirstNameValid = () => {
    var re = /^[A-Za-z]+$/;
    return re.test(values.firstName);
  };
  const isLastNameValid = () => {
    var re = /^[A-Za-z]+$/;
    return re.test(values.lastName);
  };
  const isPasswordValid = () => {
    var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-_.]).{8,}$/;
    return re.test(values.password);
  };

  const handleChange = (value) => (e) => {
    setvalues({ ...values, [value]: e.target.value });
    if (fName.error && values[value].length > 2 && value === "firstName") {
      setFname({ error: false, helperText: "" });
    }
    if (lName.error && values[value].length > 2 && value === "lastName") {
      setLname({ error: false, helperText: "" });
    }
    if (mail.error && value === "email" && isEmailValid() === true) {
      setMail({ error: false, helperText: "" });
    }
    if (pass.error && value === "password" && values[value].length >= 8) {
      setPass({
        error: false,
        helperText:
          "Password must contain 8-digit and Should be Alpha-Numeric and must contain one of following special Character (!@#$%^&*-_.)",
      });
    }
    if (
      rePass.error &&
      value === "repassword" &&
      values.repassword === values.password
    ) {
      setRePass({ error: false, helperText: "" });
    }
  };
  const onBlur = (value) => (e) => {};

  const isEmailValid = () => {
    if (values.email.match(/^[\w-]+@([\w-]+\.)+[\w-]+$/g)) {
      return true;
    }
    return false;
  };

  const register = () => {
    if (
      (!fName.error && values.firstName.length <= 2) ||
      isFirstNameValid() === false
    ) {
      setFname({
        error: true,
        helperText: "Invalid First Name",
      });
      return false;
    } else if (
      (!lName.error && values.lastName.length <= 2) ||
      isLastNameValid() === false
    ) {
      setLname({ error: true, helperText: "Invalid Last Name" });
      return false;
    } else if (!mail.error && isEmailValid() === false) {
      setMail({ error: true, helperText: "Please Enter a valid Email." });
      return false;
    } else if (
      (!pass.error && values.password.length < 8) ||
      isPasswordValid() === false
    ) {
      setPass({
        error: true,
        helperText:
          "Password must contain 8-digit and Should be Alpha-Numeric and must contain one of following special Character (!@#$%^&*-_.)",
      });
      return false;
    } else if (!rePass.error && values.repassword !== values.password) {
      setRePass({ error: true, helperText: "Password donot match." });
      return false;
    } else {
      const { firstName, lastName, email, password, repassword } = values;
      if (
        firstName &&
        lastName &&
        email &&
        password &&
        password === repassword
      ) {
        setLoading(true);
        axios
          .post(url + "/auth/create", values)
          .then((res) => {
            console.log(res.data);
            if (res.data.status === "success") {
              setAlert("Registered Successfully");
              setSeverity("success");
              Navigate("/login");
              setLoading(false);
            } else if (res.data.status === "failed") {
              setAlert(res.data.message);
              setSeverity("error");
              setLoading(false);
            }
            setOpenAlert(true);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      } else {
        setAlert("Please Enter Required details");
        setSeverity("error");
        setOpenAlert(true);
        setLoading(false);
      }
    }
  };
  return (
    <div className="register-form">
      <div className="register">
        <h1>SIGN UP</h1>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            name="firstName"
            label="First Name"
            variant="standard"
            type="text"
            color="success"
            onChange={handleChange("firstName")}
            onBlur={onBlur("firstName")}
            error={fName.error}
            helperText={fName.helperText}
            value={firstName}
            required
            sx={{ width: "40%", m: 1, ml: 0 }}
          />
          <TextField
            name="lastName"
            label="Last Name"
            variant="standard"
            type="text"
            color="success"
            onChange={handleChange("lastName")}
            value={lastName}
            onBlur={onBlur("lastName")}
            error={lName.error}
            helperText={lName.helperText}
            required
            sx={{ width: "40%", m: 1, mr: 0 }}
          />

          <TextField
            name="email"
            label="Email"
            variant="standard"
            color="success"
            type="email"
            onChange={handleChange("email")}
            value={email}
            onBlur={onBlur("email")}
            error={mail.error}
            helperText={mail.helperText}
            required
            sx={{ width: "84%", m: 1 }}
          />
          <div className="pass-field">
            <TextField
              name="password"
              label="Password"
              variant="standard"
              type={showPassword ? "text" : "password"}
              color="success"
              onChange={handleChange("password")}
              value={password}
              onBlur={onBlur("password")}
              error={pass.error}
              helperText={pass.helperText.toLowerCase()}
              sx={{ width: "84%", m: 1 }}
            />
            <i
              className={
                showPassword ? "fa showPass fa-eye" : "fa showPass fa-eye-slash"
              }
              onClick={() => setShowPassword((s) => !s)}
            ></i>
          </div>
          <TextField
            name="repassword"
            label="Re-Enter Password"
            variant="standard"
            type={showPassword ? "text" : "password"}
            color="success"
            onChange={handleChange("repassword")}
            value={repassword}
            onBlur={onBlur("repassword")}
            error={rePass.error}
            helperText={rePass.helperText}
            sx={{ width: "84%", m: 1 }}
          />
        </Box>
        <Button
          // className="button"
          color="success"
          // fullWidth
          variant="contained"
          sx={{ width: "84%", m: 1 }}
          onClick={register}
          disabled={loading}
        >
          {loading ? <CircularProgress color="success" /> : "SIGN UP"}
        </Button>
        <Divider sx={{ width: 415, m: 1 }}>OR</Divider>
        <div className="toLogin">
          Already Have an Account? <Link to="/login">Login Here</Link>
        </div>
      </div>
      {/* <button onClick={isNameValid}>Click Me</button> */}
    </div>
  );
};

export default Register;
