import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { Header } from "./Components/Header";
import { Top } from "./Components/Top";

export const App = () => {
    return (
        <Wrapper fluid>
            <Row>
                <Header />
            </Row>
            <Row>
                <Top />
            </Row>
        </Wrapper>
    );
};

const Wrapper = styled(Container)`
    background-color: rgb(20, 28, 48);
`;
