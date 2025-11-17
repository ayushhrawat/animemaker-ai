import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage, useAppData } from '../context/AppContext';
import { translations } from '../utils/translations';
import './SceneEditing.css';

const SceneEditing = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { appData, updateAppData } = useAppData();
  const t = translations[language];
  
  const [scenes, setScenes] = useState(() => {
    if (appData.sceneEditing?.scenes && appData.sceneEditing.scenes.length > 0) {
      return appData.sceneEditing.scenes;
    }
    return [{ id: 1, description: '', background: 'City' }];
  });

  useEffect(() => {
    updateAppData('sceneEditing', {
      scenes
    });
  }, [scenes, updateAppData]);

  const backgrounds = [
    { name: 'City', icon: '🏙️' },
    { name: 'Nature', icon: '🏞️' },
    { name: 'Night', icon: '🌃' },
    { name: 'Indoor', icon: '🏠' },
    { name: 'Space', icon: '🌌' },
    { name: 'Beach', icon: '🏖️' }
  ];

  const addScene = () => {
    const newScene = {
      id: Date.now(),
      description: '',
      background: 'City'
    };
    setScenes([...scenes, newScene]);
  };

  const updateScene = (id, field, value) => {
    setScenes(scenes.map(scene =>
      scene.id === id ? { ...scene, [field]: value } : scene
    ));
  };

  const handleNext = () => {
    navigate('/voiceover');
  };

  return (
    <div className="scene-container">
      <header className="screen-header">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>←</button>
        <h2 className="gradient-text">{t.sceneEditing}</h2>
        <div style={{width: '40px'}}></div>
      </header>

      <div className="scene-content fade-in">
        <div className="scenes-timeline">
          {scenes.map((scene, index) => (
            <div key={scene.id} className="card scene-card">
              <div className="scene-number">Scene {index + 1}</div>
              
              <textarea
                className="input-field"
                value={scene.description}
                onChange={(e) => updateScene(scene.id, 'description', e.target.value)}
                placeholder="Scene Description"
                rows="3"
              />

              <div className="scene-options">
                <div className="option-group">
                  <label>Background</label>
                  <div className="background-grid">
                    {backgrounds.map(bg => (
                      <div
                        key={bg.name}
                        className={`background-option ${scene.background === bg.name ? 'active' : ''}`}
                        onClick={() => updateScene(scene.id, 'background', bg.name)}
                      >
                        <div className="background-icon">{bg.icon}</div>
                        <div className="background-name">{bg.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="btn btn-secondary" onClick={addScene} style={{width: '100%', marginBottom: '16px'}}>
          + Add Scene
        </button>
        
        <div style={{textAlign: 'center', marginTop: '20px', marginBottom: '20px'}}>
          <button 
            className="btn btn-primary"
            style={{padding: '10px 20px', fontSize: '14px'}}
            onClick={handleNext}
          >
            {t.next} →
          </button>
        </div>
      </div>
    </div>
  );
};

export default SceneEditing;