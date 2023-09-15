import React from "react";
import PageRouters from "./PageRouters";
import DarkMode from "./context/DarkMode";
import "./App.css";

function App() {
  return (
    <DarkMode>
      <PageRouters />
    </DarkMode>
  );
}

export default App;
