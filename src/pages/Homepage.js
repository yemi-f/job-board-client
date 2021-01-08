import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';

const Homepage = () => {
    return (
        <Row>
            <Col xs={12} md={6}>
                <Container>
                    <Button variant="info" size="lg">View open positions</Button>
                </Container>
            </Col>
            <Col xs={12} md={6} className="bg-danger">

            </Col>
        </Row>
    )
}

export default Homepage;