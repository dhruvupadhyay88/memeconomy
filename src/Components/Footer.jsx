import React from "react";
import styled from "styled-components";
import { Container, Row, Navbar } from "react-bootstrap";
import { AiFillGithub } from "react-icons/ai";

export const Footer = () => {
    return (
        <Container fluid>
            <Row
                style={{
                    width: "auto",
                    backgroundColor: "rgb(17, 24, 39)",
                    justifyContent: "right",
                }}
            >
                <NavBar variant='dark' style={{ width: "auto" }}>
                    <Navbar.Text>
                        Created by{" "}
                        <a href='https://github.com/dhruvupadhyay88/'>
                            Dhruv Upadhyay <AiFillGithub />
                        </a>
                    </Navbar.Text>
                </NavBar>
            </Row>
        </Container>
    );
};

const NavBar = styled(Navbar)`
    background-color: rgb(17, 24, 39);
`;
