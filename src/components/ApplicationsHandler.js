import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import Row from "./Row";
import { useSelector } from "react-redux";
import TopNavbar from "./TopNavbar";

const ApplicationsHandler = () => {
  const [applications, setApplications] = useState({});
  const token = useSelector((state) => state.persistedReducer.token.auth.token);
  const auth = useSelector((state) => state.persistedReducer.token.auth.role);

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

  if (auth === "SECRETARY" || auth === "PROFESSOR") {
    if (applications.length > 0) {
      return (
        <>
          <TopNavbar />
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
        </>
      );
    } else {
      return (
        <>
        <TopNavbar/>
        <div>No apps available</div>
        </>
      );
    }
  } else {
    return (
      <>
      <TopNavbar/>
      <div>You shall not pass</div>
      </>
    );
  }
};

export default ApplicationsHandler;
