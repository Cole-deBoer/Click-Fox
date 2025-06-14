import React, { useState } from 'react';
import { MousePointer2, Zap, Target } from 'lucide-react';

const ICONS = {
  time: <MousePointer2 className="w-12 h-12 mx-auto mb-4 animate-bounce" style={{ color: 'var(--icon-main)' }} />,
  click: <Target className="w-12 h-12 mx-auto mb-4 animate-bounce" style={{ color: 'var(--icon-main)' }} />,
  speed: <Zap className="w-12 h-12 mx-auto mb-4 animate-bounce" style={{ color: 'var(--icon-main)' }} />
};

const ClickArea = ({
  gameMode,
  isActive,
  isStarted,
  onStart,
  onClick,
  clickCount,
  timeLeft,
  targetValue,
  reactionState,
  reactionTimes,
  currentRun
}) => {
  const [showFlash, setShowFlash] = useState(false);

  const handleClick = () => {
    if (!isStarted) {
      onStart();
    } else if (isActive) {
      onClick();
    }
  };

  const getProgress = () => {
    switch (gameMode) {
      case 'time':
        return isStarted ? ((targetValue - timeLeft) / targetValue) * 100 : 0;
      case 'click':
        return (clickCount / targetValue) * 100;
      case 'speed':
        return (currentRun / targetValue) * 100;
      default:
        return 0;
    }
  };

  const getClickAreaContent = () => {
    if (!isStarted) {
      const descriptions = {
        time: `click as fast as you can for ${targetValue} seconds`,
        click: `click ${targetValue} times as fast as possible`,
        speed: `react to ${targetValue} flash${targetValue > 1 ? 'es' : ''} as quickly as possible`
      };
      return (
        <div className="text-center animate-pulse">
          {ICONS[gameMode]}
          <p className="text-xl mb-2" style={{ color: 'var(--text-secondary)' }}>click to start</p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{descriptions[gameMode]}</p>
        </div>
      );
    }
    if (gameMode === 'time' && isActive) {
      return (
        <div className="text-center">
          <div className="text-8xl font-light mb-6 animate-pulse" style={{ color: 'var(--text-highlight)' }}>{timeLeft}</div>
          <div className="text-4xl font-light mb-2 transition-all duration-100" style={{ color: 'var(--text-primary)' }}>{clickCount}</div>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>clicks</p>
        </div>
      );
    }
    if (gameMode === 'click' && isActive) {
      return (
        <div className="text-center">
          <div className="text-8xl font-light mb-6" style={{ color: 'var(--text-highlight)' }}>{targetValue - clickCount}</div>
          <div className="text-2xl font-light mb-2" style={{ color: 'var(--text-secondary)' }}>{clickCount} / {targetValue}</div>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>clicks remaining</p>
        </div>
      );
    }
    if (gameMode === 'speed') {
      if (reactionState === 'waiting') {
        return (
          <div className="text-center">
            <div className="text-4xl font-light mb-4" style={{ color: 'var(--text-secondary)' }}>Wait for it...</div>
            <div className="text-lg" style={{ color: 'var(--text-muted)' }}>Run {currentRun} of {targetValue}</div>
          </div>
        );
      }
      if (reactionState === 'ready') {
        return (
          <div className="text-center animate-pulse">
            <div className="text-6xl font-light mb-4" style={{ color: 'var(--text-highlight)' }}>CLICK NOW!</div>
            <div className="text-lg" style={{ color: 'var(--text-muted)' }}>Run {currentRun} of {targetValue}</div>
          </div>
        );
      }
      if (reactionState === 'clicked') {
        const lastTime = reactionTimes[reactionTimes.length - 1];
        return (
          <div className="text-center">
            <div className="text-4xl font-light mb-4" style={{ color: 'var(--icon-main)' }}>{lastTime}ms</div>
            <div className="text-lg" style={{ color: 'var(--text-muted)' }}>Run {currentRun} of {targetValue}</div>
            {currentRun < targetValue && (
              <div className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>Next round starting...</div>
            )}
          </div>
        );
      }
    }
    return null;
  };

  const getCPS = () => {
    if (gameMode === 'time' && isActive && isStarted) {
      const elapsed = targetValue - timeLeft;
      return elapsed > 0 ? (clickCount / elapsed).toFixed(1) : '0.0';
    }
    return '0.0';
  };

  const getClickAreaStyle = () => {
    let baseStyle = `
      relative w-96 h-96 rounded-2xl border-2 flex items-center justify-center cursor-pointer
      transition-all duration-150 select-none transform
    `;
    if (gameMode === 'speed' && reactionState === 'ready') {
      return baseStyle + ' border-[var(--text-highlight)] bg-[var(--text-highlight)]/20 shadow-lg shadow-[var(--text-highlight)]/20 scale-105';
    }
    if (isActive) {
      return baseStyle + ' border-[var(--button-primary-bg)]/50 bg-[var(--button-primary-bg)]/5 hover:bg-[var(--button-primary-bg)]/10 hover:scale-105 shadow-lg shadow-[var(--button-primary-bg)]/10';
    }
    if (!isStarted) {
      return baseStyle + ' border-[var(--border-default)] bg-[var(--background-card)] hover:bg-[var(--background-input)] hover:border-[var(--border-highlight)] hover:scale-105';
    }
    return baseStyle + ' border-[var(--border-default)] bg-[var(--background-input)] scale-95';
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-8">
      {/* Progress Bar */}
      {isStarted && (
        <div className="w-full max-w-4xl mb-8">
          <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--background-card)' }}>
            <div
              className="h-full transition-all duration-300 ease-out"
              style={{ width: `${getProgress()}%`, background: 'var(--button-primary-bg)' }}
            />
          </div>
        </div>
      )}
      {/* Click Area */}
      <div
        onClick={handleClick}
        className={getClickAreaStyle()}
      >
        {getClickAreaContent()}
        {/* CPS for time mode */}
        {gameMode === 'time' && (isActive || (isStarted && !isActive)) && (
          <div className="absolute bottom-6 text-center">
            <div className="text-2xl font-light mb-1" style={{ color: 'var(--text-secondary)' }}>{getCPS()}</div>
            <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>clicks per second</div>
          </div>
        )}
        {/* Click ripple effect */}
        {isActive && gameMode !== 'speed' && (
          <div className="absolute inset-0 rounded-2xl pointer-events-none">
            <div className="absolute inset-0 rounded-2xl" style={{ background: 'var(--button-primary-bg)', opacity: 0.2 }} />
          </div>
        )}
      </div>
      {/* Live stats for time mode */}
      {gameMode === 'time' && isActive && (
        <div className="mt-8 flex gap-8 text-center animate-fade-in">
          <div>
            <div className="text-2xl font-light" style={{ color: 'var(--text-primary)' }}>{clickCount}</div>
            <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>total</div>
          </div>
          <div>
            <div className="text-2xl font-light" style={{ color: 'var(--text-highlight)' }}>{getCPS()}</div>
            <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>cps</div>
          </div>
          <div>
            <div className="text-2xl font-light" style={{ color: 'var(--text-secondary)' }}>{timeLeft}s</div>
            <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>remaining</div>
          </div>
        </div>
      )}
      {/* Live stats for click mode */}
      {gameMode === 'click' && isActive && (
        <div className="mt-8 flex gap-8 text-center animate-fade-in">
          <div>
            <div className="text-2xl font-light" style={{ color: 'var(--text-primary)' }}>{clickCount}</div>
            <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>clicks</div>
          </div>
          <div>
            <div className="text-2xl font-light" style={{ color: 'var(--text-highlight)' }}>{targetValue - clickCount}</div>
            <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>remaining</div>
          </div>
        </div>
      )}
      {/* Live stats for speed mode */}
      {gameMode === 'speed' && reactionTimes.length > 0 && (
        <div className="mt-8 flex gap-8 text-center animate-fade-in">
          <div>
            <div className="text-2xl font-light" style={{ color: 'var(--text-primary)' }}>{reactionTimes.length}</div>
            <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>completed</div>
          </div>
          <div>
            <div className="text-2xl font-light" style={{ color: 'var(--text-highlight)' }}>
              {(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length).toFixed(0)}ms
            </div>
            <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>avg time</div>
          </div>
          <div>
            <div className="text-2xl font-light" style={{ color: 'var(--icon-main)' }}>
              {Math.min(...reactionTimes)}ms
            </div>
            <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>best</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClickArea;