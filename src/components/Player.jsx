import React, {useEffect, useState, useRef} from 'react';


const Player = ({tracks, index}) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    
    const audioRef = useRef(null);

    useEffect(() => {
        setIsPlaying(true);
        audioRef.current.pause();
        audioRef.current.load();
    }, [currentTrackIndex]);
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);
    useEffect(()=>{
        setCurrentTrackIndex(index);
    },[index])
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

  return (
    <div>
      <div className="p1">
            <div className="trac">
                <h3 className="trac2">{tracks[currentTrackIndex].name}</h3>
                <p className="trac3">{tracks[currentTrackIndex].artist}</p>
            </div>
            <div className="album-art">
                <img src={`https://cms.samespace.com/assets/${tracks[currentTrackIndex].cover}`}/>
            </div>
            <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={onSeekChange}
        />
        
            <audio
                ref={audioRef}
                src={tracks[currentTrackIndex].url}
                onTimeUpdate={updateTime}
                onLoadedMetadata={onLoadedMetadata}
                autoPlay
            />
            <div className="controls">
                <button className="control-button" onClick={playNext}>&#9664;</button>
                {isPlaying ? (
                    <button className="control-button" onClick={togglePlayPause}>&#10073;&#10073;</button>
                ):(
                    <button className="control-button" onClick={togglePlayPause}>&#9654;</button>
                )}
                <button className="control-button" onClick={playNext}>&#9654;</button>
                {volume==1 ? (
                    <div className="volumeIcon" onClick={()=>setVolume(0)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="#ffffff" d="M533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.7-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"/></svg>
                    </div>
                ):(
                    <div className="volumeIcon" onClick={()=>setVolume(1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill='#ffffff' d="M301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/></svg>

                    </div>
                )} 
            </div>
            
        </div>
    </div>
  )
}

export default Player
