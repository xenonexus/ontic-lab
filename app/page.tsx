"use client";
import React, { useCallback, useRef } from 'react';
import CentralFigure2D from '../components/CentralFigure2D';
import ChatWindow, { ChatWindowHandle } from '../components/ChatWindow';

export default function Page() {
  const chatRef = useRef<ChatWindowHandle>(null);

  const handleBegin = useCallback(() => {
    chatRef.current?.focusInput(true);
  }, []);

  return (
    <main className="min-h-screen w-full">
      <section className="relative mx-auto max-w-6xl px-6 pt-16 md:pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="text-left md:pr-10">
            <h1 className="heading-glow text-4xl sm:text-5xl md:text-6xl font-extrabold text-textPrimary leading-tight">
              Explore the limits of life.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-textMuted max-w-prose">
              Ontic uses intelligent systems to uncover biological insights from the world’s most resilient organisms.
            </p>
            <div className="mt-8">
              <button
                onClick={handleBegin}
                className="btn-halo inline-flex items-center gap-3 rounded-xl bg-accent px-6 py-3 font-semibold text-white shadow-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 hover:bg-[#FF5E5E]"
                aria-label="Begin Exploring"
              >
                Begin Exploring
                <span aria-hidden className="i-heroicons-arrow-right inline-block">→</span>
              </button>
            </div>
          </div>
          <div className="relative">
            <CentralFigure2D />
          </div>
        </div>
      </section>
      <section className="relative mt-10 md:mt-16">
        <ChatWindow ref={chatRef} />
      </section>
    </main>
  );
}
