import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Button, Spinner } from 'react-bootstrap';

function FighterPage() {
  const { id } = useParams();
  const [fighter, setFighter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://cjirank-production.up.railway.app/api/fighters/'${id}`)
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
      <Card>
        <Card.Img variant="top" src={`/fighters/${fighter.id}.png`} alt={fighter.name} />
        <Card.Body>
          <Card.Title>{fighter.name}</Card.Title>
          <Card.Text>
            Idade: {fighter.age} anos <br />
            Altura: {fighter.height} cm <br />
            País: {fighter.country} <br />
            Equipe: {fighter.team} <br />
            Sobre: {fighter.about}
          </Card.Text>
          <Button as={Link} to="/" variant="secondary">Voltar</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default FighterPage;
