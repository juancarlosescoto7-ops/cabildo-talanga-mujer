"use client";

import { useEffect, useState } from "react";

const NUMERIC_TOKEN = /\d+(?:[.,]\d+)*/g;

type CountUpTextProps = {
  value: number | string;
  duration?: number;
  delay?: number;
};

function formatToken(token: string, progress: number) {
  const lastDot = token.lastIndexOf(".");
  const lastComma = token.lastIndexOf(",");
  const lastSeparator = Math.max(lastDot, lastComma);
  const digitsAfterSeparator = lastSeparator >= 0 ? token.length - lastSeparator - 1 : 0;
  const hasBothSeparators = lastDot >= 0 && lastComma >= 0;
  const hasDecimalSeparator = lastSeparator >= 0 && (hasBothSeparators || digitsAfterSeparator !== 3);
  const decimalSeparator = hasDecimalSeparator ? token[lastSeparator] : "";
  const decimalPlaces = hasDecimalSeparator ? digitsAfterSeparator : 0;
  const groupSeparator = token.includes(",") && decimalSeparator !== ","
    ? ","
    : token.includes(".") && decimalSeparator !== "."
      ? "."
      : "";
  const normalized = decimalSeparator
    ? `${token.slice(0, lastSeparator).replace(/[.,]/g, "")}.${token.slice(lastSeparator + 1)}`
    : token.replace(/[.,]/g, "");
  const target = Number(normalized);

  if (!Number.isFinite(target)) return token;

  const [integerPart, decimalPart] = (target * progress).toFixed(decimalPlaces).split(".");
  const groupedInteger = groupSeparator
    ? integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator)
    : integerPart;

  return decimalPlaces > 0 ? `${groupedInteger}${decimalSeparator}${decimalPart}` : groupedInteger;
}

function formatAtProgress(value: string, progress: number) {
  return value.replace(NUMERIC_TOKEN, (token) => formatToken(token, progress));
}

export function CountUpText({ value, duration = 1100, delay = 180 }: CountUpTextProps) {
  const finalText = String(value);
  const [displayText, setDisplayText] = useState(() => formatAtProgress(finalText, 0));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayText(finalText);
      return;
    }

    let animationFrame = 0;
    const startsAt = performance.now() + delay;

    const tick = (now: number) => {
      const linearProgress = Math.min(1, Math.max(0, (now - startsAt) / duration));
      const easedProgress = 1 - (1 - linearProgress) ** 3;
      setDisplayText(formatAtProgress(finalText, easedProgress));

      if (linearProgress < 1) animationFrame = requestAnimationFrame(tick);
    };

    setDisplayText(formatAtProgress(finalText, 0));
    animationFrame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrame);
  }, [delay, duration, finalText]);

  return (
    <data className="count-up-text" value={finalText} aria-label={finalText}>
      {displayText}
    </data>
  );
}
