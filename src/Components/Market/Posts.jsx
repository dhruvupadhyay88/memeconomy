import React from "react";
import { ImArrowUp } from "react-icons/im";
import { BiCommentDetail } from "react-icons/bi";
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

    const formatComments = num => {
        if (num > 1000) {
            const q = (num - (num % 1000)) / 1000;
            const r = num % 1000;
            const l = Math.round((r / 1000).toFixed(2) * 100);
            return `${q}.${l}k`;
        } else {
            return num;
        }
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
                    <Comments>
                        <BiCommentDetail
                            style={{ margin: "4px 4px 8px 10px" }}
                        />
                        {formatComments(post.comments)}
                    </Comments>
                    <Link
                        target='_blank'
                        href={"https://www.reddit.com" + post.link}
                    >
                        <h5
                            style={{
                                color: "rgb(150,150,150)",
                                margin: "0 0 2px 0",
                            }}
                        >
                            View Post
                        </h5>
                    </Link>
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
    margin: 8px 0 0 0;
`;

const Comments = styled.h5`
    color: rgb(150, 150, 150);
    float: left;
    margin: 8px 0 0 10px;
`;

const Bottom = styled.div`
    display: flex;
    margin: auto 0 0 28px;
`;

const Link = styled.a`
    margin: 0 10px 10px auto;
    background-color: rgb(20, 28, 48);
    width: 200px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    &:hover {
        background-color: rgb(24, 33, 56);
    }
`;
