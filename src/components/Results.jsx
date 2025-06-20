import React from 'react';
import { Trophy, Target, Zap, Clock, Award, Timer } from 'lucide-react';
import theme from '../assets/theme.json';

const Results = ({ gameMode, clickCount, targetValue, onRestart, reactionTimes, testDuration }) => {
  const getResults = () => {
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

  const getPerformanceLevel = () => {
    switch (gameMode) {
      case 'time':
        const cpsValue = parseFloat((clickCount / targetValue).toFixed(1));
        if (cpsValue >= 12) return { level: 'Legendary', color: theme.text.highlight, bg: theme.shadows.main, icon: '👑' };
        if (cpsValue >= 10) return { level: 'Master', color: theme.text.highlight, bg: theme.shadows.main, icon: '🏆' };
        if (cpsValue >= 8) return { level: 'Expert', color: theme.text.highlight, bg: theme.shadows.main, icon: '⭐' };
        if (cpsValue >= 6) return { level: 'Advanced', color: theme.text.highlight, bg: theme.shadows.main, icon: '🎯' };
        if (cpsValue >= 4) return { level: 'Intermediate', color: theme.text.highlight, bg: theme.shadows.main, icon: '📈' };
        return { level: 'Beginner', color: theme.text.muted, bg: theme.shadows.main, icon: '🌱' };
      
      case 'click':
        const timeInSeconds = testDuration / 1000;
        if (timeInSeconds <= 2) return { level: 'Lightning', color: theme.text.highlight, bg: theme.shadows.main, icon: '⚡' };
        if (timeInSeconds <= 3) return { level: 'Rapid', color: theme.text.highlight, bg: theme.shadows.main, icon: '🚀' };
        if (timeInSeconds <= 5) return { level: 'Quick', color: theme.text.highlight, bg: theme.shadows.main, icon: '💨' };
        if (timeInSeconds <= 8) return { level: 'Steady', color: theme.text.highlight, bg: theme.shadows.main, icon: '🎯' };
        if (timeInSeconds <= 12) return { level: 'Moderate', color: theme.text.highlight, bg: theme.shadows.main, icon: '📊' };
        return { level: 'Relaxed', color: theme.text.muted, bg: theme.shadows.main, icon: '🐌' };
      
      case 'speed':
        const avgTime = reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length;
        if (avgTime <= 200) return { level: 'Superhuman', color: theme.text.highlight, bg: theme.shadows.main, icon: '🦸' };
        if (avgTime <= 250) return { level: 'Lightning', color: theme.text.highlight, bg: theme.shadows.main, icon: '⚡' };
        if (avgTime <= 300) return { level: 'Quick', color: theme.text.highlight, bg: theme.shadows.main, icon: '💨' };
        if (avgTime <= 400) return { level: 'Average', color: theme.text.highlight, bg: theme.shadows.main, icon: '👍' };
        if (avgTime <= 500) return { level: 'Slow', color: theme.text.highlight, bg: theme.shadows.main, icon: '🐢' };
        return { level: 'Sleepy', color: theme.text.muted, bg: theme.shadows.main, icon: '😴' };
      
      default:
        return { level: 'Unknown', color: theme.text.muted, bg: theme.shadows.main, icon: '❓' };
    }
  };

  const results = getResults();
  const performance = getPerformanceLevel();

  const getShareText = () => {
    switch (gameMode) {
      case 'time':
        return `I just scored ${results.primary} CPS on Click fox! 🦝⚡`;
      case 'click':
        return `I completed ${targetValue} clicks in ${results.primary}s on Click fox! 🦝🎯`;
      case 'speed':
        return `My average reaction time is ${results.primary}ms on Click fox! 🦝⚡`;
      default:
        return 'Check out Click fox! 🦝';
    }
  };

  const getGameModeIcon = () => {
    switch (gameMode) {
      case 'time': return <Clock className="w-8 h-8" style={{color: theme.icons.main}} />;
      case 'click': return <Target className="w-8 h-8" style={{color: theme.icons.main}} />;
      case 'speed': return <Zap className="w-8 h-8" style={{color: theme.icons.main}} />;
      default: return <Trophy className="w-8 h-8" style={{color: theme.icons.main}} />;
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-16 animate-fade-in">
      {/* Progress Bar */}
      <div className="w-full max-w-4xl mb-8">
        <div className="h-1 rounded-full overflow-hidden" style={{backgroundColor: theme.backgrounds.card}}>
          <div className="h-full w-full" style={{backgroundColor: theme.text.highlight}} />
        </div>
      </div>

      <div className="text-center mb-12 animate-slide-up">
        <div className="text-6xl mb-4">{performance.icon}</div>
        <h2 className="text-4xl font-light mb-4" style={{color: theme.text.primary}}>test complete</h2>
        <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-lg`} style={{
          backgroundColor: performance.bg,
          color: performance.color
        }}>
          <Award className="w-5 h-5" />
          {performance.level}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-4xl">
        <div className="rounded-xl p-6 text-center border transition-all duration-200 animate-slide-up" style={{
          animationDelay: '0.1s',
          backgroundColor: theme.backgrounds.card,
          borderColor: theme.borders.default
        }}>
          {getGameModeIcon()}
          <div className="text-3xl font-light mb-2 mt-4" style={{color: theme.text.primary}}>{results.primary}</div>
          <div className="text-sm uppercase tracking-wider" style={{color: theme.text.muted}}>{results.primaryLabel}</div>
        </div>
        
        <div className="rounded-xl p-6 text-center border transition-all duration-200 animate-slide-up" style={{
          animationDelay: '0.2s',
          backgroundColor: theme.backgrounds.card,
          borderColor: theme.borders.default
        }}>
          <div className="w-8 h-8 rounded-full mx-auto mb-4 flex items-center justify-center" style={{backgroundColor: theme.text.highlight}}>
            <span className="font-bold text-sm" style={{color: theme.backgrounds.main}}>#</span>
          </div>
          <div className="text-3xl font-light mb-2" style={{color: theme.text.primary}}>{results.secondary}</div>
          <div className="text-sm uppercase tracking-wider" style={{color: theme.text.muted}}>{results.secondaryLabel}</div>
        </div>
        
        <div className="rounded-xl p-6 text-center border transition-all duration-200 animate-slide-up" style={{
          animationDelay: '0.3s',
          backgroundColor: theme.backgrounds.card,
          borderColor: theme.borders.default
        }}>
          <Timer className="w-8 h-8 mx-auto mb-4" style={{color: theme.icons.main}} />
          <div className="text-3xl font-light mb-2" style={{color: theme.text.primary}}>{results.tertiary}</div>
          <div className="text-sm uppercase tracking-wider" style={{color: theme.text.muted}}>{results.tertiaryLabel}</div>
        </div>
      </div>

      {/* Speed mode detailed results */}
      {gameMode === 'speed' && reactionTimes.length > 1 && (
        <div className="mb-8 w-full max-w-4xl">
          <h3 className="text-lg font-medium mb-4 text-center" style={{color: theme.text.secondary}}>Individual Run Times</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {reactionTimes.map((time, index) => (
              <div
                key={index}
                className="px-3 py-2 rounded-lg text-sm"
                style={{
                  backgroundColor: time === Math.min(...reactionTimes) ? theme.text.highlight + '20' : theme.backgrounds.card,
                  color: time === Math.min(...reactionTimes) ? theme.text.highlight : theme.text.muted,
                  border: time === Math.min(...reactionTimes) ? `1px solid ${theme.text.highlight}30` : `1px solid ${theme.borders.default}`
                }}
              >
                Run {index + 1}: {time}ms
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4 animate-slide-up" style={{animationDelay: '0.4s'}}>
        <button
          onClick={onRestart}
          className="px-8 py-3 font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
          style={{
            backgroundColor: theme.buttons.primaryBg,
            color: theme.buttons.primaryText
          }}
        >
          try again
        </button>
        
        <button
          onClick={() => {
            const text = getShareText();
            if (navigator.share) {
              navigator.share({ text });
            } else {
              navigator.clipboard.writeText(text);
            }
          }}
          className="px-8 py-3 font-medium rounded-lg transition-all duration-200 border"
          style={{
            backgroundColor: theme.backgrounds.card,
            color: theme.text.secondary,
            borderColor: theme.borders.default
          }}
        >
          share result
        </button>
      </div>
    </div>
  );
};

export default Results;