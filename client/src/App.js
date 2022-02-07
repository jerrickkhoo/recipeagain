import { Link, Routes, Route } from "react-router-dom";
import "./App.css";
import Test from "./components/Test";
import Home from "./components/Home";

function App() {
  return (
    <>
      <nav>
        <Link to="/">
          <h1>Home</h1>
        </Link>
        <Link to="/test">
          <h2>test</h2>
        </Link>
      </nav>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
