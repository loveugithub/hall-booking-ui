import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BuildingList from "./components/BuildingList";
import Building from "./components/Building";
import { BuildingsProvider } from "./contexts/BuildingsContext";

function App() {
  return (
    <BuildingsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="buildings" element={<BuildingList />} />
          <Route path="buildings/:id" element={<Building />} />
        </Routes>
      </BrowserRouter>
    </BuildingsProvider>
  );
}

export default App;
