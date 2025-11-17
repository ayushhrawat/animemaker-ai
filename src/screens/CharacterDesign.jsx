import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage, useAppData } from '../context/AppContext';
import { translations } from '../utils/translations';
import './CharacterDesign.css';

import maleBodyType1 from '../images/characters/Man/body type/skinny.png';
import maleBodyType2 from '../images/characters/Man/body type/fat.png';
import maleBodyType3 from '../images/characters/Man/body type/muscular.png';

import maleFaceShape1 from '../images/characters/Man/face shape/1.png';
import maleFaceShape2 from '../images/characters/Man/face shape/2.png';

import maleEyes1 from '../images/characters/Man/eyes/1.png';
import maleEyes2 from '../images/characters/Man/eyes/2.png';

import maleEyesColour1 from '../images/characters/Man/eyes colour/blue.png';
import maleEyesColour2 from '../images/characters/Man/eyes colour/brown.png';
import maleEyesColour3 from '../images/characters/Man/eyes colour/green.png';
import maleEyesColour4 from '../images/characters/Man/eyes colour/purple.png';
import maleEyesColour5 from '../images/characters/Man/eyes colour/red.png';
import maleEyesColour6 from '../images/characters/Man/eyes colour/yellow.png';

import maleHairstyle1 from '../images/characters/Man/hairstyle/straight.png';
import maleHairstyle2 from '../images/characters/Man/hairstyle/spikey.png';
import maleHairstyle3 from '../images/characters/Man/hairstyle/mid.png';
import maleHairstyle4 from '../images/characters/Man/hairstyle/mid curls.png';
import maleHairstyle5 from '../images/characters/Man/hairstyle/long.png';

import maleOutfit1 from '../images/characters/Man/outfit/casual.png';
import maleOutfit2 from '../images/characters/Man/outfit/blazer.png';

import maleAccessory1 from '../images/characters/Man/accessories/headphone.png';

import femaleBodyType1 from '../images/characters/Woman/body type/slim.png';
import femaleBodyType2 from '../images/characters/Woman/body type/fit.png';
import femaleBodyType3 from '../images/characters/Woman/body type/thick.png';

import femaleFaceShape1 from '../images/characters/Woman/face shape/1.png';
import femaleFaceShape2 from '../images/characters/Woman/face shape/2.png';

import femaleEyes1 from '../images/characters/Woman/eyes/1.png';
import femaleEyes2 from '../images/characters/Woman/eyes/2.png';
import femaleEyes3 from '../images/characters/Woman/eyes/3.png';

import femaleHairstyle1 from '../images/characters/Woman/hairstyle/short.png';
import femaleHairstyle2 from '../images/characters/Woman/hairstyle/pixie.png';
import femaleHairstyle3 from '../images/characters/Woman/hairstyle/mid.png';
import femaleHairstyle4 from '../images/characters/Woman/hairstyle/long.png';

import femaleOutfit1 from '../images/characters/Woman/outfit/frock.png';
import femaleOutfit2 from '../images/characters/Woman/outfit/unifom.png';

import femaleAccessory1 from '../images/characters/Woman/accessories/earrings.png';
import femaleAccessory2 from '../images/characters/Woman/accessories/locket.png';

import maleIcon from '../images/character-icons/Male.png';
import femaleIcon from '../images/character-icons/Female.png';

const CharacterDesign = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { appData, updateAppData } = useAppData();
  const t = translations[language];
  
  const characterParts = {
    male: {
      'body type': [
        { id: 'skinny', name: 'Skinny', image: maleBodyType1 },
        { id: 'fat', name: 'Fat', image: maleBodyType2 },
        { id: 'muscular', name: 'Muscular', image: maleBodyType3 }
      ],
      'face shape': [
        { id: 'shape1', name: 'Shape 1', image: maleFaceShape1 },
        { id: 'shape2', name: 'Shape 2', image: maleFaceShape2 }
      ],
      'eyes': [
        { id: 'eyes1', name: 'Eyes 1', image: maleEyes1 },
        { id: 'eyes2', name: 'Eyes 2', image: maleEyes2 }
      ],
      'eyes colour': [
        { id: 'blue', name: 'Blue', image: maleEyesColour1 },
        { id: 'brown', name: 'Brown', image: maleEyesColour2 },
        { id: 'green', name: 'Green', image: maleEyesColour3 },
        { id: 'purple', name: 'Purple', image: maleEyesColour4 },
        { id: 'red', name: 'Red', image: maleEyesColour5 },
        { id: 'yellow', name: 'Yellow', image: maleEyesColour6 }
      ],
      'hairstyle': [
        { id: 'straight', name: 'Straight', image: maleHairstyle1 },
        { id: 'spikey', name: 'Spikey', image: maleHairstyle2 },
        { id: 'mid', name: 'Mid', image: maleHairstyle3 },
        { id: 'mid curls', name: 'Mid Curls', image: maleHairstyle4 },
        { id: 'long', name: 'Long', image: maleHairstyle5 }
      ],
      'outfit': [
        { id: 'casual', name: 'Casual', image: maleOutfit1 },
        { id: 'blazer', name: 'Blazer', image: maleOutfit2 }
      ],
      'accessories': [
        { id: 'headphone', name: 'Headphone', image: maleAccessory1 }
      ]
    },
    female: {
      'body type': [
        { id: 'slim', name: 'Slim', image: femaleBodyType1 },
        { id: 'fit', name: 'Fit', image: femaleBodyType2 },
        { id: 'thick', name: 'Thick', image: femaleBodyType3 }
      ],
      'face shape': [
        { id: 'shape1', name: 'Shape 1', image: femaleFaceShape1 },
        { id: 'shape2', name: 'Shape 2', image: femaleFaceShape2 }
      ],
      'eyes': [
        { id: 'eyes1', name: 'Eyes 1', image: femaleEyes1 },
        { id: 'eyes2', name: 'Eyes 2', image: femaleEyes2 },
        { id: 'eyes3', name: 'Eyes 3', image: femaleEyes3 }
      ],
      'hairstyle': [
        { id: 'short', name: 'Short', image: femaleHairstyle1 },
        { id: 'pixie', name: 'Pixie', image: femaleHairstyle2 },
        { id: 'mid', name: 'Mid', image: femaleHairstyle3 },
        { id: 'long', name: 'Long', image: femaleHairstyle4 }
      ],
      'outfit': [
        { id: 'frock', name: 'Frock', image: femaleOutfit1 },
        { id: 'uniform', name: 'Uniform', image: femaleOutfit2 }
      ],
      'accessories': [
        { id: 'earrings', name: 'Earrings', image: femaleAccessory1 },
        { id: 'locket', name: 'Locket', image: femaleAccessory2 }
      ]
    }
  };
  
  const [characters, setCharacters] = useState([
    { 
      id: 1, 
      name: 'Character 1', 
      category: 'male',
      selectedParts: {
        male: {
          'body type': null,
          'face shape': null,
          'eyes': null,
          'eyes colour': null,
          'hairstyle': null,
          'outfit': null,
          'accessories': null
        },
        female: {
          'body type': null,
          'face shape': null,
          'eyes': null,
          'eyes colour': null,
          'hairstyle': null,
          'outfit': null,
          'accessories': null
        }
      }
    }
  ]);
  
  const [selectedCharacter, setSelectedCharacter] = useState(1);
  const [activeCategory, setActiveCategory] = useState('male');
  const [activePartType, setActivePartType] = useState('body type');
  
  const handleNext = () => {
    updateAppData('characterDesign', {
      characters,
      selectedCharacter,
      activeCategory
    });
    
    navigate('/scene-editing');
  };

  const currentCharacter = characters.find(char => char.id === selectedCharacter) || characters[0];
  
  const toggleCategory = (category) => {
    setActiveCategory(category);
    setCharacters(chars => chars.map(char => 
      char.id === selectedCharacter ? {...char, category} : char
    ));
  };
  
  const selectPart = (partType, partId) => {
    setCharacters(chars => chars.map(char => {
      if (char.id === selectedCharacter) {
        return {
          ...char,
          selectedParts: {
            ...char.selectedParts,
            [char.category]: {
              ...char.selectedParts[char.category],
              [partType]: partId
            }
          }
        };
      }
      return char;
    }));
  };

  const addCharacter = () => {
    const newId = Math.max(...characters.map(c => c.id)) + 1;
    const newCharacter = {
      id: newId,
      name: `Character ${newId}`,
      category: 'male',
      selectedParts: {
        male: {
          'body type': null,
          'face shape': null,
          'eyes': null,
          'eyes colour': null,
          'hairstyle': null,
          'outfit': null,
          'accessories': null
        },
        female: {
          'body type': null,
          'face shape': null,
          'eyes': null,
          'eyes colour': null,
          'hairstyle': null,
          'outfit': null,
          'accessories': null
        }
      }
    };
    setCharacters([...characters, newCharacter]);
    setSelectedCharacter(newId);
  };

  const deleteCharacter = (id) => {
    if (characters.length <= 1) return;
    const updatedCharacters = characters.filter(char => char.id !== id);
    setCharacters(updatedCharacters);
    if (selectedCharacter === id) {
      setSelectedCharacter(updatedCharacters[0].id);
    }
  };

  const updateCharacterName = (id, name) => {
    setCharacters(chars => chars.map(char => 
      char.id === id ? {...char, name} : char
    ));
  };

  const getSelectedPartImage = (category, partType) => {
    const selectedPartId = currentCharacter.selectedParts[category][partType];
    if (!selectedPartId) return null;
    
    const part = characterParts[category][partType].find(p => p.id === selectedPartId);
    return part ? part.image : null;
  };

  const getAvailableParts = () => {
    return characterParts[activeCategory][activePartType] || [];
  };

  const partTypes = Object.keys(characterParts[activeCategory] || {});

  return (
    <div className="character-container">
      <header className="screen-header">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>←</button>
        <h2 className="gradient-text">{t.characterDesign}</h2>
        <div style={{width: '40px'}}></div>
      </header>

      <div className="character-content fade-in">
        {/* Character Selection */}
        <div className="character-selection card">
          <div className="character-tabs">
            {characters.map(character => (
              <div 
                key={character.id}
                className={`character-tab ${selectedCharacter === character.id ? 'active' : ''}`}
                onClick={() => setSelectedCharacter(character.id)}
              >
                <span>{character.name}</span>
                {characters.length > 1 && (
                  <button 
                    className="delete-char-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCharacter(character.id);
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button className="add-char-btn" onClick={addCharacter}>+</button>
          </div>
          
          <div className="character-name-input">
            <input
              type="text"
              className="input-field"
              value={currentCharacter.name}
              onChange={(e) => updateCharacterName(selectedCharacter, e.target.value)}
              placeholder="Character Name"
            />
          </div>
        </div>

        {/* Character Category Selection */}
        <div className="category-selection card">
          <h3>Select Category</h3>
          <div className="category-options">
            <div 
              className={`category-option ${activeCategory === 'male' ? 'active' : ''}`}
              onClick={() => toggleCategory('male')}
            >
              <img 
                src={maleIcon} 
                alt="Male" 
                className="category-icon" 
                onError={(e) => {
                  console.error('Error loading male icon:', e);
                  e.target.style.display = 'none';
                }}
              />
              <span>Male</span>
            </div>
            <div 
              className={`category-option ${activeCategory === 'female' ? 'active' : ''}`}
              onClick={() => toggleCategory('female')}
            >
              <img 
                src={femaleIcon} 
                alt="Female" 
                className="category-icon" 
                onError={(e) => {
                  console.error('Error loading female icon:', e);
                  e.target.style.display = 'none';
                }}
              />
              <span>Female</span>
            </div>
          </div>
        </div>

        {/* Character Preview */}
        <div className="character-preview card">
          <h3>Character Preview</h3>
          <div className="preview-container">
            <div className="character-display">
              {partTypes.map(partType => {
                const imageSrc = getSelectedPartImage(activeCategory, partType);
                return imageSrc ? (
                  <img 
                    key={partType}
                    src={imageSrc}
                    alt={partType}
                    className="character-part"
                    style={{ zIndex: partTypes.indexOf(partType) }}
                    onError={(e) => {
                      console.error('Error loading character part image:', e);
                      // Optional: Show a fallback image or placeholder
                      e.target.style.display = 'none';
                    }}
                  />
                ) : null;
              })}
            </div>
          </div>
        </div>

        {/* Character Customization */}
        <div className="customization-section card">
          <h3>Customize Character</h3>
          
          {/* Part Type Selection */}
          <div className="part-type-selection">
            <div className="part-type-tabs">
              {partTypes.map(partType => (
                <button
                  key={partType}
                  className={`part-type-tab ${activePartType === partType ? 'active' : ''}`}
                  onClick={() => setActivePartType(partType)}
                >
                  {partType}
                </button>
              ))}
            </div>
          </div>

          {/* Part Selection */}
          <div className="part-selection">
            <div className="part-grid">
              {getAvailableParts().map(part => (
                <div
                  key={part.id}
                  className={`part-option ${currentCharacter.selectedParts[activeCategory][activePartType] === part.id ? 'active' : ''}`}
                  onClick={() => selectPart(activePartType, part.id)}
                >
                  <img 
                    src={part.image} 
                    alt={part.name} 
                    className="part-image" 
                    onError={(e) => {
                      console.error('Error loading character part image:', e);
                      // Optional: Show a fallback image or placeholder
                      e.target.style.display = 'none';
                    }}
                  />
                  <span className="part-name">{part.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Next Button */}
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

export default CharacterDesign;