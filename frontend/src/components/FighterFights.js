import React, { useEffect, useState } from 'react';
import { Card, Badge, Row, Col, Spinner, Container } from 'react-bootstrap';
import axios from 'axios';

const FighterFights = ({ fighterId }) => {
  const [fights, setFights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFights = async () => {
      try {
        const response = await axios.get(`https://cjirank.vercel.app/api/fighters/${fighterId}/fight`);
        setFights(response.data);
      } catch (err) {
        setError('Erro ao buscar lutas.');
      } finally {
        setLoading(false);
      }
    };

    fetchFights();
  }, [fighterId]);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <Container>
      <h3 className="my-4 text-center">Histórico de Lutas</h3>
      <Row>
        {fights.map((fight) => (
          <Col key={fight.fight_id} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                  <span>Vs. {fight.opponent_name}</span>
                  <Badge bg={fight.outcome === 'WIN' ? 'success' : 'danger'}>
                    {fight.outcome}
                  </Badge>
                </Card.Title>
                <Card.Text>
                  <strong>Resultado:</strong> {fight.formatted_result}<br />
                  <strong>Duração:</strong> {fight.formatted_time}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FighterFights;
