import React from 'react';
import { Container, Button, Card, Form } from 'react-bootstrap';

function Reports() {
  return (
    <Container>
      <h1>Reports & Analytics</h1>
      <Form>
        <Form.Group controlId="formReportType">
          <Form.Label>Select Report Type</Form.Label>
          <Form.Control as="select">
            <option>Health Outcomes</option>
            <option>Disease Trends</option>
            <option>Demographics</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" className="mb-3">
          Download CSV
        </Button>
        <Button variant="secondary" className="mb-3 ml-2">
          Download PDF
        </Button>
      </Form>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>Health Outcomes Graph</Card.Title>
          {/* Placeholder for graph */}
          <div style={{ height: '300px', backgroundColor: '#f0f0f0' }}>
            Graph will be here
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Reports;