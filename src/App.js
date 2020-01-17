import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import BoardApp from "./components/BoardApp";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={BoardApp} />
      </Router>
    </div>
  );
}

export default App;
