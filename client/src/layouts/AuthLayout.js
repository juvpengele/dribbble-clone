import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../components/layouts/auth/Sidebar";


function AuthLayout(props) {

    useEffect(() => {
        if(props.auth) {
            props.history.push('/');
        }
    }, []);


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

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps,null)(withRouter(AuthLayout));