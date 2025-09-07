import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function Registration() {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          <h1>Registration</h1>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label>Select Role</Form.Label>
              <Form.Control as="select">
                <option>Migrant</option>
                <option>Health Worker</option>
                <option>Admin</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Registration;