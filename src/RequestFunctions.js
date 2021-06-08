import axios from "axios";

export const getTopDaily = () => {
    return axios.get("/api/top/daily");
};

export const getTopWeekly = () => {
    return axios.get("/api/top/weekly");
};

export const getTopMonthly = () => {
    return axios.get("/api/top/monthly");
};

export const getMarketSentiment = () => {
    return axios.get("/api/market/chart");
};

export const getMarketPosts = () => {
    return axios.get("/api/market/posts");
};
