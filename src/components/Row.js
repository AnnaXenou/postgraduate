import React from "react";
import {Button} from "react-bootstrap"
import axios from "axios";
import { useSelector } from "react-redux";

const Row = ({ app, token }) => {

  const auth = useSelector((state) => state.persistedReducer.token.auth.role);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8080/api/applications/${app.id}`, {
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
      <td>{app.studentId}</td>
      <td>{app.program}</td>
      <td>{app.grade}</td>
      <td>{app.professors}</td>
      <td>{app.master}</td>
      {auth === "SECRETARY" && 
        <td>
          <Button variant="danger" onClick={handleDelete}>Reject</Button>
        </td>
      }
    </tr>
  );
};

export default Row;
