import { useEffect, useState, useCallback } from 'react';


type PromiseFunction = (query: string, signal: AbortSignal) => Promise<Response>;

const useFetchUserData = (
  query: string,
  promise: PromiseFunction,
  autoComplete: boolean
): [any[] | null, (data: any[] | null) => void, any | null] => {
  const [data, setData] = useState<any[] | null>(null);
  const [error, setError] = useState<any | null>(null);

  const fetchData = useCallback(
    async (query: string, signal: AbortSignal) => {
      try {
          const response = await promise(query, signal);
          if (!response.ok) throw new Error(response.statusText);
          const data = await response.json();
        setData(data.results);
      } catch (err) {
        console.log(err);
        if (!signal.aborted) setError(err);
      }
    }, 
    []
  );

  useEffect(() => {
    if (!query || !autoComplete) {
      setData(null);
      setError(null);
      return;
    }
    const controller = new AbortController();
    const signal = controller.signal;

    fetchData(query, signal);
    return () => {
      controller.abort();
    };
  }, [query, fetchData, autoComplete]);

  return [data, setData, error];
};

export default useFetchUserData;
