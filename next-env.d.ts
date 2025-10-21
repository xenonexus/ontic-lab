/// <reference types="react" />
/// <reference types="react-dom" />

// Minimal declarations to avoid type failures if types aren't installed in the runtime.
declare module 'next' {
  const Next: any;
  export default Next;
}
declare module 'next/*' {
  const NextMod: any;
  export default NextMod;
}
