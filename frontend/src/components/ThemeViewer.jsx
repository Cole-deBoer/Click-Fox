import React, { useState } from 'react';
import themes from '../assets/themes';

export const ThemeViewer = ({ onThemeChange }) => {
  const [selectedTheme, setSelectedTheme] = useState('Dark');

  const handleThemeChange = (event) => {
    const newThemeName = event.target.value;
    setSelectedTheme(newThemeName);
    
    // Find the selected theme object
    const selectedThemeObj = themes.find(theme => theme.name === newThemeName);
    
    if (selectedThemeObj && selectedThemeObj.value !== 'system') {
      // Pass the theme object to parent component
      onThemeChange(selectedThemeObj);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <select 
        value={selectedTheme} 
        onChange={handleThemeChange}
        className="bg-transparent text-white border-none outline-none cursor-pointer"
      >
        {themes.map((theme) => (
          <option 
            key={theme.name} 
            value={theme.name} 
            className="bg-transparent text-white border-none outline-none cursor-pointer"
          >
            {theme.name}
          </option>
        ))}
      </select> 
    </div>
  );
};
