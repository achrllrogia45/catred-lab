import { useState } from "react";

const TO = "hello@catred.web.id";
const input =
  "w-full rounded-[4px] border border-[var(--line-light)] bg-[var(--paper)] px-3 py-2 text-[var(--ink)] placeholder:text-[var(--ink)] placeholder:opacity-50 focus:outline-2 focus:outline-[var(--red)]";

export default function ContactForm({ className = "" }) {
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Project inquiry from ${email}`);
    const body = encodeURIComponent(`${details}\n\nReply to: ${email}`);
    window.location.href = `mailto:${TO}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={onSubmit} className={`grid gap-4 ${className}`}>
      <div className="grid gap-2">
        <label htmlFor="cf-email" className="font-mono text-xs uppercase tracking-widest opacity-70">
          Email
        </label>
        <input
          id="cf-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@studio.com"
          autoComplete="email"
          className={input}
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="cf-details" className="font-mono text-xs uppercase tracking-widest opacity-70">
          Work details
        </label>
        <textarea
          id="cf-details"
          required
          rows={5}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="What are we making, what size, what deadline"
          className={`${input} resize-y`}
        />
      </div>
      <button
        type="submit"
        className="rounded-[4px] bg-[var(--red-deep,var(--red))] px-6 py-3 font-[family-name:var(--font-display)] text-sm font-bold tracking-wide text-[var(--paper)] active:translate-y-[1px]"
      >
        SEND INQUIRY
      </button>
    </form>
  );
}
