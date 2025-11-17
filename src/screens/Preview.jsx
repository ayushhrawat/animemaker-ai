import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage, useAppData } from '../context/AppContext';
import { translations } from '../utils/translations';
import './Preview.css';

import animeDemoVideo from '../videos/anime_demo.mp4';
import realisticDemoVideo from '../videos/realistic_demo.mp4';

const Preview = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { appData } = useAppData();
  const t = translations[language];
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('anime_demo');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const { story, selectedStyle } = appData.storyInput || {};
    
    let video = 'anime_demo';
    
    if (selectedStyle) {
      if (selectedStyle === 'realistic') {
        video = 'realistic_demo';
      }
      else {
        video = 'anime_demo';
      }
    }
    
    setCurrentVideo(video);
  }, [appData]);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e) => {
    if (videoRef.current && duration) {
      const progressBar = e.currentTarget;
      const clickPosition = e.nativeEvent.offsetX;
      const progressBarWidth = progressBar.offsetWidth;
      const newTime = (clickPosition / progressBarWidth) * duration;
      
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getVideoSource = () => {
    return currentVideo === 'anime_demo' ? animeDemoVideo : realisticDemoVideo;
  };

  return (
    <div className="preview-container">
      <header className="screen-header">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>←</button>
        <h2 className="gradient-text">{t.previewScreen}</h2>
        <div style={{width: '40px'}}></div>
      </header>

      <div className="preview-content fade-in">
        <div className="video-player">
          <div className="player-screen">
            <div className="anime-preview">
              <div className="preview-placeholder">
                <video 
                  ref={videoRef}
                  src={getVideoSource()}
                  style={{ width: '100%', height: 'auto', maxHeight: '300px', borderRadius: '12px' }}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                  onLoadedMetadata={handleLoadedMetadata}
                  onTimeUpdate={handleTimeUpdate}
                />
                <div style={{marginTop: '15px', fontSize: '16px', color: 'var(--text-secondary)'}}>
                  {currentVideo === 'anime_demo' ? 'Anime Style Demo' : 'Realistic Style Demo'}
                </div>
              </div>
            </div>
            
            <div className="player-controls">
              <div className="timeline" onClick={handleSeek}>
                <div 
                  className="timeline-progress" 
                  style={{width: duration ? `${(currentTime / duration) * 100}%` : '0%'}}
                ></div>
              </div>
              
              <div className="control-buttons">
                <button className="control-btn" onClick={togglePlayPause}>
                  {isPlaying ? '⏸️ ' + t.pause : '▶️ ' + t.play}
                </button>
                <button className="control-btn" onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = 0;
                  }
                }}>🔄 {t.restart}</button>
                <span className="time-display">{formatTime(currentTime)} / {formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="preview-actions">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            ←
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/output-style')}>
            {t.export} →
          </button>
        </div>

        <div className="project-info card">
          <h3 style={{marginBottom: '15px'}}>Project Details</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Scenes:</span>
              <span className="info-value">5</span>
            </div>
            <div className="info-item">
              <span className="info-label">Characters:</span>
              <span className="info-value">3</span>
            </div>
            <div className="info-item">
              <span className="info-label">Duration:</span>
              <span className="info-value">2:15</span>
            </div>
            <div className="info-item">
              <span className="info-label">Genre:</span>
              <span className="info-value">Action</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;