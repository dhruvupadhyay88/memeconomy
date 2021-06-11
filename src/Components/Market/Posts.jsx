import React, { useState, useEffect } from "react";
import { ImArrowUp } from "react-icons/im";
import styled from "styled-components";

export const Posts = ({ postsData }) => {
    const formatTitle = str => {
        if (str.length > 100) {
            return str.slice(0, 100) + "...";
        }
        return str;
    };

    const formatUpvotes = num => {
        const q = (num - (num % 1000)) / 1000;
        const r = num % 1000;
        const l = Math.round((r / 1000).toFixed(2) * 100);

        return `${q}.${l}k`;
    };

    return postsData.map((post, index) => {
        return (
            <Post>
                <Title>{formatTitle(post.title)}</Title>
                <Bottom>
                    <Upvote>
                        <ImArrowUp style={{ margin: "0 0 8px 0" }} />{" "}
                        {formatUpvotes(post.upvotes)}
                    </Upvote>
                </Bottom>
            </Post>
        );
    });
};

const Post = styled.div`
    display: flex;
    flex-direction: column;
    width: 40%;
    height: 130px;
    background-color: rgb(17, 24, 39);
    margin: 8px 4px 4px 8px;
    border-radius: 30px;
    box-shadow: 5px 5px rgba(13, 18, 30, 0.5);
`;

const Title = styled.h5`
    margin: 10px 0 0 30px;
    color: rgb(150, 150, 150);
    width: 90%;
`;

const Upvote = styled.h5`
    color: rgb(150, 150, 150);
    float: left;
`;

const Bottom = styled.div`
    display: flex;
    margin: auto 0 0 28px;
`;
