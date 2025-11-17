import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Login from './screens/Login';
import Home from './screens/Home';
import StoryInput from './screens/StoryInput';
import CharacterDesign from './screens/CharacterDesign';
import SceneEditing from './screens/SceneEditing';
import Voiceover from './screens/Voiceover';
import MusicEffects from './screens/MusicEffects';
import Preview from './screens/Preview';
import Profile from './screens/Profile';
import OutputStyle from './screens/OutputStyle';
import Settings from './screens/Settings';
import BottomNav from './components/BottomNav';
import './App.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/story-input" element={<StoryInput />} />
          <Route path="/character-design" element={<CharacterDesign />} />
          <Route path="/scene-editing" element={<SceneEditing />} />
          <Route path="/voiceover" element={<Voiceover />} />
          <Route path="/music-effects" element={<MusicEffects />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/output-style" element={<OutputStyle />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <BottomNav />
      </Router>
    </AppProvider>
  );
}

export default App;
