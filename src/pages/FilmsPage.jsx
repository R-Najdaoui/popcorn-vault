import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { fetchMovies, fetchGenres } from "../api/movies";
import { useWishlist } from "../contexts/WishlistContext";

function FilmsPage() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortOption, setSortOption] = useState("Most recent");
  const { addToWishlist, isInWishlist } = useWishlist();

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
    <Container>
      <h2>Films ({filteredMovies.length})</h2>

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
            <Card>
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
                <Button
                  variant={isInWishlist(movie.id) ? "success" : "outline-primary"}
                  size="sm"
                  onClick={() => addToWishlist(movie)}
                  disabled={isInWishlist(movie.id)}
                >
                  {isInWishlist(movie.id) ? "✓ Added" : "+"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default FilmsPage;
