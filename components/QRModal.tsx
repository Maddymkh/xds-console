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

        <h2 className="text-2xl font-bold text-white">
          Scan to Begin
        </h2>

        <p className="mt-2 text-zinc-400">
          Ask the participant to scan this QR code.
        </p>

        <div className="mt-8 flex justify-center rounded-xl bg-white p-4">

          <QRCodeSVG
            value={url}
            size={250}
          />

        </div>

        <p className="mt-6 text-xs text-zinc-500 break-all">
          {url}
        </p>

        <button
          onClick={onClose}
          className="mt-8 rounded-xl bg-amber-500 text-black px-6 py-3 text-white hover:bg-indigo-500"
        >
          Done
        </button>

      </div>

    </div>

  );
}