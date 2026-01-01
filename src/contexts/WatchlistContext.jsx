import React, { createContext, useContext, useState, useEffect } from 'react';

const WatchlistContext = createContext();

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [watched, setWatched] = useState(() => {
    const saved = localStorage.getItem('watched');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(watched));
  }, [watched]);

  const addToWatchlist = (movie) => {
    setWatchlist(prev => {
      if (prev.some(item => item.id === movie.id)) {
        return prev;
      }
      return [...prev, movie];
    });
  };

  const removeFromWatchlist = (movieId) => {
    setWatchlist(prev => prev.filter(movie => movie.id !== movieId));
  };

  const moveToWatched = (movieId) => {
    const movie = watchlist.find(m => m.id === movieId);
    if (movie) {
      setWatchlist(prev => prev.filter(m => m.id !== movieId));
      setWatched(prev => {
        if (prev.some(item => item.id === movie.id)) {
          return prev;
        }
        return [...prev, movie];
      });
    }
  };

  const removeFromWatched = (movieId) => {
    setWatched(prev => prev.filter(movie => movie.id !== movieId));
  };

  const isInWatchlist = (movieId) => {
    return watchlist.some(movie => movie.id === movieId);
  };

  const isWatched = (movieId) => {
    return watched.some(movie => movie.id === movieId);
  };

  const value = {
    watchlist,
    watched,
    addToWatchlist,
    removeFromWatchlist,
    moveToWatched,
    removeFromWatched,
    isInWatchlist,
    isWatched
  };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};
