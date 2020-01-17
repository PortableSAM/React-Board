import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import BoardApp from "./components/BoardApp";
import Create from "./components/Create";
import Edit from "./components/Edit";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={BoardApp} />
        <Route path="/create" component={Create} />
        <Route path="/edit/:id" component={Edit} />
      </Router>
    </div>
  );
}

export default App;
