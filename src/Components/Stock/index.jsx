import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Row, Spinner, Form } from "react-bootstrap";
import {
    getStockSentiment,
    getStockPosts,
    getStockList,
} from "../../RequestFunctions";
import Select from "react-select";
import { Posts } from "../Posts";

export const Stock = () => {
    const [tableData, setTableData] = useState();
    const [postsData, setPostsData] = useState();
    const [allStocks, setAllStocks] = useState();
    const [stock, setStock] = useState();
    const [chartLoading, setChartLoading] = useState(true);
    const [postsLoading, setPostsLoading] = useState(true);

    useEffect(() => {
        getStockList().then(res => {
            console.log(res.data);
            setAllStocks(res.data);
        });
    }, []);

    // useEffect(() => {
    //     getStockSentiment("PLTR").then(res => {
    //         setTableData(res.data);
    //         setChartLoading(false);
    //         console.log(res.data);
    //     });
    //     getStockPosts("PLTR").then(res => {
    //         setPostsData(res.data);
    //         setPostsLoading(false);
    //         console.log(res.data);
    //     });
    // }, []);

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
                    <Title>{`WallStreetBets Market Sentiment`}</Title>
                </Row>
                <div
                    style={{
                        width: "400px",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Select
                        options={getOptions()}
                        style={{ margin: "100px 0 0 0" }}
                    />
                </div>
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
