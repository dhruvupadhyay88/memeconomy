import React from "react";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";

export const SentimentChart = ({ tableData }) => {
    const getLabels = data => {
        var arr = [];
        data.map(data => {
            arr.push(data.stock);
        });
        return arr;
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
                backgroundColor: ["rgba(0, 255, 0, 0.2)"],
                borderColor: ["rgb(0, 255, 0)"],
                borderWidth: 1,
            },
        ],
    };
    const options = {
        maintainAspectRatio: false,
        responsive: true,
    };

    return <Bar data={data} options={options} />;
};
