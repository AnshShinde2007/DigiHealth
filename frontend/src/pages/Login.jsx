import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function Login() {
  const { loginWithRedirect } = useAuth0();

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          <h1>Login</h1>
          <Form>
            <Form.Group controlId="formRole">
              <Form.Label>Select Role</Form.Label>
              <Form.Control as="select">
                <option>Migrant</option>
                <option>Health Worker</option>
                <option>Admin</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" onClick={() => loginWithRedirect()}>
              Log In
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;