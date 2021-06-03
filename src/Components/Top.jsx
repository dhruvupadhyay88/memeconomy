import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";

export const Top = () => {
    return (
        <Container>
            <Row className='justify-content-center'>
                <Title>WallStreetBets Top Stocks Last Day</Title>
            </Row>
        </Container>
    );
};

const Title = styled.h3`
    color: white;
    margin: 50px 0 0 0;
`;
