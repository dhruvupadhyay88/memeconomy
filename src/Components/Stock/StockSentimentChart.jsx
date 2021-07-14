import React from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";

export const StockSentimentChart = ({ tableData }) => {
    const getLabels = data => {
        var arr = [];
        data.map(data => {
            arr.push(data.date);
        });
        return arr.reverse();
    };

    const getMentions = data => {
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
                data: getMentions(tableData),
                fill: true,
                borderColor: "rgb(0, 255, 0)",
                tension: 0.4,
            },
        ],
    };

    const options = {
        scales: {
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
