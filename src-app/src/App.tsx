import React, {useEffect} from 'react';
import './App.scss';
import axios from "axios";
import {testFunction} from "src-common/src/functionality";

const App = () => {
    testFunction()

    useEffect(() => {
        // axios.defaults.withCredentials = true;
        axios.post('/api', {single: 3})
            .then((response: any) => {
                console.log("api", response.data);
            });
        axios.post('/api/things/cars', {single: 3})
            .then((response: any) => {
                console.log("post", response.data);
            });
        axios.get('/api/things/cars')
            .then((response: any) => {
                console.log("get", response.data);
            });
    });

    return (
        <>
            App is here, again </>
    );
};

export default App;
