import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Card, ProgressBar } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import home from '../assets/home.jpg';

// API base URL (adjust as per your backend setup)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function Home() {
  const [migrantsCount, setMigrantsCount] = useState(0);
  const [activeCases, setActiveCases] = useState(0);
  const [sdgProgress, setSdgProgress] = useState(0);

  useEffect(() => {
    axios.get(`${API_URL}/migrants/count`).then(response => {
      setMigrantsCount(response.data.count);
    }).catch(err => console.error(err));

    axios.get(`${API_URL}/cases/active-count`).then(response => {
      setActiveCases(response.data.count);
    }).catch(err => console.error(err));

    axios.get(`${API_URL}/sdg/progress/overall`).then(response => {
      setSdgProgress(response.data.progress);
    }).catch(err => console.error(err));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <Container>
        <section>
          <Row className="align-items-center my-5">
            <Col md={6}>
              <h1 className="mb-4">Welcome to DigiHealth</h1>
              <p>
                Your digital solution for managing migrant health records efficiently and securely.
              </p>
              <Button variant="primary" href="/about">Learn More</Button>
            </Col>
            <Col md={6} className="text-center">
              <img
                src={home}
                alt="DigiHealth"
                className="img-fluid rounded shadow-lg"
                style={{ maxHeight: "350px", objectFit: "cover" }}
              />
            </Col>
          </Row>
        </section>
      </Container>

      {/* About Section */}
      <Container>
        <section>
          <Row className="align-items-center my-5">
            <Col md={12}>
              <h1 className="mb-4">About Us</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis at officia officiis
                dolore, vero nemo, consectetur quibusdam ducimus dolores, a quis soluta eaque? Totam
                dolor rem ducimus tempora omnis recusandae ipsam debitis, incidunt libero odio ad sequi,
                vero ut nesciunt eius autem. Exercitationem ad voluptatem ipsum cum suscipit corrupti,
                temporibus facere harum molestias voluptas unde culpa assumenda totam, mollitia repellat
                a eius debitis itaque nisi provident veniam adipisci odit necessitatibus. Nemo doloremque
                nobis minus in optio consequatur, cupiditate quibusdam a fugiat eveniet possimus corporis
                iure iusto perspiciatis! In accusantium eos ratione numquam recusandae facilis, mollitia,
                totam consequatur, optio aspernatur ea?
              </p>
            </Col>
          </Row>
        </section>
      </Container>

      {/* Stats Section */}
      <Container className="my-5">
        <Row>
          <Col md={4} className="mb-3">
            <Card className="shadow-sm text-center p-3">
              <h5>Migrants Registered</h5>
              <h2>{migrantsCount}</h2>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="shadow-sm text-center p-3">
              <h5>Active Cases</h5>
              <h2>{activeCases}</h2>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="shadow-sm text-center p-3">
              <h5>SDG Progress</h5>
              <ProgressBar now={sdgProgress} label={`${sdgProgress}%`} />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
