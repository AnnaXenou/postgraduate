import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../features/ds/tokenSlice";
import { setRole } from "../features/ds/tokenSlice";

const TopNavbar = () => {
  const auth = useSelector((state) => state.persistedReducer.token.auth.role);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    navigate("/login");
  }

  const handleLogout = () => {
    dispatch(setToken(""));
    dispatch(setRole(""));
    navigate("/login");
  }

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">Masters Applications</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          {auth === "USER" &&
            <Nav.Link href="/application">Apply</Nav.Link>
          }
          {auth === "ADMIN" &&
            <>
              <Nav.Link href="/admin">Create User</Nav.Link>
              <Nav.Link href="/users">All Users</Nav.Link>
            </> 
          }
             {auth === "SECRETARY" &&
            <>
              <Nav.Link href="/apps">Applications</Nav.Link>
            </> 
          }
          {auth === "PROFESSOR" &&
            <Nav.Link href="/apps">Applications</Nav.Link>
          }
        </Nav>
        <Nav>
          {auth ?
            <Button onClick={handleLogout} variant="danger">Logout</Button>
          :
            <Button onClick={handleLogin} variant="primary">Login</Button>
          }
        </Nav>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
