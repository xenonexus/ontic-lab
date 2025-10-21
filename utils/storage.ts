export type Handedness = 'left' | 'right';
export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
};

const MSG_KEY = 'ontic_chat_messages_v1';
const HAND_KEY = 'ontic_handedness_v1';

export function loadMessages(): Message[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(MSG_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as Message[];
    return [];
  } catch {
    return [];
  }
}

export function saveMessages(msgs: Message[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(MSG_KEY, JSON.stringify(msgs));
  } catch {}
}

export function clearMessages() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(MSG_KEY);
  } catch {}
}

export function loadHandedness(): Handedness {
  if (typeof window === 'undefined') return 'right';
  try {
    const raw = localStorage.getItem(HAND_KEY);
    if (raw === 'left' || raw === 'right') return raw;
    return 'right';
  } catch {
    return 'right';
  }
}

export function saveHandedness(val: Handedness) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(HAND_KEY, val);
  } catch {}
}
