import { useState, useEffect, useRef } from "react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFetchAll(urls) {
  const prevUrlsRef = useRef([]);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (areEqual(prevUrlsRef.current, urls)) {
      setLoading(false);
      return;
    }
    prevUrlsRef.current = urls;

    const promises = urls.map(url =>
      fetch(baseUrl + url).then(res => {
        if (res.ok) return res.json();
        throw res;
      })
    );

    Promise.all(promises)
      .then(json => setData(json))
      .catch(err => {
        console.error(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [urls]);
  return { data, loading, error };
}

function areEqual(array1, array2) {
  return (
    array1.length === array2.length &&
    array1.every((value, index) => value === array2[index])
  );
}
