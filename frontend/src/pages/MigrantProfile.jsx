
import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button, Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';
const MigrantProfile = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    age: '30',
    gender: 'Male',
    origin: 'Syria',
    language: 'Arabic',
    migration_timeline: 'Fled home country in 2021, arrived in this country in 2022.'
  });
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Migrant Profile Management</h1>

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_URL}/migrants/`, profile).then(response => {
      console.log(response.data);
    });
  };

  return (
    <Container>
      <h1>Migrant Profile</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={profile.name} onChange={handleChange} placeholder="Enter name" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control type="number" name="age" value={profile.age} onChange={handleChange} placeholder="Enter age" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control as="select" name="gender" value={profile.gender} onChange={handleChange}>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formOrigin">
              <Form.Label>Origin</Form.Label>
              <Form.Control type="text" name="origin" value={profile.origin} onChange={handleChange} placeholder="Enter origin country" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formLanguage">
              <Form.Label>Language</Form.Label>
              <Form.Control type="text" name="language" value={profile.language} onChange={handleChange} placeholder="Enter language" />
            </Form.Group>
          </Col>
        </Row>

        <Tabs defaultActiveKey="health-history" className="mt-4">
          <Tab eventKey="health-history" title="Health History">
            <Form.Group controlId="formMigrationTimeline">
              <Form.Label>Migration Timeline</Form.Label>
              <Form.Control as="textarea" name="migration_timeline" value={profile.migration_timeline} onChange={handleChange} rows={3} />
            </Form.Group>
          </Tab>
          <Tab eventKey="vaccinations" title="Vaccinations">
            {/* Vaccination and medical history tabs */}
          </Tab>
        </Tabs>

        <Form.Group controlId="formNotes">
          <Form.Label>Notes and Symptom Entry</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <button className="bg-blue-500"></button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Save Profile
        </Button>
      </Form>
    </Container>
  );
}

export default MigrantProfile;
