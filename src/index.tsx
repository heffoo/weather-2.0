import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { BrowserRouter as Router } from "react-router-dom";
import Container from "./components/mainComponent";

ReactDOM.render(
  <Router>
    <Container />
  </Router>,

  document.getElementById("root")
);
