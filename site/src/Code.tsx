import { useState } from "react";

export function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(text);
      setTimeout(() => setCopied((c) => (c === text ? null : c)), 1200);
    });
  };
  return { copied, copy };
}

export function Code({ children, lang = "tsx" }: { children: string; lang?: string }) {
  const { copied, copy } = useCopy();
  const isCopied = copied === children;
  return (
    <div className="code">
      <button
        type="button"
        className="code-copy"
        aria-label={isCopied ? "Copied" : "Copy to clipboard"}
        onClick={() => copy(children)}
      >
        {isCopied ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.75" />
            <path d="M5 15V5a2 2 0 0 1 2-2h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        )}
      </button>
      <pre data-lang={lang}>
        <code>{children}</code>
      </pre>
    </div>
  );
}
