"use client";
import React from 'react';

export default function CentralFigure2D() {
  return (
    <div className="relative mx-auto max-w-md">
      <svg
        viewBox="0 0 400 520"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-xl"
        role="img"
        aria-label="Stylized biological figure with layered lighting"
      >
        <defs>
          <radialGradient id="bodyGrad" cx="65%" cy="25%" r="70%">
            <stop offset="0%" stopColor="#FF4040" />
            <stop offset="40%" stopColor="#A4161A" />
            <stop offset="100%" stopColor="#4A0F12" />
          </radialGradient>
          <radialGradient id="aoGrad" cx="50%" cy="50%" r="50%">
            <stop offset="75%" stopColor="#00000000" />
            <stop offset="100%" stopColor="#1A0F10" />
          </radialGradient>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="halo" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="24" />
          </filter>
        </defs>

        {/* Ambient halo around head */}
        <circle cx="260" cy="95" r="48" fill="#FF4040" opacity="0.08" filter="url(#halo)" />

        {/* Body silhouette */}
        <g filter="url(#softGlow)">
          <path
            d="M200 30c-25 0-45 14-58 32-9 13-17 30-16 48 1 22 15 43 10 64-6 23-24 34-36 53-19 30-25 70-12 104 16 40 56 72 112 72s96-32 112-72c13-34 7-74-12-104-12-19-30-30-36-53-5-21 9-42 10-64 1-18-7-35-16-48-13-18-33-32-58-32z"
            fill="url(#bodyGrad)"
          />

          {/* Specular highlight from upper-right */}
          <path
            d="M250 70c-12 6-20 18-26 30-8 17-15 38-8 57 7 19 26 27 42 38 15 10 29 26 34 44 5 18 2 39-9 55-17 25-52 38-83 38-24 0-48-8-66-23-8-6-17-15-21-25-1-3-2-7 0-10 20 21 49 35 87 35 42 0 77-19 91-46 14-27 6-57-13-77-12-13-26-19-36-36-10-16-10-38-3-56 5-13 12-24 25-30 7-3 12-1 16 0z"
            fill="#FFFFFF"
            opacity="0.06"
          />

          {/* Ambient occlusion ring toward edges */}
          <ellipse cx="200" cy="300" rx="165" ry="200" fill="url(#aoGrad)" opacity="0.5" />
        </g>

        {/* Subtle radial flare */}
        <radialGradient id="flare" cx="70%" cy="18%" r="15%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <circle cx="260" cy="95" r="50" fill="url(#flare)" />
      </svg>
    </div>
  );
}
