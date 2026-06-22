"use client";

import { useState } from "react";

/**
 * Reusable, privacy-friendly YouTube embed using the "facade" pattern: shows
 * just the thumbnail until the user clicks, then swaps in the real iframe. Keeps
 * stories fast (no YouTube JS on load) and uses the no-cookie domain.
 */
export function VideoEmbed({
  id,
  title = "Video",
  start,
}: {
  id: string;
  title?: string;
  /** Optional start time, in seconds. */
  start?: number;
}) {
  const [active, setActive] = useState(false);
  const [thumb, setThumb] = useState(
    `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
  );

  const src =
    `https://www.youtube-nocookie.com/embed/${id}` +
    `?autoplay=1&rel=0${start ? `&start=${start}` : ""}`;

  return (
    <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-black shadow-sm">
      {active ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          onClick={() => setActive(true)}
          aria-label={`Play: ${title}`}
          className="group absolute inset-0 h-full w-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb}
            alt={title}
            loading="lazy"
            onError={() =>
              setThumb(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)
            }
            className="h-full w-full object-cover transition group-hover:scale-[1.02]"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition group-hover:bg-black/15">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 shadow-lg transition group-hover:scale-110">
              <svg
                viewBox="0 0 24 24"
                fill="white"
                className="ml-1 h-7 w-7"
                aria-hidden
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
