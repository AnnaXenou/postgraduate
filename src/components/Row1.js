import React from "react";
import {Button} from "react-bootstrap"
import axios from "axios";

const Row = ({ user, token }) => {
  const handleDelete = () => {
    axios
      .delete(`http://localhost:8080/api/user/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        window.location.reload();
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <tr>
      <td>{user.username}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.phoneNumber}</td>
      <td>{user.authorities[0].authority}</td>
      <td>
         <Button variant="secondary">Update</Button>
         <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </td>
    </tr>
  );
};

export default Row;