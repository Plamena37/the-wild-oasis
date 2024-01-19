import { useState, useEffect } from "react";

export const useCountries = () => {
  const [countries, setCountries] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(`https://restcountries.com/v3.1/all`, {
          signal: signal,
        });

        if (!response.ok)
          throw new Error("Something went wrong with getting countries");

        const data = await response.json();
        if (data.Response === "False") throw new Error("Country not found");

        setCountries(data);
        setError("");
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
    setIsLoading(false);

    return () => {
      controller.abort();
    };
  }, []);

  return { countries, isLoading, error };
};
