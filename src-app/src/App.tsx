import React, {useEffect} from 'react';
import './App.scss';
import axios from "axios";

const App = () => {
    useEffect(() => {
        // axios.defaults.withCredentials = true;
        // axios.post('/api/others/cars', {single: 3})
        //     .then((response: any) => {
        //         console.log("post", response.data);
        //         console.log("post header", response.headers.intelliwake ?? "None");
        //     });
        // axios.get('/api/others/cars')
        //     .then((response: any) => {
        //         console.log("get data", response.data);
        //         console.log("get header", response.headers.intelliwake ?? "None");
        //     });

        const html_version = 1234;

        let Authorization: any = {
            device_token: "DEV_TOK",
            device_token_for: "DEV_TOK_FOR"
        };

        if (!!html_version) {
            Authorization.html_version = html_version;
        }

        let headers: any = {
            Authorization: JSON.stringify(Authorization)
        };

        let config: any = {
            headers: headers
        };

        // if (cancelTokenSource) {
        //     config.cancelToken = cancelTokenSource.token
        // }

        const api_parms = {
            inBound: 1
        }

        // axios.defaults.withCredentials = true;
        axios.post('/api/protected/cars', api_parms, config)
            .then((response: any) => {
                console.log("post data", response.data);
                console.log("post header", JSON.parse(response.headers.intelliwake ?? "{}"));
            });

        // axios.get('/api/protected/cars', config)
        //     .then((response: any) => {
        //         console.log("get data", response.data);
        //         console.log("get header", JSON.parse(response.headers.intelliwake ?? "{}"));
        //     });

    });

    return (
        <>
            App is here, again </>
    );
};

export default App;
