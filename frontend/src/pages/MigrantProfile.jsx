import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button, Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const MigrantProfile = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    age: '30',
    gender: 'Male',
    origin: 'Syria',
    language: 'Arabic',
    migration_timeline: 'Fled home country in 2021, arrived in this country in 2022.'
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_URL}/migrants/`, profile)
      .then(response => {
        console.log("Profile saved:", response.data);
      })
      .catch(error => {
        console.error("Error saving profile:", error);
      });
  };

  return (
    <Container className="my-5">
      <h1 className="mb-4">Migrant Profile Management</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                name="name" 
                value={profile.name} 
                onChange={handleChange} 
                placeholder="Enter name" 
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control 
                type="number" 
                name="age" 
                value={profile.age} 
                onChange={handleChange} 
                placeholder="Enter age" 
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control 
                as="select" 
                name="gender" 
                value={profile.gender} 
                onChange={handleChange}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formOrigin">
              <Form.Label>Origin</Form.Label>
              <Form.Control 
                type="text" 
                name="origin" 
                value={profile.origin} 
                onChange={handleChange} 
                placeholder="Enter origin country" 
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formLanguage">
              <Form.Label>Language</Form.Label>
              <Form.Control 
                type="text" 
                name="language" 
                value={profile.language} 
                onChange={handleChange} 
                placeholder="Enter language" 
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Tabs Section */}
        <Tabs defaultActiveKey="health-history" className="mt-4">
          <Tab eventKey="health-history" title="Health History">
            <Form.Group controlId="formMigrationTimeline" className="mt-3">
              <Form.Label>Migration Timeline</Form.Label>
              <Form.Control 
                as="textarea" 
                name="migration_timeline" 
                value={profile.migration_timeline} 
                onChange={handleChange} 
                rows={3} 
              />
            </Form.Group>
          </Tab>
          <Tab eventKey="vaccinations" title="Vaccinations">
            <p className="mt-3">Vaccination and medical history will go here.</p>
          </Tab>
        </Tabs>

        {/* Notes */}
        <Form.Group controlId="formNotes" className="mt-4">
          <Form.Label>Notes and Symptom Entry</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Enter additional notes..." />
        </Form.Group>

        {/* Actions */}
        <div className="d-flex justify-content-end mt-4">
          <Button type="submit" variant="primary">
            Save Profile
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default MigrantProfile;
