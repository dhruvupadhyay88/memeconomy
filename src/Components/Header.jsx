import React from "react";
import styled from "styled-components";
import {
    Container,
    Row,
    Col,
    Button,
    ButtonGroup,
    Navbar,
    Nav,
} from "react-bootstrap";
import { FaChartLine } from "react-icons/fa";

export const Header = () => {
    return (
        <Container fluid>
            <Row style={{ width: "auto", backgroundColor: "rgb(17, 24, 39)" }}>
                <NavBar variant='dark' style={{ width: "auto" }}>
                    <Navbar.Brand
                        href='#home'
                        style={{
                            padding: "0 16px 0 0",
                            borderRight: "1px solid rgb(100,100,100)",
                        }}
                    >
                        <FaChartLine style={{ marginRight: "10px" }} />
                        Memeconomy
                    </Navbar.Brand>
                    <Nav className='mr-auto'>
                        <Nav.Link href='home'>Trending</Nav.Link>
                        <Nav.Link href='features'>Stocks</Nav.Link>
                        <Nav.Link href='pricing'>Market</Nav.Link>
                    </Nav>
                </NavBar>
            </Row>
        </Container>
    );
};

const NavBar = styled(Navbar)`
    background-color: rgb(17, 24, 39);
`;

{
    /* <Title>
<FaChartLine style={{ marginRight: "10px" }} />
Memeconomy
</Title>
<ButtonGroup>
<CustomButton variant='primary'>Left</CustomButton>
<CustomButton variant='primary'>Middle</CustomButton>
<CustomButton variant='primary'>Right</CustomButton>
</ButtonGroup> */
}
