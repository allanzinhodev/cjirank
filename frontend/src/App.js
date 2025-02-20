import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Row, Col, Spinner } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FighterProfile from './components/FighterProfile'; // Página de detalhes do lutador
import NavigationBar from './components/NavigationBar';

function App() {
  const [fighters, setFighters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://cjirank-production.up.railway.app/api/fighters')
      .then(response => response.json())
      .then(data => {
        setFighters(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar lutadores:', error);
        setLoading(false);
      });
  }, []);

  return (
    <Router>
      <NavigationBar/>
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={
            loading ? (
              <div className="text-center">
                <Spinner animation="border" variant="primary" />
                <p>Carregando lutadores...</p>
              </div>
            ) : (
              <Row>
                {fighters.map(fighter => (
                  <Col key={fighter.id} md={4} className="mb-4">
                    <Link to={`/fighter/${fighter.id}`} style={{ textDecoration: 'none' }}>
                      <Card>
                        <Card.Img variant="top" src={`/fighters/${fighter.id}.png`} alt={fighter.name} />
                        <Card.Body>
                          <Card.Title>{fighter.name}</Card.Title>
                          <Card.Text>
                            Idade: {fighter.age} anos <br />
                            Altura: {fighter.height} cm <br />
                            País: {fighter.country} <br />
                            Equipe: {fighter.team}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            )
          } />

          {/* Rota para página de detalhes do lutador */}
          <Route path="/fighter/:id" element={<FighterProfile />} />
        </Routes>
      </Container>

      <footer className="bg-dark text-white text-center py-3 mt-5">
        <Container>
          <p className="mb-0">© 2025 CJI Rank. Todos os direitos reservados.</p>
        </Container>
      </footer>
    </Router>
  );
}

export default App;
