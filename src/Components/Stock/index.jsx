import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Row, Spinner, Form, Button } from "react-bootstrap";
import {
    getStockSentiment,
    getStockPosts,
    getStockList,
} from "../../RequestFunctions";
import { StockChart } from "./StockChart";
import { StockSentimentChart } from "./StockSentimentChart";
import Select from "react-select";
import { Posts } from "../Posts";

export const Stock = () => {
    const [tableData, setTableData] = useState();
    const [postsData, setPostsData] = useState();
    const [allStocks, setAllStocks] = useState();
    const [stock, setStock] = useState();
    const [chartLoading, setChartLoading] = useState(true);
    const [postsLoading, setPostsLoading] = useState(true);
    const [toggle, setToggle] = useState("Mentions");

    useEffect(() => {
        getStockList().then(res => {
            console.log(res.data);
            setAllStocks(res.data);
        });
    }, []);

    useEffect(() => {
        setTableData(null);
        setPostsData(null);
        if (stock) {
            getStockSentiment(stock).then(res => {
                setTableData(res.data);
                setChartLoading(false);
                console.log("chart", res.data);
            });
            getStockPosts(stock).then(res => {
                setPostsData(res.data);
                setPostsLoading(false);
                console.log("posts", res.data);
            });
        }
    }, [stock]);

    const getOptions = () => {
        var arr = [];
        if (allStocks) {
            allStocks.map(stock => {
                arr.push({
                    value: stock.stock,
                    label: stock.stock,
                });
            });
        }
        return arr;
    };
    return (
        <Row>
            <Container>
                <Row className='justify-content-center'>
                    <SubTitle>{`Select A Stock: `}</SubTitle>
                </Row>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "10px 0 0 0",
                    }}
                >
                    <div style={{ width: "400px" }}>
                        <Select
                            options={getOptions()}
                            style={{ margin: "100px 0 0 0" }}
                            onChange={value => {
                                setStock(value.value);
                            }}
                        />
                    </div>
                </div>
                {stock && tableData && !chartLoading && (
                    <>
                        <Row className='justify-content-center'>
                            <Title>{`${stock} ${toggle} over Time`}</Title>
                            {tableData && !chartLoading && (
                                <ToggleButton
                                    variant='success'
                                    onClick={() => {
                                        const newToggle =
                                            toggle === "Mentions"
                                                ? "Sentiment"
                                                : "Mentions";
                                        setToggle(newToggle);
                                    }}
                                >{`View ${
                                    toggle === "Mentions"
                                        ? "Sentiment"
                                        : "Mentions"
                                }`}</ToggleButton>
                            )}
                        </Row>
                        <Row
                            className='justify-content-center'
                            style={{ margin: "20px 0 12px 0" }}
                        >
                            {toggle === "Mentions" ? (
                                <StockChart tableData={tableData} />
                            ) : (
                                <StockSentimentChart tableData={tableData} />
                            )}
                        </Row>
                    </>
                )}

                {stock && postsData && !postsLoading && (
                    <>
                        <Row className='justify-content-center'>
                            <Title>{`${stock} Related Posts`}</Title>
                        </Row>
                        <Row
                            className='justify-content-center'
                            style={{ margin: "20px 0 12px 0" }}
                        >
                            <Posts postsData={postsData} />
                        </Row>
                    </>
                )}

                {stock && (!tableData || !postsData) && (
                    <Row
                        className='justify-content-center'
                        style={{ margin: "20px 0 12px 0" }}
                    >
                        <Loading animation='border' variant='light' />
                    </Row>
                )}

                {!stock && <div style={{ height: "600px" }}></div>}
            </Container>
        </Row>
    );
};

const Title = styled.h4`
    color: white;
    margin: 20px 0 0 0;
`;

const ToggleButton = styled(Button)`
    margin: 18px 5px 0 15px;
`;

const SubTitle = styled.h5`
    color: white;
    margin: 20px 0 0 0;
`;
const Loading = styled(Spinner)`
    margin: 10% 0 37% 0;
`;
