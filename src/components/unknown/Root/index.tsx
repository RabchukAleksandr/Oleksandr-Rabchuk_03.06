import React from 'react';
import { Route, Routes } from "react-router-dom";
import Movies from "../../Movies";

type RootProps = {}
const Root: React.FC<RootProps> = () => {
    return (
        <Routes>
            <Route path="/" element={<Movies/>} />
        </Routes>
    );
};

export default Root;