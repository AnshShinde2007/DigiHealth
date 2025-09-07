
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, ProgressBar } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

function Home() {
  const [migrantsCount, setMigrantsCount] = useState(0);
  const [activeCases, setActiveCases] = useState(0);
  const [sdgProgress, setSdgProgress] = useState(0);

  useEffect(() => {
    axios.get(`${API_URL}/migrants/count`).then(response => {
      setMigrantsCount(response.data.count);
    });
    axios.get(`${API_URL}/cases/active-count`).then(response => {
      setActiveCases(response.data.count);
    });
    axios.get(`${API_URL}/sdg/progress/overall`).then(response => {
      setSdgProgress(response.data.progress);
    });
  }, []);

  return (
    <div>
      <div className="p-5 mb-4 bg-light rounded-3 text-center">
        <h1>Welcome to DigiHealth</h1>
        <p>A Digital Health Record Management System for migrant workers in Kerala.</p>
      </div>

      <Container>
        <Row className="justify-content-md-center">
          <Col md="6">
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Search for a migrant..." />
              </Form.Group>
              <Button variant="primary" type="submit">
                Search
              </Button>
            </Form>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Total Migrants</Card.Title>
                <Card.Text>{migrantsCount}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Active Cases</Card.Title>
                <Card.Text>{activeCases}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>SDG Progress</Card.Title>
                <ProgressBar now={sdgProgress} label={`${sdgProgress.toFixed(2)}%`} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
