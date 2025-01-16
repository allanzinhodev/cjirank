// src/components/Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <Footer className="bg-dark text-light text-center py-3 mt-5">
      <Container>
        <Row>
          <Col>
            <p>&copy; 2024 CJI Rank. Todos os direitos reservados.</p>
          </Col>
        </Row>
      </Container>
    </Footer>
  );
}

export default Footer;
