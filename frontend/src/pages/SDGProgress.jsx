import React, { useState, useEffect } from 'react';
import { Container, ProgressBar, Card } from 'react-bootstrap';
import axios from 'axios';

const API_URL = 'http://localhost:8000';

function SDGProgress() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/sdg/goals`).then(response => {
      setGoals(response.data);
    });
  }, []);

  return (
    <Container>
      <h1>SDG Progress Tracker</h1>
      {goals.map(goal => (
        <Card key={goal.id} className="mt-3">
          <Card.Body>
            <Card.Title>{goal.name}</Card.Title>
            <ProgressBar now={(goal.progress / goal.target) * 100} label={`${((goal.progress / goal.target) * 100).toFixed(2)}%`} className="mt-2" />
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default SDGProgress;
