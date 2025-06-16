import React, { useState, useEffect } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  end, 
  duration = 2000, 
  suffix = '', 
  className = '' 
}) => {
  const [count, setCount] = useState(20);

  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 20;
      const increment = (end - start) / (duration / 50);
      
      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(counter);
        } else {
          setCount(Math.floor(start));
        }
      }, 50);

      return () => clearInterval(counter);
    }, 500); // Start after 500ms delay

    return () => clearTimeout(timer);
  }, [end, duration]);

  return (
    <span className={`animate-counter ${className}`}>
      {count}{suffix}
    </span>
  );
};

export default AnimatedCounter;