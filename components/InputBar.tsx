"use client";
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import clsx from 'classnames';
import { Handedness } from '../utils/storage';

export type InputBarHandle = {
  focusAndGlow: () => void;
};

export default forwardRef(function InputBar(
  {
    onSend,
    handedness,
    onToggleHand,
  }: {
    onSend: (text: string) => void;
    handedness: Handedness;
    onToggleHand: () => void;
  },
  ref: React.Ref<InputBarHandle>
) {
  const [value, setValue] = useState('');
  const [glow, setGlow] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useImperativeHandle(ref, () => ({
    focusAndGlow: () => {
      textareaRef.current?.focus();
      setGlow(true);
      window.setTimeout(() => setGlow(false), 900);
    },
  }));

  const handleSend = () => {
    const text = value.trim();
    if (!text) return;
    onSend(text);
    setValue('');
  };

  const containerClass = clsx(
    'safe-bottom sticky bottom-0 z-10 w-full backdrop-blur-xs',
    'bg-[#0a0a0a]/40',
    handedness === 'right' ? 'justify-end' : 'justify-start'
  );

  return (
    <div className={containerClass}>
      <div
        className={clsx(
          'mx-auto flex w-full max-w-3xl items-end gap-2 px-4 py-3',
          handedness === 'right' ? 'flex-row' : 'flex-row-reverse'
        )}
      >
        <button
          onClick={onToggleHand}
          className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs text-textMuted hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          aria-label="Toggle handedness"
          title="Toggle handedness"
        >
          {handedness === 'right' ? 'Right' : 'Left'}-handed
        </button>
        <div
          className={clsx(
            'flex flex-1 items-center gap-2 rounded-xl bg-inkDark/60 p-2 shadow-lg',
            glow && 'animate-pulseGlow ring-2 ring-white/20'
          )}
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Send a message"
            className="max-h-36 min-h-[44px] w-full flex-1 resize-none rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm text-textPrimary placeholder:text-textMuted focus:outline-none focus:ring-2 focus:ring-accent/40"
            aria-label="Message input"
          />
          <button
            onClick={handleSend}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#FF5E5E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            aria-label="Send message"
          >
            Send
          </button>
        </div>
        <div className="w-[64px]" aria-hidden />
      </div>
    </div>
  );
});
