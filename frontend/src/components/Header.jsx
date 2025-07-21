import React, { useState } from 'react';
import { RotateCcw, Settings } from 'lucide-react';
import foxLogo from '../assets/fox-logo.png';

const Header = ({ 
  selectedMode, 
  selectedPreset, 
  customValue,
  onModeChange, 
  onPresetChange,
  onCustomValueChange,
  onRestart, 
  isActive,
  currentTheme 
}) => {
  const [showCustomInput, setShowCustomInput] = useState(false);

  const modes = [
    { key: 'time', label: 'time', presets: [1, 5, 10] },
    { key: 'click', label: 'click', presets: [5, 10, 15] },
    { key: 'speed', label: 'speed', presets: [1, 3, 5] }
  ];

  const currentMode = modes.find(m => m.key === selectedMode);

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    const value = parseInt(e.target.customInput.value);
    if (value && value > 0) {
      onCustomValueChange(value);
      setShowCustomInput(false);
    }
  };

  const getCustomLabel = () => {
    switch (selectedMode) {
      case 'time': return 'seconds';
      case 'click': return 'clicks';
      case 'speed': return 'runs';
      default: return '';
    }
  };

  return (
    <header className="w-full max-w-6xl mx-auto px-6 py-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-white/20 via-gray-300/30 to-white/20 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg" style={{backgroundColor: currentTheme.backgrounds.card}}>
            {/* Fox Logo */}
            <img src={foxLogo} alt="Fox Logo" className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-light" style={{color: currentTheme.text.primary}}>click fox</h1>
        </div>
        
        <button
          onClick={onRestart}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
          style={{
            color: currentTheme.text.secondary,
            backgroundColor: 'transparent'
          }}
          onMouseEnter={(e) => {
            e.target.style.color = currentTheme.text.primary;
            e.target.style.backgroundColor = currentTheme.backgrounds.card;
          }}
          onMouseLeave={(e) => {
            e.target.style.color = currentTheme.text.secondary;
            e.target.style.backgroundColor = 'transparent';
          }}
        >
          <RotateCcw className="w-4 h-4" />
          <span className="text-sm">restart test</span>
        </button>
      </div>

      <div className="flex items-center justify-between">
        {/* Game Modes - Left Side with animations */}
        <div className="flex items-center gap-8">
          {modes.map((mode, index) => (
            <div key={mode.key} className="flex items-center gap-4 animate-slide-in" style={{animationDelay: `${index * 0.1}s`}}>
              <span className={`text-sm transition-all duration-300 ${
                selectedMode === mode.key ? 'scale-110' : ''
              }`} style={{
                color: selectedMode === mode.key ? currentTheme.text.highlight : currentTheme.text.muted
              }}>
                {mode.key === 'time' ? '@' : mode.key === 'click' ? '#' : '⚡'}
              </span>
              <button
                onClick={() => onModeChange(mode.key)}
                disabled={isActive}
                className={`text-sm font-medium transition-all duration-300 transform ${
                  selectedMode === mode.key
                    ? 'scale-105'
                    : 'hover:scale-102'
                } disabled:cursor-not-allowed disabled:opacity-50`}
                style={{
                  color: selectedMode === mode.key ? currentTheme.text.highlight : currentTheme.text.muted
                }}
                onMouseEnter={(e) => {
                  if (!isActive && selectedMode !== mode.key) {
                    e.target.style.color = currentTheme.text.secondary;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive && selectedMode !== mode.key) {
                    e.target.style.color = currentTheme.text.muted;
                  }
                }}
              >
                {mode.label}
              </button>
            </div>
          ))}
        </div>

        {/* Game Settings - Right Side with staggered animations */}
        <div className="flex items-center gap-2 animate-fade-in-right">
          {currentMode.presets.map((preset, index) => (
            <button
              key={preset}
              onClick={() => onPresetChange(preset)}
              disabled={isActive}
              className={`px-3 py-1 rounded text-sm transition-all duration-300 transform animate-preset-appear ${
                selectedPreset === preset && !customValue
                  ? 'font-medium scale-105 shadow-lg'
                  : 'hover:scale-105'
              } disabled:cursor-not-allowed disabled:opacity-50`}
              style={{
                animationDelay: `${index * 0.05}s`,
                backgroundColor: selectedPreset === preset && !customValue ? currentTheme.buttons.primaryBg : 'transparent',
                color: selectedPreset === preset && !customValue ? currentTheme.buttons.primaryText : currentTheme.text.muted,
                border: selectedPreset === preset && !customValue ? `1px solid ${currentTheme.borders.highlight}` : '1px solid transparent'
              }}
              onMouseEnter={(e) => {
                if (!isActive && (selectedPreset !== preset || customValue)) {
                  e.target.style.color = currentTheme.text.secondary;
                  e.target.style.backgroundColor = currentTheme.backgrounds.card;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive && (selectedPreset !== preset || customValue)) {
                  e.target.style.color = currentTheme.text.muted;
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              {preset}
            </button>
          ))}
          
          <button
            onClick={() => setShowCustomInput(!showCustomInput)}
            disabled={isActive}
            className={`px-3 py-1 rounded text-sm transition-all duration-300 flex items-center gap-1 transform animate-preset-appear ${
              customValue
                ? 'font-medium scale-105 shadow-lg'
                : 'hover:scale-105'
            } disabled:cursor-not-allowed disabled:opacity-50`}
            style={{
              animationDelay: '0.15s',
              backgroundColor: customValue ? currentTheme.buttons.primaryBg : 'transparent',
              color: customValue ? currentTheme.buttons.primaryText : currentTheme.text.muted,
              border: customValue ? `1px solid ${currentTheme.borders.highlight}` : '1px solid transparent'
            }}
            onMouseEnter={(e) => {
              if (!isActive && !customValue) {
                e.target.style.color = currentTheme.text.secondary;
                e.target.style.backgroundColor = currentTheme.backgrounds.card;
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive && !customValue) {
                e.target.style.color = currentTheme.text.muted;
                e.target.style.backgroundColor = 'transparent';
              }
            }}
          >
            <Settings className="w-3 h-3" />
            {customValue || 'custom'}
          </button>
        </div>
      </div>

      {showCustomInput && (
        <div className="flex justify-end mt-4 animate-slide-down">
          <form onSubmit={handleCustomSubmit} className="flex items-center gap-2">
            <input
              name="customInput"
              type="number"
              min="1"
              placeholder={`Enter ${getCustomLabel()}`}
              className="px-3 py-1 border rounded text-sm focus:outline-none w-32 transition-all duration-200 focus:scale-105"
              style={{
                backgroundColor: currentTheme.backgrounds.input,
                borderColor: currentTheme.borders.default,
                color: currentTheme.text.primary
              }}
              autoFocus
            />
            <button
              type="submit"
              className="px-3 py-1 rounded text-sm font-medium transition-all duration-200 hover:scale-105 shadow-lg"
              style={{
                backgroundColor: currentTheme.buttons.primaryBg,
                color: currentTheme.buttons.primaryText
              }}
            >
              Set
            </button>
            <button
              type="button"
              onClick={() => setShowCustomInput(false)}
              className="px-3 py-1 rounded text-sm transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: currentTheme.backgrounds.card,
                color: currentTheme.text.secondary
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;