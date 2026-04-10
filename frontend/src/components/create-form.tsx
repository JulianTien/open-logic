"use client";

import Link from "next/link";
import { useState } from "react";

type CreateFormProps = {
  copy: {
    titleLabel: string;
    titleNote: string;
    titlePlaceholder: string;
    contentLabel: string;
    contentNote: string;
    contentPlaceholder: string;
    tagsLabel: string;
    tagsNote: string;
    tagsDefault: string;
    submit: string;
    backHome: string;
    missingTitle: string;
    missingContent: string;
    missingTag: string;
    publishLoading: string;
    publishSuccess: string;
    publishFailed: string;
  };
};

const tagOptions = ["Python", "Web", "Arduino", "C / C++", "AI", "General"];

export function CreateForm({ copy }: CreateFormProps) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(formData: FormData) {
    const title = String(formData.get("title") || "").trim();
    const content = String(formData.get("content") || "").trim();
    const tags = String(formData.get("tags") || "").trim();

    if (!title) {
      setError(true);
      setMessage(copy.missingTitle);
      return;
    }
    if (!content) {
      setError(true);
      setMessage(copy.missingContent);
      return;
    }
    if (!tags) {
      setError(true);
      setMessage(copy.missingTag);
      return;
    }

    setLoading(true);
    setMessage("");
    setError(false);

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, tags }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.message || copy.publishFailed);
      }

      setMessage(copy.publishSuccess);
      window.location.href = "/#posts";
    } catch (err) {
      setError(true);
      setMessage(err instanceof Error ? err.message : copy.publishFailed);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      action={(formData) => {
        void submit(formData);
      }}
      className="page-card stack"
    >
      <label className="field">
        <span>{copy.titleLabel}</span>
        <small className="field-hint">{copy.titleNote}</small>
        <input name="title" placeholder={copy.titlePlaceholder} type="text" />
      </label>

      <label className="field">
        <span>{copy.contentLabel}</span>
        <small className="field-hint">{copy.contentNote}</small>
        <textarea
          className="textarea"
          name="content"
          placeholder={copy.contentPlaceholder}
          rows={12}
        />
      </label>

      <label className="field">
        <span>{copy.tagsLabel}</span>
        <small className="field-hint">{copy.tagsNote}</small>
        <select name="tags">
          <option value="">{copy.tagsDefault}</option>
          {tagOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      {message ? (
        <p className={error ? "message message-error" : "message message-success"}>
          {message}
        </p>
      ) : null}

      <div className="hero-actions">
        <Link className="btn btn-secondary" href="/">
          {copy.backHome}
        </Link>
        <button className="btn btn-primary" disabled={loading} type="submit">
          {loading ? copy.publishLoading : copy.submit}
        </button>
      </div>
    </form>
  );
}
