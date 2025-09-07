import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';

const API_URL = 'http://localhost:8000';

function DiseaseSurveillance() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/surveillance/cases`).then(response => {
      setCases(response.data);
    });
  }, []);

  return (
    <Container>
      <h1>Disease Surveillance & Alerts</h1>
      <Row>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Disease Hotspots</Card.Title>
              <MapContainer center={[10.8505, 76.2711]} zoom={7} style={{ height: '400px' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {cases.map(caseItem => (
                  <Marker key={caseItem.id} position={[caseItem.latitude, caseItem.longitude]}>
                    <Popup>
                      A case of {caseItem.disease.name} was reported here.
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Active Cases</Card.Title>
              <Card.Text>{cases.length}</Card.Text>
            </Card.Body>
          </Card>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Alerts</Card.Title>
              <ul>
                <li>High fever cases reported in Trivandrum.</li>
                <li>Dengue outbreak in Ernakulam.</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DiseaseSurveillance;
