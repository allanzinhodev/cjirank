import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Spinner } from 'react-bootstrap';
import FighterFights from './FighterFights';

function FighterProfile() {
  const { id } = useParams();
  const [fighter, setFighter] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    fetch(`https://cjirank-production.up.railway.app/api/fighters/${id}`)
      .then(response => response.json())
      .then(data => {
        setFighter(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar o lutador:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p>Carregando informações do lutador...</p>
      </Container>
    );
  }

  if (!fighter) {
    return (
      <Container className="mt-5 text-center">
        <p>Lutador não encontrado.</p>
        <Button as={Link} to="/" variant="primary">Voltar</Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row>
        {/* Coluna da Imagem */}
        <Col md={4} className="text-center">
          <Image
            src={`/fighters/${fighter.id}.png`}
            alt={fighter.name}
            fluid
            roundedCircle
            className="mb-4"
          />
          <h3>{fighter.name}</h3>
          <p>{fighter.country}</p>
        </Col>
  
        {/* Coluna das Informações */}
        <Col md={8}>
          <h4>Informações Gerais</h4>
          <ul>
            <li><strong>Idade:</strong> {fighter.age} anos</li>
            <li><strong>Altura:</strong> {fighter.height} cm</li>
            <li><strong>Equipe:</strong> {fighter.team}</li>
          </ul>
  
          <h4>Sobre</h4>
          <p>{fighter.about}</p>
  
          <Button as={Link} to="/" variant="secondary" className="mt-3">Voltar</Button>
        </Col>
      </Row>
      <FighterFights fighterId={id} />
    </Container>
   
  );
  
}

export default FighterProfile;
