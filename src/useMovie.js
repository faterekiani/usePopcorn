import { useEffect, useState } from "react";

const KEY = "306af9f5";

export function useMovie(query, callBack) {
  const [movies, setMovies] = useState([]); //left box
  const [isLoading, setIsLoading] = useState(false); //Loading for data fetching
  const [error, setError] = useState("");
  // fetch data
  useEffect(
    function () {
      callBack?.(); //   handleCloseMovie();

      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&S=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies..");

          const data = await res.json();

          if (data.Response == false) throw new Error("Failed to fetch");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();

      // cleanUp function
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}
