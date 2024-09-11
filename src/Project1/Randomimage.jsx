import React, { useEffect, useState, useRef, useCallback } from "react";
import "./Project1.css";

const API_KEY = "11152695-04a437277d55589956275cf8c"; // API Key included directly
const URL = `https://pixabay.com/api/?key=${API_KEY}`;

const RandomImage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const sentinelRef = useRef(null);

  const fetchData = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(`${URL}&page=${page}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const json = await response.json();
      if (json.hits.length === 0) return; // Stop fetching if no more data
      setData((prevData) => [...prevData, ...json.hits]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prevPage) => prevPage + 1);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    });
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }
    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [handleObserver]);

  return (
    <div className="card">
      <h1>Random Image</h1>
      <div className="image-list">
        {error && <p className="error">{error}</p>}
        {data.map((apidata) => (
          <div key={apidata.id} className="image-card">
            <img src={apidata.webformatURL} alt={apidata.tags} className="img" />
            <div className="description">{apidata.tags || "No tags available"}</div>
            <div className="comments">Comments: {apidata.comments || 0}</div>
            <div className="like">Likes: {apidata.likes || 0}</div>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      <div ref={sentinelRef} className="sentinel"></div>
    </div>
  );
};

export default RandomImage;
