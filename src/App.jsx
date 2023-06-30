import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Selector from "./Components/Selector/Selector";
import Side from "./Components/Side/Side";

function App() {
  return (
    <div className="container">
      <Navbar />
      <div className="container-down">
        <Side />
        <Selector />
      </div>
    </div>
  );
}

export default App;
