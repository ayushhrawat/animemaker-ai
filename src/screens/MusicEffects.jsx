import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage, useAppData } from '../context/AppContext';
import { translations } from '../utils/translations';
import './MusicEffects.css';

import epicAdventure from '../music/epic_adventure.mp3';
import gentleBreeze from '../music/gentle_breeze.mp3';
import dramaticTension from '../music/dramatic_tension.mp3';
import happyMoments from '../music/happy_moments.mp3';

import explosionSound from '../sound-effects/explosion.mp3';
import swordSound from '../sound-effects/sword.mp3';
import waterSound from '../sound-effects/water.mp3';
import windSound from '../sound-effects/wind.mp3';
import fireSound from '../sound-effects/fire.mp3';
import lightningSound from '../sound-effects/lightning.mp3';

const MusicEffects = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { appData, updateAppData } = useAppData();
  const t = translations[language];
  
  const [selectedMusic, setSelectedMusic] = useState(
    appData.musicEffects?.selectedMusic || 'Epic Adventure'
  );
  
  const [selectedSoundEffects, setSelectedSoundEffects] = useState(
    appData.musicEffects?.selectedSoundEffects || []
  );
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [activeSoundEffect, setActiveSoundEffect] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    updateAppData('musicEffects', {
      selectedMusic,
      selectedSoundEffects
    });
  }, [selectedMusic, selectedSoundEffects]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const musicTracks = [
    { name: 'Epic Adventure', mood: '⚔️ Action', duration: '3:45', file: epicAdventure },
    { name: 'Gentle Breeze', mood: '🌸 Calm', duration: '2:30', file: gentleBreeze },
    { name: 'Dramatic Tension', mood: '😰 Suspense', duration: '4:15', file: dramaticTension },
    { name: 'Happy Moments', mood: '😊 Upbeat', duration: '3:00', file: happyMoments },
  ];

  const soundEffects = [
    { name: 'Explosion', emoji: '💥', file: explosionSound },
    { name: 'Sword Clash', emoji: '⚔️', file: swordSound },
    { name: 'Water', emoji: '🌊', file: waterSound },
    { name: 'Wind', emoji: '🌬️', file: windSound },
    { name: 'Fire', emoji: '🔥', file: fireSound },
    { name: 'Lightning', emoji: '⚡', file: lightningSound }
  ];

  const playMusicSample = (musicFile, trackName) => {
    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    setSelectedMusic(trackName);

    try {
      const audio = new Audio(musicFile);
      audioRef.current = audio;
      
      // Set up event listeners before playing
      audio.addEventListener('play', () => {
        setIsPlaying(true);
        setCurrentTrack(trackName);
      });
      
      audio.addEventListener('ended', () => {
        audioRef.current = null;
        setIsPlaying(false);
        setCurrentTrack(null);
      });
      
      audio.addEventListener('error', (error) => {
        console.error('Error playing audio:', error);
        alert('Could not play the audio sample. Please make sure the audio files are properly loaded.');
        audioRef.current = null;
        setIsPlaying(false);
        setCurrentTrack(null);
      });
      
      // Play the audio
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Error playing audio:', error);
          alert('Could not play the audio sample. Please make sure the audio files are properly loaded.');
          audioRef.current = null;
          setIsPlaying(false);
          setCurrentTrack(null);
        });
      }
    } catch (error) {
      console.error('Error creating audio:', error);
      alert('Could not play the audio sample. Please make sure the audio files are properly loaded.');
      audioRef.current = null;
      setIsPlaying(false);
      setCurrentTrack(null);
    }
  };

  const pauseMusicSample = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlayback = (musicFile, trackName) => {
    if (isPlaying && currentTrack === trackName) {
      pauseMusicSample();
    } else {
      playMusicSample(musicFile, trackName);
    }
  };

  const playSoundEffect = (soundFile, effectName) => {
    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setActiveSoundEffect(null);
    }
    
    setActiveSoundEffect(effectName);
    
    if (!selectedSoundEffects.includes(effectName)) {
      setSelectedSoundEffects([...selectedSoundEffects, effectName]);
    }
    
    try {
      const audio = new Audio(soundFile);
      audioRef.current = audio;
      
      // Set up event listeners before playing
      audio.addEventListener('ended', () => {
        audioRef.current = null;
        setActiveSoundEffect(null);
      });
      
      audio.addEventListener('error', (error) => {
        console.error('Error playing sound effect:', error);
        alert('Could not play the sound effect. Please make sure the audio files are properly loaded.');
        setActiveSoundEffect(null);
        audioRef.current = null;
      });
      
      // Play the audio
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Error playing sound effect:', error);
          alert('Could not play the sound effect. Please make sure the audio files are properly loaded.');
          setActiveSoundEffect(null);
          audioRef.current = null;
        });
      }
    } catch (error) {
      console.error('Error creating sound effect:', error);
      alert('Could not play the sound effect. Please make sure the audio files are properly loaded.');
      setActiveSoundEffect(null);
      audioRef.current = null;
    }
  };

  return (
    <div className="music-container">
      <header className="screen-header">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>←</button>
        <h2 className="gradient-text">{t.musicEffects}</h2>
        <div style={{width: '40px'}}></div>
      </header>

      <div className="music-content fade-in">
        <div className="card" style={{maxWidth: '100%', marginBottom: '20px'}}>
          <h3 style={{marginBottom: '10px', color: '#000000'}}>{t.backgroundMusic}</h3>
          
          <div className="music-list">
            {musicTracks.map((track) => (
              <div
                key={track.name}
                className={`music-track ${selectedMusic === track.name ? 'active' : ''}`}
                onClick={() => setSelectedMusic(track.name)}
              >
                <div>
                  <h4>{track.name}</h4>
                  <p style={{color: 'var(--text-secondary)', fontSize: '14px'}}>
                    {track.mood} • {track.duration}
                  </p>
                </div>
                <button className="btn btn-secondary" style={{padding: '6px 16px', fontSize: '12px'}} onClick={(e) => {
                  e.stopPropagation();
                  togglePlayback(track.file, track.name);
                }}>
                  {isPlaying && currentTrack === track.name ? '⏸' : '▶'} {t.preview}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{maxWidth: '100%'}}>
          <h3 style={{marginBottom: '10px', color: '#000000'}}>{t.soundEffects}</h3>
          
          <div className="sound-effects-grid">
            {soundEffects.map((effect) => (
              <div
                key={effect.name}
                className={`sound-effect ${activeSoundEffect === effect.name ? 'active' : ''} ${selectedSoundEffects.includes(effect.name) ? 'selected' : ''}`}
                onClick={() => playSoundEffect(effect.file, effect.name)}
              >
                <div className="effect-emoji">{effect.emoji}</div>
                <div className="effect-name">{effect.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="action-buttons">
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/preview')}
          >
            {t.next} →
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicEffects;