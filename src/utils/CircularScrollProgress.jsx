import { useState, useEffect } from "react";

const CircularScrollProgress = () => {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = (scrollTop / scrollHeight) * 100;
      setScrollPercent(percent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const radius = 40; // Circle radius
  const circumference = 2 * Math.PI * radius; // Full circumference
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference; // Dynamic progress

  return (
    <div className="fixed bottom-6 right-6">
      <svg width="100" height="100" viewBox="0 0 100 100">
        {/* Background Circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="#e5e7eb"
          strokeWidth="6"
        />
        {/* Progress Circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="#3b82f6"
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
        {/* Scroll Percentage Text */}
        <text x="50" y="55" fontSize="14" textAnchor="middle" fill="#333">
          {Math.round(scrollPercent)}%
        </text>
      </svg>
    </div>
  );
};

export default CircularScrollProgress;
