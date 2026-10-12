import { useMemo } from "react";
import changelog from "../../CHANGELOG.md?raw";
import { usePageRail } from "./RailContext";
import { VERSION_LABEL } from "./version";

interface Release {
  id: string;
  title: string;
  body: string[];
}

function parseChangelog(source: string): Release[] {
  const releases: Release[] = [];
  let current: Release | null = null;

  for (const line of source.split("\n")) {
    const heading = line.match(/^##\s+(.+)$/);
    if (heading) {
      current = {
        id: heading[1].toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
        title: heading[1].trim(),
        body: [],
      };
      releases.push(current);
      continue;
    }
    if (!current || line.startsWith("# ")) continue;
    current.body.push(line);
  }

  return releases.filter((r) => r.body.some((l) => l.trim()));
}

export function ChangelogPage() {
  const releases = useMemo(() => parseChangelog(changelog), []);

  const rail = useMemo(
    () => (
      <nav className="toc" aria-label="On this page">
        <p className="toc-label">Releases</p>
        <ul>
          {releases.map((release) => (
            <li key={release.id}>
              <a href={`#${release.id}`}>{release.title}</a>
            </li>
          ))}
        </ul>
      </nav>
    ),
    [releases],
  );

  usePageRail(rail);

  return (
    <div className="doc-page changelog-page">
      <header className="page-head">
        <p className="eyebrow">Docs/</p>
        <h1>Release notes</h1>
        <p className="lede">
          What changed, and why it mattered. You're on <code>{VERSION_LABEL}</code>.
        </p>
      </header>

      <div className="changelog">
        {releases.map((release) => (
          <section key={release.id} id={release.id} className="changelog-release">
            <h2>
              <a href={`#${release.id}`}>{release.title}</a>
            </h2>
            <ReleaseBody lines={release.body} />
          </section>
        ))}
      </div>
    </div>
  );
}

function ReleaseBody({ lines }: { lines: string[] }) {
  const blocks: { type: "h3" | "p" | "ul"; text?: string; items?: string[] }[] = [];
  let openProse = false;

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      openProse = false;
      continue;
    }

    const h3 = line.match(/^###\s+(.+)$/);
    if (h3) {
      openProse = false;
      blocks.push({ type: "h3", text: h3[1] });
      continue;
    }

    const bullet = line.match(/^-\s+(.+)$/);
    if (bullet) {
      openProse = false;
      const last = blocks[blocks.length - 1];
      if (last?.type === "ul" && last.items) last.items.push(bullet[1]);
      else blocks.push({ type: "ul", items: [bullet[1]] });
      continue;
    }

    const prose = line.trim();
    const last = blocks[blocks.length - 1];
    if (openProse && last?.type === "p" && last.text) {
      last.text = `${last.text} ${prose}`;
    } else {
      blocks.push({ type: "p", text: prose });
      openProse = true;
    }
  }

  return (
    <div className="changelog-body">
      {blocks.map((block, i) => {
        if (block.type === "h3") return <h3 key={i}>{block.text}</h3>;
        if (block.type === "ul") {
          return (
            <ul key={i}>
              {block.items?.map((item, j) => (
                <li key={j}>
                  <InlineMd text={item} />
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i}>
            <InlineMd text={block.text ?? ""} />
          </p>
        );
      })}
    </div>
  );
}

function InlineMd({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("`") && part.endsWith("`")) {
          return <code key={i}>{part.slice(1, -1)}</code>;
        }
        if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
          return <em key={i}>{part.slice(1, -1)}</em>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
