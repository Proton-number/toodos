import "./App.css";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { Tabs } from "./components/ui/tabs";
import { useState, useEffect } from "react";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 760);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Nav />
      <Tabs
        defaultValue="Today"
        className="flex-1 flex flex-col min-h-0 "
        orientation={isMobile ? "horizontal" : "vertical"}
      >
        <div className="flex flex-1 p-4 gap-4 min-h-0 pb-20 md:pb-4">
          <Sidebar />
          <main className="flex-1 p-6 overflow-y-auto">
            <Main />
          </main>
        </div>
      </Tabs>
    </div>
  );
}

export default App;
