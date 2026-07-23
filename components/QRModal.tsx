"use client";

import { QRCodeSVG } from "qrcode.react";

type Props = {
  sessionId: number;
  onClose: () => void;
};

export default function QRModal({
  sessionId,
  onClose,
}: Props) {

  const url =
    `${window.location.origin}/participant/session/${sessionId}`;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

      <div className="w-[420px] rounded-2xl bg-zinc-900 p-8 text-center">

        <h2 className="text-2xl font-bold text-[var(--text)]">
          Scan to Begin
        </h2>

        <p className="mt-2 text-[var(--muted)]">
          Ask the participant to scan this QR code.
        </p>

        <div className="mt-8 flex justify-center rounded-xl bg-white p-4">

          <QRCodeSVG
            value={url}
            size={250}
          />

        </div>

        <a
  href={url}
  target="_blank"
  rel="noopener noreferrer"
  className="mt-6 block break-all text-sm text-[var(--accent)] underline underline-offset-4 transition hover:text-[#f3c78f]"
>
  Continue on this device →
</a>

        <button
          onClick={onClose}
          className="mt-8 rounded-xl bg-[var(--accent)] text-black px-6 py-3 text-[var(--text)] hover:bg-[var(--accent)]"
        >
          Done
        </button>

      </div>

    </div>

  );
}