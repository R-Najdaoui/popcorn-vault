import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { fetchMovies, fetchGenres } from "../api/movies";
import { useWatchlist } from "../contexts/WatchlistContext";

function FilmsPage() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortOption, setSortOption] = useState("Most recent");
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  useEffect(() => {
    const getMoviesAndGenres = async () => {
      const moviesData = await fetchMovies(5); 
      setMovies(moviesData);
      const genresData = await fetchGenres();
      setGenres(genresData);
    };
    getMoviesAndGenres();
  }, []);


  let filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  if (selectedGenre !== "All") {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.genre_ids.includes(Number(selectedGenre))
    );
  }

  filteredMovies.sort((a, b) => {
    switch (sortOption) {
      case "Most recent":
        return new Date(b.release_date) - new Date(a.release_date);
      case "Oldest":
        return new Date(a.release_date) - new Date(b.release_date);
      case "Highest rating":
        return b.vote_average - a.vote_average;
      case "Lowest rating":
        return a.vote_average - b.vote_average;
      default:
        return 0;
    }
  });

  return (
    <Container className="page-content">
      <h2>Movies ({filteredMovies.length})</h2>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="All">All genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option>Most recent</option>
            <option>Oldest</option>
            <option>Highest rating</option>
            <option>Lowest rating</option>
          </Form.Select>
        </Col>
      </Row>

      <Row>
        {filteredMovies.map((movie) => (
          <Col md={3} className="mb-4" key={movie.id}>
            <Card className="movie-card" style={{ position: 'relative', overflow: 'hidden' }}>
              <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                  Year: {movie.release_date?.split("-")[0]} <br />
                  Rating: {movie.vote_average}
                </Card.Text>
                <button
                  className={`watchlist-btn ${isInWatchlist(movie.id) ? 'in-watchlist' : ''}`}
                  onClick={() => {
                    if (isInWatchlist(movie.id)) {
                      removeFromWatchlist(movie.id);
                    } else {
                      addToWatchlist(movie);
                    }
                  }}
                  style={{
                    border: 'none',
                    background: isInWatchlist(movie.id) ? 'linear-gradient(45deg, #ff6b6b, #ee5a52)' : 'transparent',
                    color: isInWatchlist(movie.id) ? 'white' : '#6c757d',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    boxShadow: isInWatchlist(movie.id) ? '0 4px 12px rgba(255, 107, 107, 0.3)' : 'none',
                    cursor: 'pointer',
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    zIndex: 10
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.1)';
                    if (!isInWatchlist(movie.id)) {
                      e.target.style.background = 'linear-gradient(45deg, #ff6b6b, #ee5a52)';
                      e.target.style.color = 'white';
                      e.target.style.boxShadow = '0 4px 12px rgba(255, 107, 107, 0.3)';
                    } else {
                      e.target.style.boxShadow = '0 6px 16px rgba(255, 107, 107, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    if (!isInWatchlist(movie.id)) {
                      e.target.style.background = 'transparent';
                      e.target.style.color = '#6c757d';
                      e.target.style.boxShadow = 'none';
                    } else {
                      e.target.style.boxShadow = '0 4px 12px rgba(255, 107, 107, 0.3)';
                    }
                  }}
                >
                  <i
                    className={`bi ${isInWatchlist(movie.id) ? 'bi-heart-fill' : 'bi-heart'}`}
                    style={{
                      fontSize: '18px',
                      transition: 'all 0.3s ease'
                    }}
                  ></i>
                </button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default FilmsPage;
