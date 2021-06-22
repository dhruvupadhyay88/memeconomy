import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Row, Button, Spinner } from "react-bootstrap";
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
        if (time === "Day") {
            if (daily) {
                setTableData(daily.data);
                setLoading(false);
            } else setLoading(true);
        } else if (time === "Week") {
            if (weekly) {
                setTableData(weekly.data);
                setLoading(false);
            } else setLoading(true);
        } else if (time === "Month") {
            if (monthly) {
                setTableData(monthly.data);
                setLoading(false);
            } else setLoading(true);
        }
    }, [time, loading]);

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
                    <TimeButton
                        disabled={time === "Day"}
                        onClick={() => setTime("Day")}
                    >
                        Day
                    </TimeButton>
                    <TimeButton
                        disabled={time === "Week"}
                        onClick={() => setTime("Week")}
                    >
                        Week
                    </TimeButton>
                    <TimeButton
                        disabled={time === "Month"}
                        onClick={() => setTime("Month")}
                    >
                        Month
                    </TimeButton>
                </Row>

                {tableData && !loading ? (
                    <Row
                        className='justify-content-center'
                        style={{ margin: "20px 0 12px 0", height: "80%" }}
                    >
                        <TopChart tableData={tableData} />
                    </Row>
                ) : (
                    <Row
                        className='justify-content-center'
                        style={{ margin: "20px 0 12px 0" }}
                    >
                        <Loading animation='border' variant='light' />
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

const Loading = styled(Spinner)`
    margin: 10% 0 35% 0;
`;
