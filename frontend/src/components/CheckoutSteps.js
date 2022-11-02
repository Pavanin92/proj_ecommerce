import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function CheckoutSteps(props) {
  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? 'active' : ''}>Entrar</Col>
      <Col className={props.step2 ? 'active' : ''}>Envio</Col>
      <Col className={props.step3 ? 'active' : ''}>Pagamento</Col>
      <Col className={props.step4 ? 'active' : ''}>Finalizar</Col>
    </Row>
  );
}
