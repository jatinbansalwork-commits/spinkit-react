import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface RailContextValue {
  rail: ReactNode;
  setRail: (node: ReactNode) => void;
}

const RailContext = createContext<RailContextValue | null>(null);

export function RailProvider({ children }: { children: ReactNode }) {
  const [rail, setRail] = useState<ReactNode>(null);
  const value = useMemo(() => ({ rail, setRail }), [rail]);
  return <RailContext.Provider value={value}>{children}</RailContext.Provider>;
}

export function useRail() {
  const ctx = useContext(RailContext);
  if (!ctx) throw new Error("useRail must be used within RailProvider");
  return ctx;
}

/** Publishes a right-rail panel for the current page; clears it on unmount. */
export function usePageRail(node: ReactNode) {
  const { setRail } = useRail();
  useLayoutEffect(() => {
    setRail(node);
    return () => setRail(null);
  }, [node, setRail]);
}
