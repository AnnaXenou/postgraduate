import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from 'react-redux'
import {setToken} from '../features/ds/tokenSlice'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
        password: password 
      })
      .then(function (response) {
        console.log(response.data.token);
        dispatch(setToken(response.data.token));
      })
      .catch(function (error) {
        throw error;
      });
  };
  return (
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
    </div>
  );
};

export default Login;