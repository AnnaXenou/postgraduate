import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import Row from "./Row";
import { useSelector } from "react-redux";

const ApplicationsHandler = () => {
  const [applications, setApplications] = useState({});
  const token = useSelector((state) => state.persistedReducer.token.auth.token); 

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/applications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response.data);
        setApplications(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  if (applications.length > 0) {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Program</th>
            <th>Grade</th>
            <th>Professors</th>
            <th>Master</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, i) => {
            return <Row app={app} token={token} />;
          })}
        </tbody>
      </Table>
    );
  } else {
    return <div>No apps available</div>;
  }
};

export default ApplicationsHandler;
