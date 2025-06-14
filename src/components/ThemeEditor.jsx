import React, { useContext, useState } from 'react';
import { ThemeContext } from '../App';
import ThemeColorInput from './ThemeColorInput';

const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

const ThemeEditor = ({ onThemeChange }) => {
  const theme = useContext(ThemeContext);
  const [localTheme, setLocalTheme] = useState(deepClone(theme));

  const handleColorChange = (category, key, value) => {
    const updated = deepClone(localTheme);
    updated[category][key] = value;
    setLocalTheme(updated);
    onThemeChange(updated);
  };

  return (
    <div className="p-6 bg-[var(--background-card)] rounded-xl border" style={{ borderColor: 'var(--border-default)', color: 'var(--text-primary)', minWidth: 350 }}>
      <h2 className="text-xl font-bold mb-4">Theme Editor</h2>
      {Object.entries(localTheme).map(([category, colors]) =>
        typeof colors === 'object' ? (
          <div className="mb-6" key={category}>
            <h3 className="font-semibold mb-2 capitalize">{category}</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(colors).map(([key, value]) => (
                <ThemeColorInput
                  key={key}
                  label={key}
                  value={value}
                  onChange={v => handleColorChange(category, key, v)}
                />
              ))}
            </div>
          </div>
        ) : null
      )}
      <p className="text-xs text-[var(--text-muted)] mt-4">Changes apply live and are saved to your theme.</p>
    </div>
  );
};

export default ThemeEditor; 