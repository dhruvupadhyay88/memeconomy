import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import styled from "styled-components";

export const Posts = ({ postsData }) => {
    console.log("posts", postsData);

    return postsData.map((post, index) => {
        return (
            <Card
                bg={"dark"}
                key={index}
                text={"white"}
                style={{ width: "80%" }}
                className='mb-2'
            >
                <Card.Header>{post.author}</Card.Header>
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    });
};
