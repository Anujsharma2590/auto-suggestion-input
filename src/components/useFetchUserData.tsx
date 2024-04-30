import { useEffect, useState, useCallback } from "react";
import { UserDataType } from "../types";

const useFetchUserData = (
  query: string,
  promise: (query: string) => Promise<UserDataType[]>,
  autoComplete: boolean
) => {
  const [data, setData] = useState<UserDataType[] | null>(null);
  const [error, setError] = useState<any | null>(null);

  const fetchData = useCallback(async (query: string) => {
    try {
      const response = await promise(query);
      //   if (!response.ok) throw new Error(response.statusText);
      //   const data = await response.json();
      setData(response);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  }, [promise]);

  useEffect(() => {
    if (!query || !autoComplete) {
      setData(null);
      setError(null);
      return;
    }

    fetchData(query);
    return () => {};
  }, [query, fetchData, autoComplete]);

  return [data, error];
};

export default useFetchUserData;
