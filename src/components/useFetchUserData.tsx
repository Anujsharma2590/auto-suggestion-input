import { useEffect, useState, useCallback } from 'react';
import { UserDataType } from '../types';


type PromiseFunction = (query: string) => Promise<UserDataType[]>;

const useFetchUserData = (
  query: string,
  promise: PromiseFunction,
  autoComplete: boolean
): [any[] | null, (data: any[] | null) => void, any | null] => {
  const [data, setData] = useState<any[] | null>(null);
  const [error, setError] = useState<any | null>(null);

  const fetchData = useCallback(
    async (query: string) => {
      try {
          const response = await promise(query);
        //   if (!response.ok) throw new Error(response.statusText);
        //   const data = await response.json();
        setData(response);
      } catch (err) {
        console.log(err);
        setError(err);
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
  

    fetchData(query);
    return () => {
      
    };
  }, [query, fetchData, autoComplete]);

  return [data, setData, error];
};

export default useFetchUserData;
