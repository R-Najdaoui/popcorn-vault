import React from "react";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar.jsx";
import FilmsPage from "./pages/FilmsPage.jsx";

function App() {
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<FilmsPage />} />
      </Routes>
    </div>
  );
}

export default App;



