
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <div>
      
        <h1>Welcome to DigiHealth</h1>
        <p>A Digital Health Record Management System for migrant workers in Kerala.</p>
      
      <Container>
        <Row className="justify-content-md-center">
          <Col md="6">
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Search for a patient..." />
              </Form.Group>
              <Button variant="primary" type="submit">
                Search
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
