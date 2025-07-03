import React, { useState } from 'react';
import Header from './components/Header';
import ClickArea from './components/ClickArea';
import Results from './components/Results';
import { useClickTest } from './hooks/useClickTest';
import theme from './assets/theme.json';
import { ThemeViewer } from './components/ThemeViewer';

function App() {
  const [selectedMode, setSelectedMode] = useState('time');
  const [selectedPreset, setSelectedPreset] = useState(5);
  const [customValue, setCustomValue] = useState(null);

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

  return (
    <div className="min-h-screen overflow-hidden" style={{backgroundColor: theme.backgrounds.main, color: theme.text.primary}}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
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

        <footer className="text-center py-6 text-sm">
          <div className="flex items-center justify-center gap-4">
            <span style={{color: theme.text.muted}}>esc</span>
            <span style={{color: theme.text.muted}}>•</span>
            <span style={{color: theme.text.muted}}>enter</span>
            <span style={{color: theme.text.muted}}>•</span>
            <span style={{color: theme.text.muted}}>restart test</span>
            <span style={{color: theme.text.muted}}>•</span>

          </div>
          <div className="flex items-center justify-end px-5">
            <ThemeViewer />
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;