import React from "react";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar.jsx";
import FilmsPage from "./pages/FilmsPage.jsx";
import WatchlistPage from "./pages/WatchlistPage.jsx";
import WatchedPage from "./pages/WatchedPage.jsx";
import { WatchlistProvider } from "./contexts/WatchlistContext.jsx";

function App() {
  return (
    <WatchlistProvider>
      <div style={{
        minHeight: '100vh',
        background: '#ffffff'
      }}>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<FilmsPage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
          <Route path="/watched" element={<WatchedPage />} />
        </Routes>
      </div>
    </WatchlistProvider>
  );
}

export default App;
