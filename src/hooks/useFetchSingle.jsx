import React, { useEffect, useState } from "react";
import axios from "../axios/axios.js";
function useFetchSingle(url) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        console.log(response.data.result);
        setData(response.data.result);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  console.log("URL:", url);
  console.log("Data:", data);
  console.log("Loading:", loading);
  console.log("Error:", error);

  return { data, loading, error };
}

export default useFetchSingle;