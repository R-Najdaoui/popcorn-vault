import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    // Load wishlist from localStorage on initialization
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (movie) => {
    setWishlist(prev => {
      // Check if movie is already in wishlist
      if (prev.some(item => item.id === movie.id)) {
        return prev; // Don't add duplicates
      }
      return [...prev, movie];
    });
  };

  const removeFromWishlist = (movieId) => {
    setWishlist(prev => prev.filter(movie => movie.id !== movieId));
  };

  const isInWishlist = (movieId) => {
    return wishlist.some(movie => movie.id === movieId);
  };

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
