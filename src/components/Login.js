import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../features/ds/tokenSlice";
import { setRole } from "../features/ds/tokenSlice";
import { useNavigate } from "react-router-dom";
import TopNavbar from "./TopNavbar";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentToken, setCurrentToken] = useState("");
  const [hasError, setHasError] = useState(false);
  const dispatch = useDispatch();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    if (username.length < 4) {
      alert("Username must be at least 5 characters long");
      return false;
    }
    if (password.length < 4) {
      alert("Password must be at least 5 characters long");
      return false;
    }
    axios
      .post("http://localhost:8080/api/v1/auth/login", {
        userName: username,
        password: password,
      })
      .then(function (response) {
        console.log(response.data.token);
        setCurrentToken(response.data.token);
        dispatch(setToken(response.data.token));
        setHasError(false);
        navigate("/");
      })
      .catch(function (error) {
        setHasError(true);
        throw error;
      });
    e.preventDefault();
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/auth/userinfo", {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      })
      .then(function (response) {
        console.log(response.data.roles[0].roleCode);
        dispatch(setRole(response.data.roles[0].roleCode));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [currentToken]);

  return (
    <>
      <TopNavbar/>
      <div className="small-container">
        <Form className="form-style" onSubmit={handleSubmit}>
          <h2 style={{ marginBottom: "20px" }}>Login</h2>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onChange={handleUsername}
          />
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={handlePassword}
          />
          <Button variant="primary" type="submit" style={{ marginTop: "7px" }}>
            Submit
          </Button>
        </Form>
        {hasError && <div>Wrong username or password!</div>}
      </div>
    </>
  );
};

export default Login;
