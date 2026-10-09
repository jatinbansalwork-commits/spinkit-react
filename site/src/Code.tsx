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
  return (
    <div className="code">
      <span className="code-lang">{lang}</span>
      <button type="button" className="code-copy" onClick={() => copy(children)}>
        {copied ? "Copied" : "Copy"}
      </button>
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
}
