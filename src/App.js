import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { Header } from "./Components/Header";

export const App = () => {
    return (
        <Wrapper fluid>
            <Row>
                <Header />
            </Row>
        </Wrapper>
    );
};

const Wrapper = styled(Container)`
    background-color: rgb(38, 18, 92);
`;
