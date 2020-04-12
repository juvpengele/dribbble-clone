import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import Sidebar from "../components/layouts/auth/Sidebar";

function AuthLayout(props) {
    return (
        <Container fluid>
            <Row>
                <Col style={{ paddingLeft: 0, paddingRight: 0}}
                    lg={5}
                >
                    <Sidebar />
                </Col>
                <Col lg={7}>
                    { props.children }
                </Col>
            </Row>
        </Container>
    )
}

export default AuthLayout;