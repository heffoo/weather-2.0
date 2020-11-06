import React from "react";
import Container from "./container/mainComponent";
import ErrorBoundary from "./container/errorBoundary";

import "./App.scss";

function App() {
  return (
    <div className="App">
     {/* <ErrorBoundary>  */}
        <Container />
  {/* </ErrorBoundary> */}
    </div>
  );
}

export default App;
