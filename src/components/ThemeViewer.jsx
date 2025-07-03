import React from 'react';
import theme from '../assets/theme.json';
import themes from '../assets/themes';


const themeOption = (key, newTheme) => {
    return (
        <option key={key} value={newTheme.name} className="bg-transparent text-white border-none outline-none cursor-pointer">{theme.name}</option>
    )
}


export const ThemeViewer = () => {

  return (
    <div className="flex items-center justify-center gap-4">
      <select value={theme} onChange={(newTheme) => {
            theme.backgrounds = newTheme.backgrounds;
            theme.text = newTheme.text;
            theme.borders = newTheme.borders;
            theme.buttons = newTheme.buttons;
            theme.icons = newTheme.icons;
            theme.shadows = newTheme.shadows;
        }} className="bg-transparent text-white border-none outline-none cursor-pointer">
            {themes.map((theme) =>(
                themeOption(key, theme)
            ))}
      </select> 
    </div>
  );
};
