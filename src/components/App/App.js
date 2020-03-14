import React from 'react';
import './appStyle.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./navigation/navbar"
import CountryList from "./navigation/country-list"
import EditCountry from "./navigation/edit-country"
import CreateCountry from "./navigation/create-country"
import CreateUsers from "./navigation/create-users"

const App = () => {
  return (
    <Router>
          <div className="container">
            <Navbar />
            <br />
            <Route path="/" exact component={CountryList} />
            <Route path="/create" component={CreateCountry} />
            <Route path="/edit/:id" component={EditCountry} />
            <Route path="/user" component={CreateUsers} />
          </div>
    </Router>
  );
};

export default App;
