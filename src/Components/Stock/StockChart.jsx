import React from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";

export const StockChart = ({ tableData }) => {
    const getLabels = data => {
        var arr = [];
        data.map(data => {
            arr.push(data.date);
        });
        return arr.reverse();
    };

    const getMentions = data => {
        var arr = [];
        data.map((data, index) => {
            arr.push(data.mentions);
        });
        return arr.reverse();
    };

    const data = {
        labels: getLabels(tableData),
        datasets: [
            {
                label: "Mentions",
                data: getMentions(tableData),
                fill: true,
                borderColor: "#00B3DF",
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
