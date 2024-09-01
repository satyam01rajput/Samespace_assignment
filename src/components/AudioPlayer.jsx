import React, { useState, useRef, useEffect } from 'react';

const AudioPlayer = ({ tracks }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
  };

  const playPrev = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === 0 ? tracks.length - 1 : prevIndex - 1
    );
  };

  const onVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  const onSeekChange = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  const updateTime = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const onLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  useEffect(() => {
    setIsPlaying(false);
    audioRef.current.pause();
    audioRef.current.load();
  }, [currentTrackIndex]);

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        src={tracks[currentTrackIndex].url}
        onTimeUpdate={updateTime}
        onLoadedMetadata={onLoadedMetadata}
      />
      <div className="controls">
        <button onClick={playPrev}>Prev</button>
        <button onClick={togglePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button onClick={playNext}>Next</button>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={onSeekChange}
        />

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={onVolumeChange}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
