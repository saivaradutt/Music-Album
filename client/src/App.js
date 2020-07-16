import React, {useState} from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import Track from './components/Track';
import Search from "./components/Search";
import Home from "./components/Home";
import Menu from "./components/Menu";


function App() {
  return (
    <BrowserRouter>                                                 //BrowserRouter is a Router component to make routes
        <div className="App">
            <Menu/>
            <Switch>                                                //Switch will help to run the particular Route according to the call
                <Route path="/" exact component={Home} />           //Route is a Route matching component that will call particular component according to the path
                <Route path="/Search" component={Search} />
                <Route path="/Track" component={Track} />
            </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;
