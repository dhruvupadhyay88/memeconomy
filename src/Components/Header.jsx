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
                        <Nav.Link href='#home'>Trending</Nav.Link>
                        <Nav.Link href='#features'>Stocks</Nav.Link>
                        <Nav.Link href='#pricing'>Market</Nav.Link>
                    </Nav>
                </NavBar>
            </Row>
        </Container>
    );
};

const NavBar = styled(Navbar)`
    background-color: rgb(17, 24, 39);
`;
const CustomButton = styled(Button)`
    background-color: rgb(34, 40, 62);
    border-color: rgb(34, 40, 62);
    height: 40px;
    vertical-align: center;
    margin: 18px 0 0 20px;
`;

const Title = styled.h4`
    color: white;
    margin: 15px 0 10px 4%;
    border-right: 2px solid rgb(200, 200, 200);
    padding: 0 20px 0 0;
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
