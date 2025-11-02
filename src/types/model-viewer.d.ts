// src/types/model-viewer.d.ts
import 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        alt?: string;
        style?: React.CSSProperties;
        "camera-controls"?: boolean;
        "auto-rotate"?: boolean;
      };
    }
  }
}

// Add an empty export statement to ensure TS treats this file as a module
// This is often required in modern TS projects.
export {}; 
