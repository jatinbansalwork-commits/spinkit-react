import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getEntry, neighbors } from "./catalog";
import { Playground } from "./Playground";
import { PropDocs, tocFor } from "./PropDocs";
import { usePageRail } from "./RailContext";

export function SpinnerPage() {
  const { slug = "" } = useParams();
  const entry = getEntry(slug);
  const toc = useMemo(() => (entry ? tocFor(entry) : []), [entry]);
  const { next } = entry ? neighbors(entry.slug) : { next: undefined };

  const rail = useMemo(
    () =>
      entry ? (
        <nav className="toc" aria-label="On this page">
          <p className="toc-label">On this page</p>
          <ul>
            {toc.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.title}</a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null,
    [entry, toc],
  );

  usePageRail(rail);

  if (!entry) return <Navigate to="/" replace />;

  return (
    <article className="spinner-page">
      <header className="page-head">
        <p className="eyebrow">Component/</p>
        <h1>{entry.name}</h1>
        <p className="lede">{entry.description}</p>
      </header>

      <Playground key={entry.slug} entry={entry} />
      <PropDocs entry={entry} />

      {next && (
        <nav className="next-nav" aria-label="More spinners">
          <Link to={`/spinners/${next.slug}`}>
            Next <span>{next.name}</span>
          </Link>
        </nav>
      )}
    </article>
  );
}
