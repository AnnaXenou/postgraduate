import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import Row1 from "../components/Row1";

const UsersHandler = () => {
  const [users, setUsers] = useState({});
  const token = useSelector((state) => state.persistedReducer.token.auth.token); 

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

  if (users.length > 0) {
    return (
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
                <Row1 user={user} token={token}/>
            )
          })}
        </tbody>
      </Table>
    );
  } else {
    return <div>No users available</div>;
  }
};

export default UsersHandler;
