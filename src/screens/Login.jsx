import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/AppContext';
import { translations } from '../utils/translations';
import logoImage from '../images/logo/logo.png'; // Import the logo as a module
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '', 
    confirmPassword: '',
    username: ''
  });

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
        callback: handleGoogleResponse
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isSignup) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match");
        return;
      }
      
      const userData = {
        username: formData.username || formData.email.split('@')[0],
        email: formData.email
      };
      localStorage.setItem('userData', JSON.stringify(userData));
    } else {
      const userData = {
        username: formData.email.split('@')[0],
        email: formData.email
      };
      localStorage.setItem('userData', JSON.stringify(userData));
    }
    
    navigate('/home');
  };

  const handleGoogleSignIn = () => {
    if (window.google) {
      window.google.accounts.id.signIn();
    } else {
      console.log('Google Sign In clicked');
      const userData = {
        username: 'Google User',
        email: 'google.user@example.com'
      };
      localStorage.setItem('userData', JSON.stringify(userData));
      navigate('/home');
    }
  };
  
  const handleGoogleResponse = (response) => {
    console.log('Google Sign In successful', response);
    
    const userData = {
      username: 'Google User',
      email: 'google.user@example.com'
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    
    navigate('/home');
  };

  return (
    <div className="login-container">
      <div className="login-box fade-in">
        <div className="logo-section">
          <img src={logoImage} alt="AnimeMaker AI Logo" className="app-logo" />
          <h1 className="login-title">AnimeMaker AI</h1>
          <p style={{color: 'var(--text-secondary)', fontSize: '16px'}}>{t.welcome}</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {isSignup && (
            <div className="form-group">
              <label>{t.username || 'Username'}</label>
              <input
                type="text"
                className="input-field"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                required={isSignup}
              />
            </div>
          )}

          <div className="form-group">
            <label>{t.email}</label>
            <input
              type="email"
              className="input-field"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>{t.password}</label>
            <input
              type="password"
              className="input-field"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          {isSignup && (
            <div className="form-group">
              <label>{t.confirmPassword}</label>
              <input
                type="password"
                className="input-field"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
              />
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={{width: '100%', marginTop: '8px'}}>
            {isSignup ? t.signup : t.login}
          </button>

          <div className="divider">
            <div className="divider-line"></div>
            <span className="divider-text">or</span>
            <div className="divider-line"></div>
          </div>

          <button 
            type="button" 
            className="btn btn-secondary google-signin-btn" 
            style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'}}
            onClick={handleGoogleSignIn}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
              <path d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707 0-.593.102-1.17.282-1.709V4.958H.957C.347 6.173 0 7.548 0 9c0 1.452.348 2.827.957 4.042l3.007-2.335z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.96 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            {t.continueWithGoogle}
          </button>

          <div className="switch-mode">
            {isSignup ? t.haveAccount : t.noAccount}{' '}
            <span onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? t.login : t.signup}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;