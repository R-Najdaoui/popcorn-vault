import React from "react";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar.jsx";
import FilmsPage from "./pages/FilmsPage.jsx";
import WishlistPage from "./pages/WishlistPage.jsx";
import { WishlistProvider } from "./contexts/WishlistContext.jsx";

function App() {
  return (
    <WishlistProvider>
      <div>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<FilmsPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Routes>
      </div>
    </WishlistProvider>
  );
}

export default App;
