import { useEffect, useMemo, useRef, useState } from 'react';
import hljs from 'highlight.js';

type Props = {
  code: string;
  language?: string; // e.g., 'javascript', 'typescript', 'tsx', 'python'
  className?: string;
};

export default function CodeBlock({ code, language = 'plaintext', className = '' }: Props) {
  const codeRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  // Memoize to avoid unnecessary re-renders with large code strings
  const text = useMemo(() => code.trimEnd(), [code]);

  useEffect(() => {
    if (!codeRef.current) return;
    if (language && hljs.getLanguage(language)) {
      codeRef.current.className = `language-${language}`;
      const result = hljs.highlight(text, { language });
      codeRef.current.innerHTML = result.value;
    } else {
      // Fallback to auto-detection
      const result = hljs.highlightAuto(text);
      codeRef.current.className = `language-${result.language ?? 'plaintext'}`;
      codeRef.current.innerHTML = result.value;
    }
  }, [text, language]);

  return (
    <div className={`relative group rounded-lg bg-gray-900 text-gray-100 overflow-x-auto ${className}`}>
      <button
        onClick={async () => {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className="absolute top-2 right-2 rounded bg-gray-700 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition"
        aria-label="Copy code"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <pre className="p-4 text-sm font-mono">
        <code ref={codeRef} />
      </pre>
    </div>
  );
}
