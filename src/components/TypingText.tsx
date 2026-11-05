"use client";

import { useEffect, useState } from "react";

export default function TypingText({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) return;
    const current = words[index % words.length];

    if (!deleting && sub === current.length) {
      const t = setTimeout(() => setDeleting(true), 1600);
      return () => clearTimeout(t);
    }
    if (deleting && sub === 0) {
      const t = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      }, 220);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setSub((s) => s + (deleting ? -1 : 1)), deleting ? 38 : 78);
    return () => clearTimeout(t);
  }, [sub, deleting, index, words]);

  return (
    <span className="text-gradient-animated">
      {words.length ? words[index % words.length].substring(0, sub) : ""}
      <span className="caret ml-0.5 font-light text-violet-500">|</span>
    </span>
  );
}
