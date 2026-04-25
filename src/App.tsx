import "./App.css";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Nav />
      <div className="flex flex-1 overflow-hidden p-4">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          <Main />
        </main>
      </div>
    </div>
  );
}

export default App;
