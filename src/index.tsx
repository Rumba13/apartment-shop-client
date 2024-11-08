import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/styles/index.scss';
import reportWebVitals from './app/reportWebVitals';
import {App} from "./app/App";
import ruRu from "antd/lib/locale/ru_RU";
import {ConfigProvider} from "antd";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
        <ConfigProvider locale={ruRu}>
                <App/>
        </ConfigProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
