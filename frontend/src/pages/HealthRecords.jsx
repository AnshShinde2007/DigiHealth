import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

const API_URL = 'http://localhost:8000';

function HealthRecords() {
  const [records, setRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newRecord, setNewRecord] = useState({
    date: '',
    symptoms: '',
    diagnostics: ''
  });

  useEffect(() => {
    // Assuming a migrant_id of 1 for now
    axios.get(`${API_URL}/health-records/1`).then(response => {
      setRecords(response.data);
    });
  }, []);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    setNewRecord({ ...newRecord, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_URL}/health-records/`, { ...newRecord, migrant_id: 1 }).then(response => {
      setRecords([...records, response.data]);
      handleClose();
    });
  };

  return (
    <Container>
      <h1>Health Records</h1>
      <Button variant="primary" className="mb-3" onClick={handleShow}>
        Add New Record
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Symptoms</th>
            <th>Diagnostics</th>
          </tr>
        </thead>
        <tbody>
          {records.map(record => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.date}</td>
              <td>{record.symptoms}</td>
              <td>{record.diagnostics}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Health Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" name="date" onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formSymptoms">
              <Form.Label>Symptoms</Form.Label>
              <Form.Control type="text" name="symptoms" onChange={handleChange} placeholder="Enter symptoms" />
            </Form.Group>
            <Form.Group controlId="formDiagnostics">
              <Form.Label>Diagnostics</Form.Label>
              <Form.Control type="text" name="diagnostics" onChange={handleChange} placeholder="Enter diagnostics" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Record
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default HealthRecords;
