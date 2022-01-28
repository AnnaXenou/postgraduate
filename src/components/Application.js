import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";

const Application = () => {
  const [studentId, setStudentId] = useState("");
  const [program, setProgram] = useState("");
  const [grade, setGrade] = useState("");
  const [professors, setProfessors] = useState("");
  const [master, setMaster] = useState("");
  const [selected, setSelected] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const token = useSelector((state) => state.persistedReducer.token.auth.token);

  const handlestudentId = (e) => {
    setStudentId(e.target.value);
  };

  const handleProgram = (e) => {
    setProgram(e.target.value);
  };

  const handleGrade = (e) => {
    setGrade(e.target.value);
  };

  const handleProfessors= (e) => {
    setProfessors(e.target.value);
  };

  const handleMaster= (e) => {
    setMaster(e.target.value);
  };

  const changeSelectOptionHandler = (event) => {
    if (event.target.value === "Business Information Systems") {
      setSelected("bis");
    } else if (event.target.value === "Data Science and Big Data") {
      setSelected("data");
    } else if (event.target.value === "Health Informatics") {
      setSelected("health");
    } else if (event.target.value === "IT Security") {
      setSelected("security");
    } else if (event.target.value === "Software Engineering") {
      setSelected("soft");
    } else if (event.target.value === "Choose...") {
      setSelected(null);
    }
    setSelectedOption(event.target.value);
  };

  const dataArray = [
    [
      "bis",
      "Management-Information Systems",
      "Supply Chain Management",
      "Information and Knowledge Strategy",
    ],
    [
      "data",
      "Big Data and A.I. Solutions",
      "Data Science",
      "Big Data Management",
      "Data Analytics and Information Systems Management",
    ],
    [
      "health",
      "MSc in Bioinformatics",
      "Health Technology Assessment",
      "Master of Digital Health",
      "Data Science for Health and Social Care",
    ],
    [
      "security",
      "IT Security Management",
      "Cybersecurity - Threats and Defenses",
      "Security in Computer Systems and Communications",
      "Ethical Hacking and Cyber Security",
    ],
    [
      "soft",
      "Computer Engineering",
      "Electrical and Computer Engineering",
      "Software Engineering",
    ],
  ];
  const handleSubmit = (e) => {
    if (studentId.length < 6) {
      alert("Student ID must be at least 7 characters long");
      return false;
    }
    if (program.length < 9) {
      alert("Program must be at least 10 characters long");
      return false;
    }
    axios
      .post("http://localhost:8080/api/applications/", {
        studentId: studentId,
        program: program,
        grade: grade,
        professors: professors,
        master: master,
      }, {headers: {
        
        Authorization: `Bearer ${token}`,
      }})
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        throw error;
      });
  };

  return (
    <div className="small-container">
      <h2 style={{ marginBottom: "20px" }}>Application for your Master</h2>
      <Form className="form-style" onSubmit={handleSubmit}>
        <Form.Group className="form-group">
          <Form.Label>Your ID</Form.Label>
          <Form.Control type="text" placeholder="ex: it111111" onChange={handlestudentId}/>
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label htmlFor="disabledSelect">Choose your major</Form.Label>
          <Form.Select onChange={changeSelectOptionHandler}>
            <option>Choose...</option>
            <option>Business Information Systems</option>
            <option>Data Science and Big Data</option>
            <option>Health Informatics</option>
            <option>IT Security</option>
            <option>Software Engineering</option>
          </Form.Select>
        </Form.Group>
        {selected && (
          <Form.Group>
            <Form.Label htmlFor="disabledSelect">
              Choose your major's field
            </Form.Label>
            <Form.Select onChange={handleMaster}>
              {dataArray.map((el, i) => {
                if (el[0] === selected) {
                  return el.map((l, j) => {
                    if (j != 0) {
                      return <option key={l[0]}>{l}</option>;
                    }
                  });
                }
              })}
            </Form.Select>
          </Form.Group>
        )}
        <Form.Group className="form-group">
          <Form.Label>Undergraduate studies</Form.Label>
          <Form.Control type="text" placeholder="ex: Informatics and Temelatics" onChange={handleProgram}/>
        </Form.Group>
        <Form.Group className="form-group"></Form.Group>
        <Form.Group className="form-group">
          <Form.Label>Grade</Form.Label>
          <Form.Control type="number" placeholder="Enter your grade" onChange={handleGrade} />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>Professors</Form.Label>
          <Form.Control type="text" placeholder="ex: Professor1, Professor2" onChange={handleProfessors} />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ marginTop: "7px" }}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Application;
