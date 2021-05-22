import React, { useState, useEffect } from "react";

export const App = () => {
    useEffect(() => {
        fetch("/api/yo")
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => console.log(data));
    });

    return <h1>Hi</h1>;
};
