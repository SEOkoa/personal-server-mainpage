import React, { useEffect, useState } from 'react';
import MusicPlayer from '../common/MusicPlayer';
import PhotoSlider from '../common/PhotoSlider';
import '../../styles/components/HomePage.css';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/data')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to load data');
      });
  }, []);

  return (
    <div className="home-container">
      <MusicPlayer />
      <hr />
      <PhotoSlider />
      {error && <div className="error-message">{error}</div>}
      <div>
        <h2>Data from API:</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default HomePage;
