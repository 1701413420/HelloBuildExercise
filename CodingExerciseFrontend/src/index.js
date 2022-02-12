import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Components
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Page404 from './Components/Page404';
import Profile from './Components/Profile';

ReactDOM.render(
  <App>
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="*" element={<Page404 />} />
        {/* <Route path="/repos" element={<Repos />} /> */}
      </Routes>
    </BrowserRouter>
  </App>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
