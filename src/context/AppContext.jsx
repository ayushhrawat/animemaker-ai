import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext();
const LanguageContext = createContext();
const StoryContext = createContext();
const AppDataContext = createContext();

export const useTheme = () => useContext(ThemeContext);
export const useLanguage = () => useContext(LanguageContext);
export const useStory = () => useContext(StoryContext);
export const useAppData = () => useContext(AppDataContext);

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  const [storyData, setStoryData] = useState(() => {
    const savedStoryData = localStorage.getItem('storyData');
    return savedStoryData ? JSON.parse(savedStoryData) : {
      story: '',
      selectedStyle: null
    };
  });

  const [appData, setAppData] = useState(() => {
    const savedAppData = localStorage.getItem('appData');
    return savedAppData ? JSON.parse(savedAppData) : {
      storyInput: {
        story: '',
        selectedStyle: null
      },
      characterDesign: {
        characters: [
          { 
            id: 1, 
            name: 'Hero', 
            category: 'male',
            selectedParts: {
              male: {
                bodyType: null,
                faceShape: null,
                eyes: null,
                eyesColour: null,
                hairstyle: null,
                outfit: null,
                accessories: null
              },
              female: {
                bodyType: null,
                faceShape: null,
                eyes: null,
                eyesColour: null,
                hairstyle: null,
                outfit: null,
                accessories: null
              }
            }
          }
        ],
        selectedCharacter: 1
      },
      sceneEditing: {
        scenes: [],
        selectedTheme: null
      },
      voiceover: {
        selectedVoice: null,
        voiceSegments: []
      },
      musicEffects: {
        selectedMusic: null,
        selectedSoundEffects: []
      },
      preview: {
      },
      outputStyle: {
        selectedResolution: null
      }
    };
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('storyData', JSON.stringify(storyData));
  }, [storyData]);

  useEffect(() => {
    localStorage.setItem('appData', JSON.stringify(appData));
  }, [appData]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  const updateStoryData = (data) => {
    setStoryData(prev => ({
      ...prev,
      ...data
    }));
  };

  const updateAppData = useCallback((section, data) => {
    setAppData(prev => {
      const currentSection = prev[section] || {};
      const newData = { ...currentSection, ...data };
      
      if (JSON.stringify(currentSection) === JSON.stringify(newData)) {
        return prev;
      }
      
      return {
        ...prev,
        [section]: newData
      };
    });
  }, []);

  const resetAppData = () => {
    const defaultData = {
      storyInput: {
        story: '',
        selectedStyle: null
      },
      characterDesign: {
        characters: [
          { 
            id: 1, 
            name: 'Hero', 
            category: 'male',
            selectedParts: {
              male: {
                bodyType: null,
                faceShape: null,
                eyes: null,
                eyesColour: null,
                hairstyle: null,
                outfit: null,
                accessories: null
              },
              female: {
                bodyType: null,
                faceShape: null,
                eyes: null,
                eyesColour: null,
                hairstyle: null,
                outfit: null,
                accessories: null
              }
            }
          }
        ],
        selectedCharacter: 1
      },
      sceneEditing: {
        scenes: [],
        selectedTheme: null
      },
      voiceover: {
        selectedVoice: null,
        voiceSegments: []
      },
      musicEffects: {
        selectedMusic: null,
        selectedSoundEffects: []
      },
      preview: {},
      outputStyle: {
        selectedResolution: null
      }
    };
    
    setAppData(defaultData);
    setStoryData({
      story: '',
      selectedStyle: null
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <LanguageContext.Provider value={{ language, changeLanguage }}>
        <StoryContext.Provider value={{ storyData, updateStoryData }}>
          <AppDataContext.Provider value={{ appData, updateAppData, resetAppData }}>
            {children}
          </AppDataContext.Provider>
        </StoryContext.Provider>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
};