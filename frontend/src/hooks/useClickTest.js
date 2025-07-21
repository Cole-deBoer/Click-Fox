import { useState, useCallback, useRef, useEffect } from 'react';

export const useClickTest = (gameMode, targetValue) => {
  const [isStarted, setIsStarted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(targetValue);
  const [isComplete, setIsComplete] = useState(false);
  const [testStartTime, setTestStartTime] = useState(null);
  const [testDuration, setTestDuration] = useState(0);
  
  // Speed mode specific states
  const [reactionState, setReactionState] = useState('idle'); // 'idle', 'waiting', 'ready', 'clicked'
  const [reactionTimes, setReactionTimes] = useState([]);
  const [currentRun, setCurrentRun] = useState(0);
  const [reactionStartTime, setReactionStartTime] = useState(null);
  
  const timerRef = useRef(null);
  const reactionTimeoutRef = useRef(null);

  const startTest = useCallback(() => {
    setIsStarted(true);
    setIsActive(true);
    setClickCount(0);
    setIsComplete(false);
    setTestStartTime(Date.now());
    setTestDuration(0);
    
    if (gameMode === 'time') {
      setTimeLeft(targetValue);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            setIsComplete(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (gameMode === 'click') {
      setTimeLeft(0);
    } else if (gameMode === 'speed') {
      setReactionTimes([]);
      setCurrentRun(1);
      startReactionRound();
    }
  }, [gameMode, targetValue]);

  const startReactionRound = useCallback(() => {
    setReactionState('waiting');
    const waitTime = Math.random() * 3000 + 1000; // 1-4 seconds
    
    reactionTimeoutRef.current = setTimeout(() => {
      setReactionState('ready');
      setReactionStartTime(Date.now());
    }, waitTime);
  }, []);

  const handleClick = useCallback(() => {
    if (gameMode === 'time' && isActive) {
      setClickCount((prev) => prev + 1);
    } else if (gameMode === 'click' && isActive) {
      const newCount = clickCount + 1;
      setClickCount(newCount);
      
      if (newCount >= targetValue) {
        setIsActive(false);
        setIsComplete(true);
        setTestDuration(Date.now() - testStartTime);
      }
    } else if (gameMode === 'speed' && isActive) {
      if (reactionState === 'ready') {
        const reactionTime = Date.now() - reactionStartTime;
        const newReactionTimes = [...reactionTimes, reactionTime];
        setReactionTimes(newReactionTimes);
        setReactionState('clicked');
        
        if (currentRun >= targetValue) {
          // Test complete
          setTimeout(() => {
            setIsActive(false);
            setIsComplete(true);
          }, 1500);
        } else {
          // Next round
          setTimeout(() => {
            setCurrentRun(prev => prev + 1);
            startReactionRound();
          }, 1500);
        }
      } else if (reactionState === 'waiting') {
        // Clicked too early - could add penalty or restart round
        if (reactionTimeoutRef.current) {
          clearTimeout(reactionTimeoutRef.current);
        }
        setReactionState('waiting');
        startReactionRound();
      }
    }
  }, [gameMode, isActive, clickCount, targetValue, testStartTime, reactionState, reactionStartTime, reactionTimes, currentRun, startReactionRound]);

  const restart = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (reactionTimeoutRef.current) {
      clearTimeout(reactionTimeoutRef.current);
    }
    
    setIsStarted(false);
    setIsActive(false);
    setClickCount(0);
    setTimeLeft(targetValue);
    setIsComplete(false);
    setTestStartTime(null);
    setTestDuration(0);
    
    // Reset speed mode states
    setReactionState('idle');
    setReactionTimes([]);
    setCurrentRun(0);
    setReactionStartTime(null);
  }, [targetValue]);

  // Update timer when mode or target changes
  useEffect(() => {
    if (gameMode === 'time') {
      setTimeLeft(targetValue);
    }
  }, [gameMode, targetValue]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (reactionTimeoutRef.current) {
        clearTimeout(reactionTimeoutRef.current);
      }
    };
  }, []);

  return {
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
  };
};