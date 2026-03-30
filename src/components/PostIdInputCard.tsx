"use client";

import { FormEvent } from "react";

type PostIdInputCardProps = {
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function PostIdInputCard({
  value,
  disabled,
  onChange,
  onSubmit,
}: PostIdInputCardProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <section className="sticker-card card-gap">
      <h2 className="section-title">Choose Post ID</h2>
      <p className="muted-text">Use numbers only. Example: 1, 10, 2026.</p>

      <form onSubmit={handleSubmit} className="input-row">
        <input
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Enter postId"
          className="id-input"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-label="post id"
        />
        <button type="submit" className="pressable query-btn" disabled={disabled}>
          Query
        </button>
      </form>
    </section>
  );
}
