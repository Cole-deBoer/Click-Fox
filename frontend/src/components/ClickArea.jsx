import React, { useState } from 'react';
import { MousePointer2, Zap, Target } from 'lucide-react';

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
      const icons = {
        time: <MousePointer2 className="w-12 h-12 mx-auto mb-4 animate-bounce" style={{color: '#ffffff'}} />,
        click: <Target className="w-12 h-12 mx-auto mb-4 animate-bounce" style={{color: '#ffffff'}} />,
        speed: <Zap className="w-12 h-12 mx-auto mb-4 animate-bounce" style={{color: '#ffffff'}} />
      };

      const descriptions = {
        time: `click as fast as you can for ${targetValue} seconds`,
        click: `click ${targetValue} times as fast as possible`,
        speed: `react to ${targetValue} flash${targetValue > 1 ? 'es' : ''} as quickly as possible`
      };

      return (
        <div className="text-center animate-pulse">
          {icons[gameMode]}
          <p className="text-xl mb-2" style={{color: '#cccccc'}}>click to start</p>
          <p className="text-sm" style={{color: '#888888'}}>{descriptions[gameMode]}</p>
        </div>
      );
    }

    if (gameMode === 'time' && isActive) {
      return (
        <div className="text-center">
          <div className="text-8xl font-light mb-6 animate-pulse" style={{color: '#ffffff'}}>
            {timeLeft}
          </div>
          <div className="text-4xl font-light mb-2 transition-all duration-100" style={{color: '#ffffff'}}>
            {clickCount}
          </div>
          <p className="text-sm" style={{color: '#888888'}}>clicks</p>
        </div>
      );
    }

    if (gameMode === 'click' && isActive) {
      return (
        <div className="text-center">
          <div className="text-8xl font-light mb-6" style={{color: '#ffffff'}}>
            {targetValue - clickCount}
          </div>
          <div className="text-2xl font-light mb-2" style={{color: '#cccccc'}}>
            {clickCount} / {targetValue}
          </div>
          <p className="text-sm" style={{color: '#888888'}}>clicks remaining</p>
        </div>
      );
    }

    if (gameMode === 'speed') {
      if (reactionState === 'waiting') {
        return (
          <div className="text-center">
            <div className="text-4xl font-light mb-4" style={{color: '#cccccc'}}>
              Wait for it...
            </div>
            <div className="text-lg" style={{color: '#888888'}}>
              Run {currentRun} of {targetValue}
            </div>
          </div>
        );
      }

      if (reactionState === 'ready') {
        return (
          <div className="text-center animate-pulse">
            <div className="text-6xl font-light mb-4" style={{color: '#ffffff'}}>
              CLICK NOW!
            </div>
            <div className="text-lg" style={{color: '#888888'}}>
              Run {currentRun} of {targetValue}
            </div>
          </div>
        );
      }

      if (reactionState === 'clicked') {
        const lastTime = reactionTimes[reactionTimes.length - 1];
        return (
          <div className="text-center">
            <div className="text-4xl font-light mb-4" style={{color: '#ffffff'}}>
              {lastTime}ms
            </div>
            <div className="text-lg" style={{color: '#888888'}}>
              Run {currentRun} of {targetValue}
            </div>
            {currentRun < targetValue && (
              <div className="text-sm mt-2" style={{color: '#888888'}}>
                Next round starting...
              </div>
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
      return baseStyle + ' scale-105';
    }

    if (isActive) {
      return baseStyle + ' hover:scale-105';
    }

    if (!isStarted) {
      return baseStyle + ' hover:scale-105';
    }

    return baseStyle + ' scale-95';
  };

  const getClickAreaInlineStyle = () => {
    if (gameMode === 'speed' && reactionState === 'ready') {
      return {
        borderColor: '#ffffff',
        backgroundColor: '#ffffff' + '20',
        boxShadow: `0 10px 25px rgba(255, 255, 255, 0.1)`
      };
    }

    if (isActive) {
      return {
        borderColor: '#ffffff' + '50',
        backgroundColor: '#ffffff' + '05'
      };
    }

    if (!isStarted) {
      return {
        borderColor: '#333333',
        backgroundColor: '#111111' + '30'
      };
    }

    return {
      borderColor: '#333333',
      backgroundColor: '#111111' + '20'
    };
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-8">
      {/* Progress Bar */}
      {isStarted && (
        <div className="w-full max-w-4xl mb-8">
          <div className="h-1 rounded-full overflow-hidden" style={{backgroundColor: '#111111'}}>
            <div 
              className="h-full transition-all duration-300 ease-out"
              style={{ 
                width: `${getProgress()}%`,
                backgroundColor: '#ffffff'
              }}
            />
          </div>
        </div>
      )}

      <div
        onClick={handleClick}
        className={getClickAreaStyle()}
        style={getClickAreaInlineStyle()}
      >
        {getClickAreaContent()}
        
        {gameMode === 'time' && (isActive || (isStarted && !isActive)) && (
          <div className="absolute bottom-6 text-center">
            <div className="text-2xl font-light mb-1" style={{color: '#cccccc'}}>{getCPS()}</div>
            <div className="text-xs uppercase tracking-wider" style={{color: '#888888'}}>clicks per second</div>
          </div>
        )}

        {/* Click ripple effect */}
        {isActive && gameMode !== 'speed' && (
          <div className="absolute inset-0 rounded-2xl pointer-events-none">
            <div className="absolute inset-0 rounded-2xl animate-ping opacity-0" style={{backgroundColor: '#ffffff' + '20'}} />
          </div>
        )}
      </div>

      {/* Live stats for time mode */}
      {gameMode === 'time' && isActive && (
        <div className="mt-8 flex gap-8 text-center animate-fade-in">
          <div>
            <div className="text-2xl font-light" style={{color: '#ffffff'}}>{clickCount}</div>
            <div className="text-xs uppercase tracking-wider" style={{color: '#888888'}}>total</div>
          </div>
          <div>
            <div className="text-2xl font-light" style={{color: '#ffffff'}}>{getCPS()}</div>
            <div className="text-xs uppercase tracking-wider" style={{color: '#888888'}}>cps</div>
          </div>
          <div>
            <div className="text-2xl font-light" style={{color: '#cccccc'}}>{timeLeft}s</div>
            <div className="text-xs uppercase tracking-wider" style={{color: '#888888'}}>remaining</div>
          </div>
        </div>
      )}

      {/* Live stats for click mode */}
      {gameMode === 'click' && isActive && (
        <div className="mt-8 flex gap-8 text-center animate-fade-in">
          <div>
            <div className="text-2xl font-light" style={{color: '#ffffff'}}>{clickCount}</div>
            <div className="text-xs uppercase tracking-wider" style={{color: '#888888'}}>clicks</div>
          </div>
          <div>
            <div className="text-2xl font-light" style={{color: '#ffffff'}}>{targetValue - clickCount}</div>
            <div className="text-xs uppercase tracking-wider" style={{color: '#888888'}}>remaining</div>
          </div>
        </div>
      )}

      {/* Live stats for speed mode */}
      {gameMode === 'speed' && reactionTimes.length > 0 && (
        <div className="mt-8 flex gap-8 text-center animate-fade-in">
          <div>
            <div className="text-2xl font-light" style={{color: '#ffffff'}}>{reactionTimes.length}</div>
            <div className="text-xs uppercase tracking-wider" style={{color: '#888888'}}>completed</div>
          </div>
          <div>
            <div className="text-2xl font-light" style={{color: '#ffffff'}}>
              {(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length).toFixed(0)}ms
            </div>
            <div className="text-xs uppercase tracking-wider" style={{color: '#888888'}}>avg time</div>
          </div>
          <div>
            <div className="text-2xl font-light" style={{color: '#ffffff'}}>
              {Math.min(...reactionTimes)}ms
            </div>
            <div className="text-xs uppercase tracking-wider" style={{color: '#888888'}}>best</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClickArea;