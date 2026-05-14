"use client";

import { useCallback, useState } from "react";
import type { SocialBrandKey } from "@/lib/social-brand-links";
import { SOCIAL_BRAND_ICONS } from "@/lib/social-brand-links";

type Props = {
  publicUrl: string;
  brand: SocialBrandKey;
  size?: number;
  /** White glyphs on dark top bar (matches previous CSS filter on PNGs) */
  monochrome?: boolean;
  className?: string;
};

/**
 * Tries `/public` image first; on 404 or missing file shows brand SVG so slots never stay empty.
 */
export function SocialBrandGlyph({ publicUrl, brand, size = 20, monochrome, className }: Props) {
  const [failed, setFailed] = useState(false);
  const onError = useCallback(() => setFailed(true), []);
  const Fallback = SOCIAL_BRAND_ICONS[brand];

  if (failed) {
    return (
      <Fallback
        size={size}
        className={[monochrome ? "text-white opacity-95" : "text-slate-700", className].filter(Boolean).join(" ")}
        aria-hidden
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- intentional: onError fallback; avoids optimizer edge cases
    <img
      src={publicUrl}
      alt=""
      width={size}
      height={size}
      loading="eager"
      decoding="async"
      draggable={false}
      onError={onError}
      className={className}
      style={{
        display: "block",
        width: size,
        height: size,
        objectFit: "contain",
        ...(monochrome ? { filter: "brightness(0) invert(1)" } : {}),
      }}
      aria-hidden
    />
  );
}
