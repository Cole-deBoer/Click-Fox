import React, { useState, useEffect, createContext } from 'react';
import Header from './components/Header';
import ClickArea from './components/ClickArea';
import Results from './components/Results';
import { useClickTest } from './hooks/useClickTest';
import themeData from './assets/theme.json';
import ThemeEditor from './components/ThemeEditor';

export const ThemeContext = createContext(themeData);

function App() {
  const [selectedMode, setSelectedMode] = useState('time');
  const [selectedPreset, setSelectedPreset] = useState(5);
  const [customValue, setCustomValue] = useState(null);
  const [theme, setTheme] = useState(themeData);
  const [showThemeEditor, setShowThemeEditor] = useState(false);

  const targetValue = customValue || selectedPreset;

  const {
    isStarted,
    isActive,
    clickCount,
    timeLeft,
    isComplete,
    testDuration,
    reactionState,
    reactionTimes,
    currentRun,
    startTest,
    handleClick,
    restart
  } = useClickTest(selectedMode, targetValue);

  useEffect(() => {
    // Apply theme as CSS variables
    const root = document.documentElement;
    // Backgrounds
    root.style.setProperty('--background-main', theme.backgrounds.main);
    root.style.setProperty('--background-card', theme.backgrounds.card);
    root.style.setProperty('--background-input', theme.backgrounds.input);
    // Text
    root.style.setProperty('--text-primary', theme.text.primary);
    root.style.setProperty('--text-secondary', theme.text.secondary);
    root.style.setProperty('--text-muted', theme.text.muted);
    root.style.setProperty('--text-highlight', theme.text.highlight);
    // Borders
    root.style.setProperty('--border-default', theme.borders.default);
    root.style.setProperty('--border-highlight', theme.borders.highlight);
    // Buttons
    root.style.setProperty('--button-primary-bg', theme.buttons.primaryBg);
    root.style.setProperty('--button-primary-text', theme.buttons.primaryText);
    root.style.setProperty('--button-secondary-bg', theme.buttons.secondaryBg);
    root.style.setProperty('--button-secondary-text', theme.buttons.secondaryText);
    // Icons
    root.style.setProperty('--icon-main', theme.icons.main);
    root.style.setProperty('--icon-secondary', theme.icons.secondary);
    // Shadows
    root.style.setProperty('--shadow-main', theme.shadows.main);
  }, [theme]);

  const handleModeChange = (mode) => {
    if (!isActive) {
      setSelectedMode(mode);
      setCustomValue(null);
      
      // Set default presets for each mode
      const defaultPresets = {
        time: 5,
        click: 10,
        speed: 3
      };
      setSelectedPreset(defaultPresets[mode]);
      restart();
    }
  };

  const handlePresetChange = (preset) => {
    if (!isActive) {
      setSelectedPreset(preset);
      setCustomValue(null);
      restart();
    }
  };

  const handleCustomValueChange = (value) => {
    if (!isActive) {
      setCustomValue(value);
      setSelectedPreset(null);
      restart();
    }
  };

  const handleRestart = () => {
    restart();
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    // Optionally, persist to localStorage or backend here
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div className="min-h-screen" style={{ background: 'var(--background-main)', color: 'var(--text-primary)' }}>
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        <button
          onClick={() => setShowThemeEditor(v => !v)}
          className="fixed top-4 right-4 z-50 px-4 py-2 rounded-lg font-medium"
          style={{ background: 'var(--button-primary-bg)', color: 'var(--button-primary-text)' }}
        >
          Theme Editor
        </button>
        {showThemeEditor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <ThemeEditor onThemeChange={handleThemeChange} />
            <button
              onClick={() => setShowThemeEditor(false)}
              className="absolute top-6 right-6 px-3 py-1 rounded text-sm font-medium"
              style={{ background: 'var(--button-secondary-bg)', color: 'var(--button-secondary-text)' }}
            >
              Close
            </button>
          </div>
        )}
        
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header
            selectedMode={selectedMode}
            selectedPreset={selectedPreset}
            customValue={customValue}
            onModeChange={handleModeChange}
            onPresetChange={handlePresetChange}
            onCustomValueChange={handleCustomValueChange}
            onRestart={handleRestart}
            isActive={isActive}
          />
          
          <main className="flex-1 flex flex-col items-center justify-center px-6">
            {isComplete ? (
              <Results
                gameMode={selectedMode}
                clickCount={clickCount}
                targetValue={targetValue}
                testDuration={testDuration}
                reactionTimes={reactionTimes}
                onRestart={handleRestart}
              />
            ) : (
              <ClickArea
                gameMode={selectedMode}
                isActive={isActive}
                isStarted={isStarted}
                onStart={startTest}
                onClick={handleClick}
                clickCount={clickCount}
                timeLeft={timeLeft}
                targetValue={targetValue}
                reactionState={reactionState}
                reactionTimes={reactionTimes}
                currentRun={currentRun}
              />
            )}
          </main>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;