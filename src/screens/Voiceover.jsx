import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage, useAppData } from '../context/AppContext';
import { translations } from '../utils/translations';
import './Voiceover.css';

import childBoyImage from '../images/voiceover/child_boy.png';
import childGirlImage from '../images/voiceover/child_girl.png';
import manImage from '../images/voiceover/man.png';
import womanImage from '../images/voiceover/woman.png';
import olderManImage from '../images/voiceover/older_man.png';
import olderWomanImage from '../images/voiceover/older_woman.png';

const Voiceover = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { appData, updateAppData } = useAppData();
  const t = translations[language];
  
  const [selectedVoice, setSelectedVoice] = useState(
    appData.voiceover?.selectedVoice || 'child_boy'
  );
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVoice, setCurrentVoice] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    updateAppData('voiceover', {
      selectedVoice
    });
  }, [selectedVoice]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const voices = [
    { 
      id: 'child_boy', 
      name: 'Child Boy', 
      image: childBoyImage, 
      sample: '/src/audio/child_boy.mp3' 
    },
    { 
      id: 'child_girl', 
      name: 'Child Girl', 
      image: childGirlImage, 
      sample: '/src/audio/child_girl.mp3' 
    },
    { 
      id: 'man', 
      name: 'Man', 
      image: manImage, 
      sample: '/src/audio/man.mp3' 
    },
    { 
      id: 'woman', 
      name: 'Woman', 
      image: womanImage, 
      sample: '/src/audio/woman.mp3' 
    },
    { 
      id: 'older_man', 
      name: 'Older Man', 
      image: olderManImage, 
      sample: '/src/audio/older_man.mp3' 
    },
    { 
      id: 'older_woman', 
      name: 'Older Woman', 
      image: olderWomanImage, 
      sample: '/src/audio/older_woman.mp3' 
    }
  ];

  const playSample = (samplePath, voiceId) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    setIsPlaying(true);
    setCurrentVoice(voiceId);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const speech = new SpeechSynthesisUtterance();
      speech.text = "This is a sample voice for your anime character.";
      speech.volume = 1;
      speech.rate = 1;
      speech.pitch = 1;
      
      if (voiceId.includes('child')) {
        speech.pitch = 1.5;
      } else if (voiceId.includes('older')) {
        speech.rate = 0.8;
        speech.pitch = 0.8;
      } else if (voiceId === 'man') {
        speech.pitch = 0.7;
      } else if (voiceId === 'woman') {
        speech.pitch = 1.2;
      }
      
      speech.onend = () => {
        setIsPlaying(false);
        setCurrentVoice(null);
      };
      
      window.speechSynthesis.speak(speech);
    } else {
      alert('Text-to-speech not supported in your browser.');
      setIsPlaying(false);
      setCurrentVoice(null);
    }
  };

  const pauseSample = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    
    setIsPlaying(false);
    setCurrentVoice(null);
  };

  const togglePlayback = (samplePath, voiceId) => {
    if (isPlaying && currentVoice === voiceId) {
      pauseSample();
    } else {
      playSample(samplePath, voiceId);
    }
  };

  return (
    <div className="voiceover-container">
      <header className="screen-header">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>←</button>
        <h2 className="gradient-text">{t.voiceover}</h2>
        <div style={{width: '40px'}}></div>
      </header>

      <div className="voiceover-content fade-in">
        <div className="card" style={{maxWidth: '100%', marginBottom: '20px'}}>
          <h3 style={{marginBottom: '10px'}}>{t.selectVoice}</h3>
          
          <div className="voices-list">
            {voices.map((voice) => (
              <div
                key={voice.id}
                className={`voice-card ${selectedVoice === voice.id ? 'active' : ''}`}
                onClick={() => setSelectedVoice(voice.id)}
              >
                <div className="voice-info">
                  <img 
                    src={voice.image} 
                    alt={voice.name} 
                    className="voice-image"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.marginLeft = '0';
                    }}
                  />
                  <div className="voice-details">
                    <h4 className="voice-name">{voice.name}</h4>
                  </div>
                </div>
                <button 
                  className="btn btn-secondary preview-button" 
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlayback(voice.sample, voice.id);
                  }}
                >
                  {isPlaying && currentVoice === voice.id ? '⏸' : '▶'} {t.preview}
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div style={{textAlign: 'center', marginTop: '20px', marginBottom: '20px'}}>
          <button 
            className="btn btn-primary"
            style={{padding: '10px 20px', fontSize: '14px'}}
            onClick={() => navigate('/music-effects')}
          >
            {t.next} →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Voiceover;