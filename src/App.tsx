import { useState } from "react";

import "./App.css";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

function App() {
  return (
    <>
      <Nav />
      <div className="flex flex-1 ">
        <Sidebar />
        <Main />
      </div>
    </>
  );
}

export default App;
