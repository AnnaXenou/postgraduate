import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import TopNavbar from "./TopNavbar";

const Admin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const token = useSelector((state) => state.persistedReducer.token.auth.token);
  const auth = useSelector((state) => state.persistedReducer.token.auth.role);

  const changeSelectOptionHandler = (event) => {
    if (event.target.value === "User") {
      setRole("user");
    } else if (event.target.value === "Secretary") {
      setRole("secretary");
    } else if (event.target.value === "Professor") {
      setRole("professor");
    } else if (event.target.value === "Choose...") {
      setRole(null);
    }
    setSelectedOption(event.target.value);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
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
    if (firstname.length < 3) {
      alert("First name must be at least 4 characters long");
      return false;
    }
    if (lastname.length < 3) {
      alert("Last name must be at least 4 characters long");
      return false;
    }
    if (email.includes("@")) {
    } else {
      alert("Invalid form of email");
      return false;
    }
    if (phonenumber.length == 10) {
    } else {
      alert("Phone number must be 10 characters long");
      return false;
    }

    axios
      .post(
        "http://localhost:8080/api/user/add",
        {
          userName: username,
          password: password,
          auth: role,
          firstName: firstname,
          lastName: lastname,
          email: email,
          phoneNumber: phonenumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        throw error;
      });
  };

  if (auth === "ADMIN") {
    return (
      <>
        <TopNavbar/>
        <div className="small-container">
          <Form className="form-style" onSubmit={handleSubmit}>
            <h2 style={{ marginBottom: "20px" }}>Add User</h2>
            <Form.Group className="form-group">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                onChange={handleUsername}
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={handlePassword}
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Firstname"
                onChange={handleFirstName}
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Lastname"
                onChange={handleLastName}
              />
              <Form.Group className="form-group">
                <Form.Label htmlFor="disabledSelect">Role</Form.Label>
                <Form.Select onChange={changeSelectOptionHandler}>
                  <option>Choose...</option>
                  <option>User</option>
                  <option>Secretary</option>
                  <option>Professor</option>
                </Form.Select>
              </Form.Group>
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                onChange={handleEmail}
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your phone number"
                onChange={handlePhoneNumber}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={{ marginTop: "7px" }}
            >
              Submit
            </Button>
          </Form>
        </div>
      </>
    );
  } else {
    return (
      <>
        <TopNavbar/>
        <div>You shall not pass!</div>
      </>
    );
  }
};

export default Admin;
