import React, {useEffect} from 'react';
import './App.scss';
import axios from "axios";
import {testFunction} from "src-common/src/functionality";

const App = () => {
    testFunction()

    useEffect(() => {
        // axios.defaults.withCredentials = true;
        axios.post('/api/others/cars', {single: 3})
            .then((response: any) => {
                console.log("post", response.data);
                console.log("post header", response.headers.intelliwake ?? "None");
            });
        axios.get('/api/others/cars')
            .then((response: any) => {
                console.log("get data", response.data);
                console.log("get header", response.headers.intelliwake ?? "None");
            });
        // axios.get('/api/protected/cars')
        //     .then((response: any) => {
        //         console.log("get data", response.data);
        //         console.log("get header", response.headers.intelliwake ?? "None");
        //     });
    });

    return (
        <>
            App is here, again </>
    );
};

export default App;
