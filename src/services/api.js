import axios from 'axios';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM2YzMGJjZDgyNzFlZDEzMDIzZWM1OWUwYTFkZGJlMCIsIm5iZiI6MTc0MjY1OTQ0Ny41MDQ5OTk5LCJzdWIiOiI2N2RlZGY3NzRhYTk2NmNlOGM2OWM5ZjgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.44F3DhzMdwp_K8YY17XLErfbmM-uRT9UTesIxgh9lTY'; 
// Yukarıda 'Bearer ....' token'ı kastediyoruz. 
// "api_read_access_token" (v4) olan Access Token'ı buraya koymalısın.
// Bu veriyi .env dosyasında saklaman daha güvenli, ancak demo için direkt burada da kullanabilirsin.

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] = `Bearer ${API_KEY}`;

export async function getTrendingMovies() {
  // Trend olan filmler (günün en popülerleri)
  const response = await axios.get('/trending/movie/day');
  return response.data.results;
}

export async function searchMovies(query) {
  // Kelimeye göre film arama
  const response = await axios.get('/search/movie', {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
  });
  return response.data.results;
}

export async function getMovieDetails(movieId) {
  // Film detayları
  const response = await axios.get(`/movie/${movieId}`, {
    params: {
      language: 'en-US',
    },
  });
  return response.data;
}

export async function getMovieCredits(movieId) {
  // Oyuncu kadrosu
  const response = await axios.get(`/movie/${movieId}/credits`, {
    params: {
      language: 'en-US',
    },
  });
  return response.data.cast; // cast dizisi
}

export async function getMovieReviews(movieId) {
  // Film incelemeleri
  const response = await axios.get(`/movie/${movieId}/reviews`, {
    params: {
      language: 'en-US',
      page: 1,
    },
  });
  return response.data.results;
}
