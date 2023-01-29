import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./Login.css";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import fetchMock from "fetch-mock";
import initFetchMock from "../MockApi/initFetchMock";
initFetchMock(fetchMock);

const theme = createTheme();

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  

  //Clear session storage when in login page
  useEffect(() => {
    window.sessionStorage.clear();
  }, []);

  // Submit 
  const handleSubmit = (e) => {
    e.preventDefault();
    let auth,
      username = state.username,
      password = state.password;

    // setting predifed auth token for "joshs" and "amyb"
    if (username === "joshs" && password === "joshs_pw") {
      auth = "am9zaHM6am9zaHNfcHc=";
    } else if (username === "amyb" && password === "amyb_pw") {
      auth = "YW15YjphbXliX3B3";
    } else {
      auth = "";
    }
    if (auth) {
      fetch("/login", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Basic " + auth,
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          navigate("/profile", { state: { token: data.sessionToken } });
        })
        .catch(() => {
          console.log("something bad happened "); // will log if error happens
        });
    } else {

      //if credentials are incorrect show error
      setError(
        "Your login credentials could not be verified, please try again."
      );
    }
  };

  //handling input(text field) values 
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
    //if input field is not empty
    setError("");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Clinical Portal Sign In
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <label>Username</label>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              name="username"
              onChange={handleChange}
              value={state.username}
              autoFocus
            />
            <label>Password</label>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              type="password"
              id="password"
              onChange={handleChange}
              value={state.password}
            />
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Login
            </Button>
          </Box>
          {error ? <p style={{ color: "red" }}>{error}</p> : null}
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default Login;
