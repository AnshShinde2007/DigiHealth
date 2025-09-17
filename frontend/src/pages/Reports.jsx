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
          <div style={{ height: '300px', backgroundColor: '#f0f0f0', padding: '20px' }}>
            <h4>Summary of Health Outcomes Report (Dummy Data)</h4>
            <p><strong>Total Patients:</strong> 500</p>
            <p><strong>Patients with Improved Health:</strong> 350 (70%)</p>
            <p><strong>Patients with Stable Health:</strong> 100 (20%)</p>
            <p><strong>Patients with Deteriorated Health:</strong> 50 (10%)</p>
            <p><strong>Key Findings:</strong></p>
            <ul>
              <li>Common ailments: Respiratory infections (30%), Malnutrition (25%), Waterborne diseases (15%).</li>
              <li>Intervention success rate: 85% for respiratory infections, 60% for malnutrition.</li>
              <li>Geographical areas with highest health improvements: North district.</li>
            </ul>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Reports;