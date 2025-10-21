"use client";
import React from 'react';

export default function TypingIndicatorDNA({
  className = '',
}: {
  className?: string;
}) {
  return (
    <svg
      className={`h-6 w-16 ${className}`}
      viewBox="0 0 160 60"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Assistant is typing"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="helix" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF7A1A" />
          <stop offset="100%" stopColor="#FF4040" />
        </linearGradient>
      </defs>
      <g filter="url(#glow)" opacity="0.85">
        {/* Backbones */}
        <path
          d="M10,10 C40,50 120,10 150,50"
          fill="none"
          stroke="url(#helix)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="8 8"
          className="[animation-duration:1600ms] animate-dna"
        />
        <path
          d="M10,50 C40,10 120,50 150,10"
          fill="none"
          stroke="url(#helix)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="8 8"
          className="[animation-duration:1600ms] animate-dna"
        />

        {/* Rungs */}
        {Array.from({ length: 10 }).map((_, i) => {
          const y = 10 + i * 4;
          return (
            <line
              key={i}
              x1={20 + i * 12}
              y1={y}
              x2={20 + i * 12}
              y2={60 - y}
              stroke="#FFA366"
              strokeOpacity="0.8"
              strokeWidth="2"
            />
          );
        })}
      </g>
    </svg>
  );
}
