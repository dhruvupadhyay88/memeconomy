import React from "react";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";

export const TopChart = ({ tableData }) => {
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
            arr.push(data.mentions);
        });
        return arr;
    };

    const data = {
        labels: getLabels(tableData),
        datasets: [
            {
                label: "Stock Mentions",
                data: getData(tableData),
                backgroundColor: [
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(201, 203, 207, 0.2)",
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 205, 86, 0.2)",
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 205, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                ],
                borderColor: [
                    "rgb(153, 102, 255)",
                    "rgb(201, 203, 207)",
                    "rgb(110, 153, 150)",
                    "rgb(175, 107, 107)",
                    "rgb(201, 203, 207)",
                    "rgb(255, 99, 132)",
                    "rgb(255, 159, 64)",
                    "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)",
                    "rgb(54, 162, 235)",
                ],
                borderWidth: 1,
            },
        ],
    };
    const options = {
        maintainAspectRatio: false,
    };

    return <Bar data={data} />;
};
