"use client";
import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Handedness, Message, clearMessages, loadHandedness, loadMessages, saveHandedness, saveMessages } from '../utils/storage';
import InputBar, { InputBarHandle } from './InputBar';
import TypingIndicatorDNA from './TypingIndicatorDNA';
import useReducedMotion from '../utils/useReducedMotion';
import clsx from 'classnames';

export type ChatWindowHandle = {
  focusInput: (glow?: boolean) => void;
};

function mockAssistantResponse(userText: string): string {
  // Simple deterministic mock response
  const prompts = [
    "Fascinating. Tell me more about your hypothesis.",
    "Let's examine potential survival pathways.",
    "How would this adapt in extreme environments?",
    "What data do you have so far?",
  ];
  const idx = userText.length % prompts.length;
  return prompts[idx];
}

export default forwardRef(function ChatWindow(_props, ref: React.Ref<ChatWindowHandle>) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [handedness, setHandedness] = useState<Handedness>('right');
  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<InputBarHandle | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setMessages(loadMessages());
    setHandedness(loadHandedness());
  }, []);

  useEffect(() => {
    saveMessages(messages);
    // scroll to bottom on new message
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: reducedMotion ? 'auto' : 'smooth' });
  }, [messages, reducedMotion]);

  useEffect(() => {
    saveHandedness(handedness);
  }, [handedness]);

  const handleSend = (text: string) => {
    const userMsg: Message = {
      id: `${Date.now()}_${Math.random().toString(36).slice(2,7)}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setTyping(true);
    const delay = reducedMotion ? 200 : 900 + Math.min(1200, text.length * 15);
    window.setTimeout(() => {
      const assistantMsg: Message = {
        id: `${Date.now()}_${Math.random().toString(36).slice(2,7)}`,
        role: 'assistant',
        content: mockAssistantResponse(text),
        timestamp: Date.now(),
      };
      setTyping(false);
      setMessages((prev) => [...prev, assistantMsg]);
    }, delay);
  };

  const clear = () => {
    clearMessages();
    setMessages([]);
  };

  useImperativeHandle(ref, () => ({
    focusInput: (glow?: boolean) => {
      if (glow) inputRef.current?.focusAndGlow();
      else inputRef.current?.focusAndGlow();
      // scroll into view
      inputRef.current && document.querySelector('#ontic-input-anchor')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'end' });
    },
  }));

  const hasMessages = messages.length > 0;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-2 px-4">
      {/* Chat header */}
      <div className="my-2 flex items-center justify-between px-1">
        <h2 className="text-sm font-semibold tracking-wide text-textMuted">Conversation</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setHandedness((h) => (h === 'right' ? 'left' : 'right'))}
            className="rounded-md border border-white/10 bg-black/20 px-2 py-1 text-xs text-textMuted hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            aria-label="Toggle handedness"
          >
            {handedness === 'right' ? 'Right' : 'Left'}-handed
          </button>
          <button
            onClick={clear}
            className="rounded-md border border-white/10 bg-black/20 px-2 py-1 text-xs text-textMuted hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            Clear history
          </button>
        </div>
      </div>

      {/* Message list */}
      <div
        ref={listRef}
        className="flex max-h-[60vh] min-h-[220px] flex-col gap-3 overflow-y-auto rounded-xl border border-white/10 bg-black/10 p-3"
      >
        {!hasMessages && (
          <div className="mx-auto my-10 max-w-prose text-center text-sm text-textMuted">
            Ask about extremophiles, synthetic genomes, or bio-survival strategies.
          </div>
        )}
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
        {typing && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-inkDark/70 text-xs text-white shadow">
              A
            </div>
            <TypingIndicatorDNA />
          </div>
        )}
        <div id="ontic-input-anchor" />
      </div>

      <InputBar
        ref={inputRef}
        onSend={handleSend}
        handedness={handedness}
        onToggleHand={() => setHandedness((h) => (h === 'right' ? 'left' : 'right'))}
      />
    </div>
  );
});

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  return (
    <div className={clsx('flex items-start gap-2', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <div className="mt-1 h-7 w-7 flex-shrink-0 rounded-full bg-inkDark/70 text-center text-xs leading-7 text-white shadow">A</div>
      )}
      <div
        className={clsx(
          'max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-lg',
          isUser
            ? 'bg-gradient-to-br from-crimson to-shadowDeep text-white border border-white/10'
            : 'bg-inkDark/70 text-textPrimary border border-white/10'
        )}
        style={{
          backdropFilter: 'blur(4px)',
        }}
      >
        {message.content}
      </div>
      {isUser && (
        <div className="mt-1 h-7 w-7 flex-shrink-0 rounded-full bg-crimson/70 text-center text-xs leading-7 text-white shadow">U</div>
      )}
    </div>
  );
}
