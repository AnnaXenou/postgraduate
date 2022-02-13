import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import Row1 from "../components/Row1";
import TopNavbar from "./TopNavbar";

const UsersHandler = () => {
  const [users, setUsers] = useState({});
  const token = useSelector((state) => state.persistedReducer.token.auth.token);
  const auth = useSelector((state) => state.persistedReducer.token.auth.role);
  const [selectedUser, setSelectedUser] = useState({});
  const [show, setShow] = useState(false);
  const [userRole, setUserRole] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setSelectedUser(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleRoleChange = (e) => {
    setUserRole(e.target.value.toLowerCase());
  }

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setUsers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleUpdate = (e) => {
    axios
      .put(
        `http://localhost:8080/api/user/${selectedUser.id}`,
        {
          userName: selectedUser.userName,
          password: selectedUser.password,
          auth: userRole,
          firstName: selectedUser.firstName,
          lastName: selectedUser.lastName,
          email: selectedUser.email,
          phoneNumber: selectedUser.phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        window.location.reload();
      })
      .catch(function (error) {
        throw error;
      });
  };

  if (auth === "ADMIN") {
    if (users.length > 0) {
      return (
        <div className="opacity-change">
          <TopNavbar />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone number</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => {
                return (
                  <Row1
                    key={user.id}
                    user={user}
                    token={token}
                    setSelectedUser={setSelectedUser}
                    handleShow={handleShow}
                  />
                );
              })}
            </tbody>
          </Table>
          <>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Update User</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="form-group">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="userName"
                      placeholder="Enter username"
                      value={selectedUser.userName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={selectedUser.password}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      placeholder="Enter Firstname"
                      value={selectedUser.firstName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      placeholder="Enter Lastname"
                      value={selectedUser.lastName}
                      onChange={handleChange}
                    />
                    <Form.Group className="form-group">
                      <Form.Label htmlFor="disabledSelect">Role</Form.Label>
                      <Form.Select onChange={handleRoleChange}>
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
                      name="email"
                      placeholder="Enter email"
                      value={selectedUser.email}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="number"
                      name="phoneNumber"
                      placeholder="Enter your phone number"
                      value={selectedUser.phoneNumber}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleUpdate}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        </div>
      );
    } else {
      return (
        <>
          <TopNavbar />
          <div>No users available</div>
        </>
      );
    }
  } else {
    return (
      <>
        <TopNavbar />
        <div>You shall not pass</div>
      </>
    );
  }
};

export default UsersHandler;
