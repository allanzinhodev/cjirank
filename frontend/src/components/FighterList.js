// src/components/FighterList.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';

const FighterList = ({ fighters }) => {
  return (
    <Row>
      {fighters.length > 0 ? (
        fighters.map((fighter) => (
          <Col md={4} key={fighter.id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={`https://example.com/fighter/${fighter.id}.png`} />
              <Card.Body>
                <Card.Title>{fighter.name}</Card.Title>
                <Link to={`/fighter/${fighter.id}`}>
                  <Button variant="primary">Ver Perfil</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        <p>Nenhum lutador encontrado.</p>
      )}
    </Row>
  );
};

export default FighterList;
