import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PageRouters from "./PageRouters";

import DarkMode from "./context/DarkMode";
import "./App.css";

function App() {
  return (
    <DarkMode>
      <Router>
        <PageRouters />
      </Router>
    </DarkMode>
  );
}

export default App;
