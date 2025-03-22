import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import css from './MoviesPage.module.css';

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // URL'deki query parametresini yönetmek için
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || ''; 

  useEffect(() => {
    // Query boşsa (kullanıcı henüz arama yapmamışsa) isteği atmayalım
    if (!query) return;

    async function fetchSearchedMovies() {
      try {
        setLoading(true);
        const data = await searchMovies(query);
        setMovies(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchSearchedMovies();
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    const value = e.target.elements.search.value.trim();
    if (value === '') return;
    // URL'de ?query=... olarak ayarla
    setSearchParams({ query: value });
  };

  return (
    <div className={css.container}>
      <h1>Search movies</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          defaultValue={query}
          placeholder="Enter movie name"
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong: {error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}

export default MoviesPage;
