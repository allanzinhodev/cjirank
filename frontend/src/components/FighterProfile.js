import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Spinner } from 'react-bootstrap';
import FighterFights from './FighterFights';
import FighterStatsChart from './FighterStatsChart';

function FighterProfile() {
  const { id } = useParams();
  const [fighter, setFighter] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    fetch(`http://localhost:3001/api/fighters/${id}`)
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
      <Row className="fighter g-0">
        {/* Coluna da Imagem */}
        <Col md={4} className="text-center mg-0">
          <Image
            src={`/fighters/${fighter.id}.png`}
            alt={fighter.name}
            fluid
          />
        </Col>
  
        {/* Coluna das Informações */}
        <Col md={8} className='g-3 g-xxl-5'>
          <h1 className='use-letter-spacing-hint my-4'>{fighter.name}</h1>
          <div className='atributos'>
            <div className='atributo'>
              <h5 className='titulo'>team</h5>
              <div className='valor'>{fighter.team}</div>
            </div>
            <div className='atributo'>
              <h5 className='titulo'>height</h5>
              <div className='valor'>{fighter.height} CM</div>
            </div>
            <div className='atributo'>
              <h5 className='titulo'>country</h5>
              <div className='valor'>{fighter.country}</div>
            </div>
            <div className='atributo'>
              <h5 className='titulo'>age</h5>
              <div className='valor'>{fighter.age} Years</div>
            </div>
          </div>
  
          <Button as={Link} to="/" variant="secondary" className="mt-3">Voltar</Button>
        </Col>
      </Row>
      <FighterFights fighterId={id} />
      <FighterStatsChart fighterId={fighter.id} />
    </Container>
   
  );
  
}

export default FighterProfile;
