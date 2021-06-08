import React from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";

export const MarketChart = ({ tableData }) => {
    const getLabels = data => {
        var arr = [];
        data.map(data => {
            arr.push(data.date);
        });
        return arr.reverse();
    };

    const getData = data => {
        var arr = [];
        data.map(data => {
            const percent = Math.round(
                (data.positive * 100) / (data.positive + data.negative)
            );
            arr.push(percent);
        });
        return arr.reverse();
    };

    const data = {
        labels: getLabels(tableData),
        datasets: [
            {
                label: "% Positive Sentiment",
                data: getData(tableData),
                fill: true,
                borderColor: "rgb(35, 219, 21)",
                tension: 0.2,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                min: 0,
                max: 100,
            },
            x: {
                ticks: {
                    autoSkip: false,
                    maxRotation: 70,
                    minRotation: 70,
                },
            },
        },
    };

    return <Line options={options} data={data} />;
};
