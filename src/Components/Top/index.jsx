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
    const [tableData, setTableData] = useState();

    useEffect(() => {
        getTopDaily().then(res => {
            setDaily(res);
            setTableData(res.data);
            setLoading(false);
            console.log("day");
        });
        getTopWeekly().then(res => {
            setWeekly(res);
            setLoading(false);
            console.log("week");
        });
        getTopMonthly().then(res => {
            setMonthly(res);
            setLoading(false);
            console.log("month");
        });
    }, []);

    useEffect(() => {
        if (time == "Day" && daily) {
            setTableData(daily.data);
        } else if (time == "Week" && weekly) {
            setTableData(weekly.data);
        } else if (time == "Month" && monthly) {
            setTableData(monthly.data);
        }
    }, [time]);

    return (
        <Row>
            <Container>
                <Row className='justify-content-center'>
                    <Title>{`WallStreetBets Top Stocks Last ${time}`}</Title>
                </Row>
                <Row
                    className='justify-content-center'
                    style={{ margin: "10px 0 0 0" }}
                >
                    <TimeButton onClick={() => setTime("Day")}>Day</TimeButton>
                    <TimeButton onClick={() => setTime("Week")}>
                        Week
                    </TimeButton>
                    <TimeButton onClick={() => setTime("Month")}>
                        Month
                    </TimeButton>
                </Row>

                {tableData && (
                    <Row
                        className='justify-content-center'
                        style={{ margin: "20px 0 12px 0" }}
                    >
                        <TopChart tableData={tableData} />
                    </Row>
                )}
            </Container>
        </Row>
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
