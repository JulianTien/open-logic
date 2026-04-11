"use client";

import { useEffect, useState } from "react";

type CoursesViewProps = {
  copy: {
    title: string;
    subtitle: string;
    loading: string;
    previous: string;
    next: string;
    run: string;
    clear: string;
    output: string;
    placeholder: string;
    running: string;
    noOutput: string;
    failed: string;
    python: string;
    c: string;
    vibe: string;
    pythonTemplate: string;
    cTemplate: string;
  };
};

type LessonPayload = {
  code: number;
  data?: {
    content: string;
    total: number;
    current: number;
  };
};

export function CoursesView({ copy }: CoursesViewProps) {
  const [track, setTrack] = useState("python");
  const [lesson, setLesson] = useState(1);
  const [total, setTotal] = useState(1);
  const [content, setContent] = useState(copy.loading);
  const [code, setCode] = useState(copy.pythonTemplate);
  const [output, setOutput] = useState(copy.placeholder);

  useEffect(() => {
    let cancelled = false;

    async function loadLesson() {
      setContent(copy.loading);
      try {
        const response = await fetch(`/api/courses/lesson/${track}/${lesson}`);
        const payload = (await response.json()) as LessonPayload;
        if (!cancelled && payload.code === 200 && payload.data) {
          setContent(payload.data.content);
          setTotal(payload.data.total);
          setLesson(payload.data.current);
        }
      } catch {
        if (!cancelled) setContent(copy.failed);
      }
    }

    void loadLesson();
    return () => {
      cancelled = true;
    };
  }, [copy.failed, copy.loading, lesson, track]);

function switchTrack(nextTrack: string) {
    setTrack(nextTrack);
    setLesson(1);
    setOutput(copy.placeholder);
    setCode(nextTrack === "c" ? copy.cTemplate : copy.pythonTemplate);
  }

  async function runCode() {
    setOutput(copy.running);
    try {
      const response = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: track === "c" ? "c" : "python",
          code,
        }),
      });
      const payload = await response.json();
      const text =
        payload?.execution?.stdout ||
        payload?.output ||
        payload?.execution?.stderr ||
        copy.noOutput;
      setOutput(text);
    } catch (err) {
      setOutput(
        `${copy.failed}: ${err instanceof Error ? err.message : "unknown"}`,
      );
    }
  }

  function renderMarkdown(input: string): string {
    return input
      .replace(/^### (.*)$/gm, "<h3>$1</h3>")
      .replace(/^## (.*)$/gm, "<h2>$1</h2>")
      .replace(/^# (.*)$/gm, "<h1>$1</h1>")
      .replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\n/g, "<br />");
  }

  return (
    <div className="content-grid">
      <article className="page-card">
        <span className="eyebrow">{copy.title}</span>
        <h1>{copy.subtitle}</h1>
        <div className="chip-row">
          <button className="btn btn-ghost" onClick={() => switchTrack("python")} type="button">
            {copy.python}
          </button>
          <button className="btn btn-ghost" onClick={() => switchTrack("c")} type="button">
            {copy.c}
          </button>
          <button className="btn btn-ghost" onClick={() => switchTrack("vibe")} type="button">
            {copy.vibe}
          </button>
        </div>
        <div
          className="markdown-block"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
        />
        <div className="hero-actions">
          <button
            className="btn btn-secondary"
            disabled={lesson <= 1}
            onClick={() => setLesson((value) => Math.max(1, value - 1))}
            type="button"
          >
            {copy.previous}
          </button>
          <button
            className="btn btn-secondary"
            disabled={lesson >= total}
            onClick={() => setLesson((value) => Math.min(total, value + 1))}
            type="button"
          >
            {copy.next}
          </button>
        </div>
      </article>

      <article className="page-card stack">
        <h2>{copy.output}</h2>
        <textarea
          className="textarea"
          onChange={(event) => setCode(event.target.value)}
          rows={14}
          value={code}
        />
        <div className="hero-actions">
          <button className="btn btn-secondary" onClick={() => setCode("")} type="button">
            {copy.clear}
          </button>
          <button className="btn btn-primary" onClick={() => void runCode()} type="button">
            {copy.run}
          </button>
        </div>
        <pre className="markdown-block">{output}</pre>
      </article>
    </div>
  );
}
