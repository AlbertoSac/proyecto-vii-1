import React from "react";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";

function App() {
  return (
    <div className="app">
      <Topbar />
      <div className="content">
        <Sidebar />
        <Content />
      </div>
    </div>
  );
}

export default App;