import { Container, Row, Col, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import home from '../assets/home.jpg';

function Home() {
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
            <Col md={6}>
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
    </div>
  );
}

export default Home;
