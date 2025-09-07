import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';

const API_URL = 'http://localhost:8000';

function MigrantProfile() {
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    gender: '',
    origin: '',
    language: '',
    migration_timeline: ''
  });

  useEffect(() => {
    // Assuming a migrant_id of 1 for now
    axios.get(`${API_URL}/migrants/1`).then(response => {
      if (response.data) {
        setProfile(response.data);
      }
    });
  }, []);

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

        <Button variant="primary" type="submit">
          Save Profile
        </Button>
      </Form>
    </Container>
  );
}

export default MigrantProfile;
