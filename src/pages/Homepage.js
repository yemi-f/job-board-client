import React from 'react';
import { Container, Button, Row, Col, Image } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

const Homepage = () => {
    const history = useHistory();
    const handleClick = () => {
        const to = {
            pathname: "/jobs/page/1"
        }

        history.push(to);
    }
    return (
        <div style={{ backgroundColor: "#F8F9FA" }}>
            <Container className="py-3" style={{ height: "70vh" }}>
                <Row>
                    <Col xs={12} md={6} className="text-center my-auto">
                        <h2 className="display-4 m-3">Join us as we build something special</h2>
                        <Button variant="info" size="lg" className="m-3" onClick={() => handleClick()}>
                            View open positions
                        </Button>
                    </Col>
                    <Col xs={12} md={6}>
                        <Image fluid src="https://cdn.pixabay.com/photo/2018/02/20/12/19/house-3167502_1280.png" />
                    </Col>
                </Row>
            </Container>
            <div style={{ backgroundColor: "#ffe01b", height: "calc(30vh - 56px)" }}></div>
        </div>

    )
}

export default Homepage;