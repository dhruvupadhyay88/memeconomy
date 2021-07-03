import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { Top } from "./Components/Top";
import { Market } from "./Components/Market";
import { Stock } from "./Components/Stock";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export const App = () => {
    return (
        <Router>
            <Wrapper fluid>
                <Main>
                    <Row>
                        <Header />
                    </Row>
                    <Route path={["/", "/home"]} exact component={Top} />
                    <Route path={"/market"} exact component={Market} />
                    <Route path={"/stocks"} exact component={Stock} />
                </Main>
                <Row>
                    <Footer />
                </Row>
            </Wrapper>
        </Router>
    );
};

const Wrapper = styled(Container)`
    background-color: rgb(20, 28, 48);
    -moz-background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
`;

const Main = styled.div`
    min-height: 95vh;
`;
