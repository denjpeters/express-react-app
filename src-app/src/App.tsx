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
                console.log(response.data);
            });
    });

    return (
        <>
            App is here, again </>
    );
};

export default App;
