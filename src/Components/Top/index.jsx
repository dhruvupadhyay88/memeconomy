import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Row, Col, Button, ButtonGroup } from "react-bootstrap";
import { TopChart } from "./TopChart";
import {
    getTopDaily,
    getTopWeekly,
    getTopMonthly,
} from "../../RequestFunctions";

export const Top = () => {
    const [time, setTime] = useState("Day");
    const [loading, setLoading] = useState(true);
    const [daily, setDaily] = useState();
    const [weekly, setWeekly] = useState();
    const [monthly, setMonthly] = useState();

    useEffect(() => {
        getTopDaily().then(res => {
            setDaily(res);
            setLoading(false);
        });
        getTopWeekly().then(res => {
            setWeekly(res);
            setLoading(false);
        });
        getTopMonthly().then(res => {
            setMonthly(res);
            setLoading(false);
        });
    }, []);

    getTableData = () => {};
    return (
        <Container>
            <Row className='justify-content-center'>
                <Title>{`WallStreetBets Top Stocks Last ${time}`}</Title>
            </Row>
            <Row
                className='justify-content-center'
                style={{ margin: "10px 0 0 0" }}
            >
                <TimeButton onClick={() => setTime("Day")}>Day</TimeButton>
                <TimeButton onClick={() => setTime("Week")}>Week</TimeButton>
                <TimeButton onClick={() => setTime("Month")}>Month</TimeButton>
            </Row>

            {daily && (
                <Row
                    className='justify-content-center'
                    style={{ margin: "20px 0 0 0" }}
                >
                    <TopChart tableData={daily.data} />
                </Row>
            )}
        </Container>
    );
};

const Title = styled.h4`
    color: white;
    margin: 20px 0 0 0;
`;

const TimeButton = styled(Button)`
    background-color: rgb(24, 51, 78);
    border-color: rgb(24, 51, 78);
    margin: 0 5px 0 5px;
`;
