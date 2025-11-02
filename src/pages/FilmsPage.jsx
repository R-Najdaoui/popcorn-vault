import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { fetchMovies } from "../api/movies";

function FilmsPage() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovies();
      setMovies(data);
    };
    getMovies();
  }, []);

  // Filtered movies by search
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <h2>Films ({filteredMovies.length})</h2>

      {/* Search & Filters */}
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
          <Form.Select>
            <option>All genres</option>
            {/* Add genre filter later */}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select>
            <option>Most recent</option>
            <option>Oldest</option>
            <option>Highest rating</option>
            <option>Lowest rating</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Movie cards */}
      <Row>
        {filteredMovies.map(movie => (
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
                  Rating: {movie.vote_average} <br />
                  {/* Genre and platform can be added later */}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default FilmsPage;
