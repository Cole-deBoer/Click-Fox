import React from 'react';
import { Trophy, Target, Zap, Clock } from 'lucide-react';
import ResultsSummary from './ResultsSummary';
import PerformanceLevel from './PerformanceLevel';

const getResults = (gameMode, clickCount, targetValue, reactionTimes, testDuration) => {
  switch (gameMode) {
    case 'time':
      const cps = (clickCount / targetValue).toFixed(1);
      return {
        primary: cps,
        primaryLabel: 'clicks per second',
        secondary: clickCount,
        secondaryLabel: 'total clicks',
        tertiary: targetValue,
        tertiaryLabel: 'seconds'
      };
    case 'click':
      const timeInSeconds = testDuration / 1000;
      const clickCps = (clickCount / timeInSeconds).toFixed(1);
      return {
        primary: timeInSeconds.toFixed(2),
        primaryLabel: 'seconds',
        secondary: clickCps,
        secondaryLabel: 'clicks per second',
        tertiary: clickCount,
        tertiaryLabel: 'total clicks'
      };
    case 'speed':
      const avgTime = (reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length).toFixed(0);
      const bestTime = Math.min(...reactionTimes);
      return {
        primary: avgTime,
        primaryLabel: 'avg reaction time (ms)',
        secondary: bestTime,
        secondaryLabel: 'best time (ms)',
        tertiary: reactionTimes.length,
        tertiaryLabel: 'runs completed'
      };
    default:
      return {};
  }
};

const getPerformanceLevel = (gameMode, clickCount, targetValue, reactionTimes, testDuration) => {
  switch (gameMode) {
    case 'time': {
      const cpsValue = parseFloat((clickCount / targetValue).toFixed(1));
      if (cpsValue >= 12) return { level: 'Legendary', icon: '👑' };
      if (cpsValue >= 10) return { level: 'Master', icon: '🏆' };
      if (cpsValue >= 8) return { level: 'Expert', icon: '⭐' };
      if (cpsValue >= 6) return { level: 'Advanced', icon: '🎯' };
      if (cpsValue >= 4) return { level: 'Intermediate', icon: '📈' };
      return { level: 'Beginner', icon: '🌱' };
    }
    case 'click': {
      const timeInSeconds = testDuration / 1000;
      if (timeInSeconds <= 2) return { level: 'Lightning', icon: '⚡' };
      if (timeInSeconds <= 3) return { level: 'Rapid', icon: '🚀' };
      if (timeInSeconds <= 5) return { level: 'Quick', icon: '💨' };
      if (timeInSeconds <= 8) return { level: 'Steady', icon: '🎯' };
      if (timeInSeconds <= 12) return { level: 'Moderate', icon: '📊' };
      return { level: 'Relaxed', icon: '🐌' };
    }
    case 'speed': {
      const avgTime = reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length;
      if (avgTime <= 200) return { level: 'Superhuman', icon: '🦸' };
      if (avgTime <= 250) return { level: 'Lightning', icon: '⚡' };
      if (avgTime <= 300) return { level: 'Quick', icon: '💨' };
      if (avgTime <= 400) return { level: 'Average', icon: '👍' };
      if (avgTime <= 500) return { level: 'Slow', icon: '🐢' };
      return { level: 'Sleepy', icon: '😴' };
    }
    default:
      return { level: 'Unknown', icon: '❓' };
  }
};

const getGameModeIcon = (gameMode) => {
  switch (gameMode) {
    case 'time': return <Clock className="w-8 h-8" style={{ color: 'var(--icon-main)' }} />;
    case 'click': return <Target className="w-8 h-8" style={{ color: 'var(--icon-main)' }} />;
    case 'speed': return <Zap className="w-8 h-8" style={{ color: 'var(--icon-main)' }} />;
    default: return <Trophy className="w-8 h-8" style={{ color: 'var(--icon-main)' }} />;
  }
};

const getShareText = (gameMode, results, targetValue) => {
  switch (gameMode) {
    case 'time':
      return `I just scored ${results.primary} CPS on ClickFox! 🦊⚡`;
    case 'click':
      return `I completed ${targetValue} clicks in ${results.primary}s on ClickFox! 🦊🎯`;
    case 'speed':
      return `My average reaction time is ${results.primary}ms on ClickFox! 🦊⚡`;
    default:
      return 'Check out ClickFox! 🦊';
  }
};

const Results = ({ gameMode, clickCount, targetValue, onRestart, reactionTimes, testDuration }) => {
  const results = getResults(gameMode, clickCount, targetValue, reactionTimes, testDuration);
  const performance = getPerformanceLevel(gameMode, clickCount, targetValue, reactionTimes, testDuration);

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-16 animate-fade-in">
      {/* Progress Bar */}
      <div className="w-full max-w-4xl mb-8">
        <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--background-card)' }}>
          <div className="h-full w-full" style={{ background: 'var(--button-primary-bg)' }} />
        </div>
      </div>
      <div className="text-center mb-12 animate-slide-up">
        <div className="text-6xl mb-4">{performance.icon}</div>
        <h2 className="text-4xl font-light mb-4" style={{ color: 'var(--text-primary)' }}>test complete</h2>
        <PerformanceLevel icon={performance.icon} level={performance.level} />
      </div>
      <ResultsSummary
        icon={getGameModeIcon(gameMode)}
        primary={results.primary}
        primaryLabel={results.primaryLabel}
        secondary={results.secondary}
        secondaryLabel={results.secondaryLabel}
        tertiary={results.tertiary}
        tertiaryLabel={results.tertiaryLabel}
      />
      {/* Speed mode detailed results */}
      {gameMode === 'speed' && reactionTimes.length > 1 && (
        <div className="mb-8 w-full max-w-4xl">
          <h3 className="text-lg font-medium mb-4 text-center" style={{ color: 'var(--text-primary)' }}>Individual Run Times</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {reactionTimes.map((time, index) => (
              <div
                key={index}
                className={`px-3 py-2 rounded-lg text-sm ${
                  time === Math.min(...reactionTimes)
                    ? 'bg-green-400/20 text-green-400 border border-green-400/30'
                    : 'bg-gray-800 text-gray-400'
                }`}
              >
                Run {index + 1}: {time}ms
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <button
          onClick={onRestart}
          className="px-8 py-3 font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
          style={{ background: 'var(--button-primary-bg)', color: 'var(--button-primary-text)' }}
        >
          try again
        </button>
        <button
          onClick={() => {
            const text = getShareText(gameMode, results, targetValue);
            if (navigator.share) {
              navigator.share({ text });
            } else {
              navigator.clipboard.writeText(text);
            }
          }}
          className="px-8 py-3 font-medium rounded-lg transition-all duration-200 border"
          style={{ background: 'var(--button-secondary-bg)', color: 'var(--button-secondary-text)', borderColor: 'var(--border-default)' }}
        >
          share result
        </button>
      </div>
    </div>
  );
};

export default Results;