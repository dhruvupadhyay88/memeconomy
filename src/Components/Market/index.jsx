import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Row, Spinner } from "react-bootstrap";
import {
    getMarketSentiment,
    getMarketPosts,
    getIndexData,
} from "../../RequestFunctions";
import { MarketChart } from "./MarketChart";
import { Posts } from "./Posts";
import axios from "axios";

export const Market = () => {
    const [tableData, setTableData] = useState();
    const [postsData, setPostsData] = useState();
    const [SPY, setSPY] = useState();
    const [QQQ, setQQQ] = useState();
    const [DIA, setDIA] = useState();
    const [chartLoading, setChartLoading] = useState(true);
    const [postsLoading, setPostsLoading] = useState(true);
    const [indexLoading, setIndexLoading] = useState(true);

    useEffect(() => {
        getMarketSentiment().then(res => {
            setTableData(res.data);
            setChartLoading(false);
            console.log(res.data);
        });
        getMarketPosts().then(res => {
            setPostsData(res.data);
            setPostsLoading(false);
            console.log(res.data);
        });
        // getIndexData("SPY").then(res => {
        //     setSPY(res.data);
        // });
        // getIndexData("QQQ").then(res => {
        //     setQQQ(res.data);
        // });
        // getIndexData("DIA").then(res => {
        //     setDIA(res.data);
        // });
    }, []);

    console.log(SPY, QQQ, DIA);
    return (
        <Row>
            <Container>
                <Row className='justify-content-center'>
                    <Title>{`WallStreetBets Market Sentiment`}</Title>
                </Row>

                {tableData && !chartLoading ? (
                    <Row
                        className='justify-content-center'
                        style={{ margin: "20px 0 12px 0" }}
                    >
                        <MarketChart tableData={tableData} />
                    </Row>
                ) : (
                    <Row
                        className='justify-content-center'
                        style={{ margin: "20px 0 12px 0" }}
                    >
                        <Loading animation='border' variant='light' />
                    </Row>
                )}
                {postsData && !postsLoading ? (
                    <Row
                        className='justify-content-center'
                        style={{ margin: "20px 0 12px 0" }}
                    >
                        <Posts postsData={postsData} />
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

const Loading = styled(Spinner)`
    margin: 10% 0 37% 0;
`;
