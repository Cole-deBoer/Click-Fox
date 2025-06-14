import React, { useState } from 'react';
import { RotateCcw, Settings } from 'lucide-react';
import foxLogo from '../assets/fox-logo.png';
import theme from '../assets/theme.json';

const MODES = [
  { key: 'time', label: 'time', presets: [1, 5, 10] },
  { key: 'click', label: 'click', presets: [5, 10, 15] },
  { key: 'speed', label: 'speed', presets: [1, 3, 5] }
];

function getCustomLabel(mode) {
  switch (mode) {
    case 'time': return 'seconds';
    case 'click': return 'clicks';
    case 'speed': return 'runs';
    default: return '';
  }
}

const Header = ({
  selectedMode,
  selectedPreset,
  customValue,
  onModeChange,
  onPresetChange,
  onCustomValueChange,
  onRestart,
  isActive
}) => {
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Handle custom value form submit
  const handleCustomSubmit = (e) => {
    e.preventDefault();
    const value = parseInt(e.target.customInput.value);
    if (value && value > 0) {
      onCustomValueChange(value);
      setShowCustomInput(false);
    }
  };

  return (
    <header className="w-full max-w-6xl mx-auto px-6 py-6">
      <div className="flex items-center justify-between mb-8">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: 'var(--button-primary-bg)' }}>
            <img src={foxLogo} alt="ClickFox Logo" className="w-8 h-8 object-contain" style={{ filter: 'drop-shadow(0 0 2px var(--icon-main))' }} />
          </div>
          <h1 className="text-2xl font-light" style={{ color: 'var(--text-primary)' }}>clickfox</h1>
        </div>
        {/* Restart Button */}
        <button
          onClick={onRestart}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200"
          style={{ color: 'var(--text-secondary)', background: 'var(--background-card)' }}
        >
          <RotateCcw className="w-4 h-4" style={{ color: 'var(--icon-secondary)' }} />
          <span className="text-sm">restart test</span>
        </button>
      </div>

      {/* Mode Selection */}
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-8">
          {MODES.map((mode) => (
            <div key={mode.key} className="flex items-center gap-4">
              <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {mode.key === 'time' ? '@' : mode.key === 'click' ? '#' : '⚡'}
              </span>
              <button
                onClick={() => onModeChange(mode.key)}
                disabled={isActive}
                className={`text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50`}
                style={{ color: selectedMode === mode.key ? 'var(--text-highlight)' : 'var(--text-muted)' }}
              >
                {mode.label}
              </button>
              {/* Presets and Custom for selected mode */}
              {selectedMode === mode.key && (
                <div className="flex gap-2 ml-2">
                  {mode.presets.map((preset) => (
                    <button
                      key={preset}
                      onClick={() => onPresetChange(preset)}
                      disabled={isActive}
                      className={`px-2 py-1 rounded text-sm transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50`}
                      style={{
                        background: selectedPreset === preset && !customValue ? 'var(--button-primary-bg)' : 'transparent',
                        color: selectedPreset === preset && !customValue ? 'var(--button-primary-text)' : 'var(--text-muted)'
                      }}
                    >
                      {preset}
                    </button>
                  ))}
                  <button
                    onClick={() => setShowCustomInput(!showCustomInput)}
                    disabled={isActive}
                    className={`px-2 py-1 rounded text-sm transition-all duration-200 flex items-center gap-1 disabled:cursor-not-allowed disabled:opacity-50`}
                    style={{
                      background: customValue ? 'var(--button-primary-bg)' : 'transparent',
                      color: customValue ? 'var(--button-primary-text)' : 'var(--text-muted)'
                    }}
                  >
                    <Settings className="w-3 h-3" />
                    {customValue || 'custom'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Custom Value Input */}
      {showCustomInput && (
        <div className="flex justify-center mt-4">
          <form onSubmit={handleCustomSubmit} className="flex items-center gap-2">
            <input
              name="customInput"
              type="number"
              min="1"
              placeholder={`Enter ${getCustomLabel(selectedMode)}`}
              className="px-3 py-1 border rounded text-sm focus:outline-none w-32"
              style={{
                background: 'var(--background-input)',
                borderColor: 'var(--border-default)',
                color: 'var(--text-primary)',
                outlineColor: 'var(--text-highlight)'
              }}
              autoFocus
            />
            <button
              type="submit"
              className="px-3 py-1 rounded text-sm font-medium transition-colors"
              style={{ background: 'var(--button-primary-bg)', color: 'var(--button-primary-text)' }}
            >
              Set
            </button>
            <button
              type="button"
              onClick={() => setShowCustomInput(false)}
              className="px-3 py-1 rounded text-sm transition-colors"
              style={{ background: 'var(--button-secondary-bg)', color: 'var(--button-secondary-text)' }}
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