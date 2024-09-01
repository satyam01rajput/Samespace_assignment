import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Player from './Player';

const SongsList = () => {
  const [songs, setSongs] = useState([]);
  const [fsong, setFsongs] = useState([]);
  const [c, setC] = useState(0)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [curIdx, setCurIdx] = useState(0);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get('https://cms.samespace.com/items/songs');
        setSongs(response.data.data);
        setCurIdx(0)
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading songs: {error.message}</div>;

  function songChange(index) {
    setCurIdx(index)
  }

  function change(i) {
    if(i == c) return;
    setC(i);
    var x = []
    if(i==0){
      x = songs.slice().reverse();
    } else {
      x = songs.slice().reverse();
    }
    setSongs(x)
  }
  const handleChange = (event) => {
    setFilter(event.target.value); 
  };

  
  return (
      <div className='main'>
        <div className="container">
          <div className="header">
              <h2 onClick={()=>change(0)}>For You</h2>
              <h2 onClick={()=>change(1)}>Top Tracks</h2>
          </div>
          <input type="text" placeholder="Search Song, Artist" className="search-bar" value={filter} onChange={handleChange}/>
          <h1>Song List</h1>
          <ul className='track-list'>
            {songs.filter((song) => song.name.toLowerCase().includes(filter.toLowerCase())).map((song, index) => (
              <li className="track-item" key={song.id} onClick={()=>songChange(index)}
              style={{
                backgroundColor: curIdx === index ? 'rgba(97, 97, 97, 0.5)' : 'transparent', 
                transition: 'background-color 0.3s ease'
              }}
               >
                <img src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.name} className="track-img"/>
                <div className="track-info">
                    <p className="track-title">{song.name}</p>
                    <p className="track-artist">{song.artist}</p>
                </div>
                <p className="track-duration">NA</p>
            </li>
            ))}
          </ul>
        </div>
        <Player tracks={songs} index={curIdx}/>
        {/* <AudioPlayer tracks={songs}/> */}
      </div>
  );
};

export default SongsList;
