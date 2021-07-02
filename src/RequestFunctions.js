import axios from "axios";

const url = "https://memeconomy-api.herokuapp.com/";
export const getTopDaily = () => {
    return axios.get(url + "/api/top/daily");
};

export const getTopWeekly = () => {
    return axios.get(url + "/api/top/weekly");
};

export const getTopMonthly = () => {
    return axios.get(url + "/api/top/monthly");
};

export const getMarketSentiment = () => {
    return axios.get(url + "/api/market/chart");
};

export const getMarketPosts = () => {
    return axios.get(url + "/api/market/posts");
};

export const getIndexData = symbol => {
    return axios.get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=8HCVW802X7Q921Y3`
    );
};

export const getStockSentiment = stock => {
    return axios.get(url + `/api/stock/chart?stock=${stock}`);
};

export const getStockPosts = stock => {
    return axios.get(url + `/api/stock/posts?stock=${stock}`);
};

export const getStockList = () => {
    return axios.get(url + "/api/stock/list");
};
