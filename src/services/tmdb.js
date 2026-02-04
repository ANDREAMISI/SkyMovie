import axios from "axios";

const API_KEY = "2b885a9532a58a28a488af542033bc1d";

export const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: API_KEY,
    language: "en-US"
  }
});

export const requests = {
  popular: "/movie/popular",
  topRated: "/movie/top_rated",
  upcoming: "/movie/upcoming"
};
