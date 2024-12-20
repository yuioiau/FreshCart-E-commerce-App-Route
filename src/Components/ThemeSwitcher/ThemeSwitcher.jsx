import React, { useState, useEffect } from 'react';

export default function ThemeSwitcher({ logOut }) {
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState('light');
    const [mainColor, setMainColor] = useState('#0aad0a');

    useEffect(() => {
        // Load saved preferences
        const savedTheme = localStorage.getItem('theme') || 'light';
        const savedColor = localStorage.getItem('mainColor') || '#0aad0a';
        
        applyTheme(savedTheme);
        applyMainColor(savedColor);
    }, []);

    const applyTheme = (newTheme) => {
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const applyMainColor = (color) => {
        setMainColor(color);
        document.documentElement.style.setProperty('--main-color', color);
        document.documentElement.style.setProperty('--pagination-color', color);
        localStorage.setItem('mainColor', color);
    };

    const hexToRGB = (hex) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return { r, g, b };
    };

    const calculateLogoFilter = ({ r, g, b }) => {
        return `brightness(0) saturate(100%) invert(${Math.round(r/255*100)}%) sepia(${Math.round(g/255*100)}%) saturate(${Math.round(b/255*100)}%) hue-rotate(${Math.round(Math.atan2(b, r) * 180 / Math.PI)}deg)`;
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <div className="theme-switcher">
            <button 
                className="theme-switcher-btn"
                onClick={() => setIsOpen(!isOpen)}
            >
                <i className="fas fa-gear fa-sm"></i>
            </button>

            {isOpen && (
                <div className="theme-menu">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <span>Dark Mode</span>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={theme === 'dark'}
                                onChange={toggleTheme}
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label>Theme Color</label>
                        <input
                            type="color"
                            className="color-picker"
                            value={mainColor}
                            onChange={(e) => applyMainColor(e.target.value)}
                        />
                    </div>

                    <hr className="my-3" />
                    
                    <button 
                        className="btn w-100"
                        style={{
                            backgroundColor: mainColor,
                            borderColor: mainColor,
                            color: '#fff'
                        }}
                        onClick={() => logOut("Bye bye 😢")}
                    >
                        <i className="fas fa-sign-out-alt me-2"></i>
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
} 