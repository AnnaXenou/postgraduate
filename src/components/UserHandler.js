import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import Row1 from "../components/Row1";
import TopNavbar from "./TopNavbar";

const UsersHandler = () => {
  const [users, setUsers] = useState({});
  const token = useSelector((state) => state.persistedReducer.token.auth.token);
  const auth = useSelector((state) => state.persistedReducer.token.auth.role);

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

  if (auth === "ADMIN") {
    if (users.length > 0) {
      return (
        <>
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
                return <Row1 user={user} token={token} />;
              })}
            </tbody>
          </Table>
        </>
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
