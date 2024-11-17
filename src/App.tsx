import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <header className="max-w-[1280px] mx-auto px-24 py-8 flex justify-between items-center">
          <Link to={"/"} className="font-light text-2xl">Fast<span className="text-primary font-medium">Log</span></Link>
          <button className="text-white bg-terciary px-4 py-2 rounded-lg">Consultar entrega</button>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
