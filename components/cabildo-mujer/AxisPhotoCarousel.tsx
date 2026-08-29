"use client";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import type { AxisReport } from "@/data/oficina-mujer-report";

const INITIAL_BURST_DELAY = 1800;
const BETWEEN_BURSTS_DELAY = 2500;

const orderedIndices = (length: number) => Array.from({ length }, (_, index) => index);

const shuffleIndices = (length: number, avoidFirst?: number) => {
  const shuffled = orderedIndices(length);

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  if (length > 1 && shuffled[0] === avoidFirst) {
    const swapIndex = 1 + Math.floor(Math.random() * (length - 1));
    [shuffled[0], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[0]];
  }

  return shuffled;
};

export function AxisPhotoCarousel({ photos, color }: { photos: Readonly<AxisReport["photos"]>; color: string }) {
  const [photoOrder, setPhotoOrder] = useState(() => orderedIndices(photos.length));
  const [position, setPosition] = useState(0);
  const [paused, setPaused] = useState(false);
  const [bursting, setBursting] = useState(false);
  const pointerStart = useRef<number | null>(null);
  const burstPattern = useRef(0);
  const orderRef = useRef(photoOrder);
  const positionRef = useRef(position);
  const active = photoOrder[position] ?? 0;
  const indicatorCount = Math.min(9, photoOrder.length);
  const indicatorStart = Math.max(0, Math.min(position - Math.floor(indicatorCount / 2), photoOrder.length - indicatorCount));
  const visibleIndicators = photoOrder.slice(indicatorStart, indicatorStart + indicatorCount);

  const commitPosition = useCallback((nextOrder: number[], nextPosition: number, withSound = true) => {
    orderRef.current = nextOrder;
    positionRef.current = nextPosition;
    setPhotoOrder(nextOrder);
    setPosition(nextPosition);
    if (withSound) window.dispatchEvent(new Event("cabildo:carousel-change"));
  }, []);

  const move = useCallback((direction: number) => {
    if (photos.length < 2) return;

    const currentOrder = orderRef.current;
    const currentPosition = positionRef.current;
    if (direction > 0 && currentPosition === currentOrder.length - 1) {
      commitPosition(shuffleIndices(photos.length, currentOrder[currentPosition]), 0);
      return;
    }

    const nextPosition = (currentPosition + direction + currentOrder.length) % currentOrder.length;
    commitPosition(currentOrder, nextPosition);
  }, [commitPosition, photos.length]);

  useEffect(() => {
    const initialOrder = shuffleIndices(photos.length);
    commitPosition(initialOrder, 0, false);
  }, [commitPosition, photos]);

  useEffect(() => {
    setBursting(false);
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    const timers: number[] = [];
    const patterns = [
      [115, 120, 130, 155, 220],
      [105, 110, 120, 135, 165, 230, 310],
      [120, 125, 145, 180],
      [105, 110, 120, 135, 155, 185, 230, 320],
    ];
    const schedule = (callback: () => void, delay: number) => {
      const timer = window.setTimeout(callback, delay);
      timers.push(timer);
    };
    const runBurst = () => {
      if (cancelled) return;
      const baseRhythm = patterns[burstPattern.current % patterns.length];
      const rhythm = baseRhythm.length % photos.length === 0 ? [...baseRhythm, 360] : baseRhythm;
      burstPattern.current += 1;
      let step = 0;
      setBursting(true);

      const advance = () => {
        if (cancelled) return;
        move(1);
        step += 1;
        if (step < rhythm.length) {
          schedule(advance, rhythm[step]);
        } else {
          setBursting(false);
          schedule(runBurst, BETWEEN_BURSTS_DELAY);
        }
      };

      schedule(advance, rhythm[0]);
    };

    schedule(runBurst, INITIAL_BURST_DELAY);
    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [move, paused, photos.length]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => { pointerStart.current = event.clientX; };
  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(distance) > 42) move(distance < 0 ? 1 : -1);
  };

  return <div
    className={`axis-photo-carousel${bursting ? " is-bursting" : " is-resting"}`}
    style={{ "--axis-color": color } as CSSProperties}
    aria-label="Galería fotográfica simulada del eje"
    onMouseEnter={() => setPaused(true)}
    onMouseLeave={() => setPaused(false)}
    onFocusCapture={() => setPaused(true)}
    onBlurCapture={() => setPaused(false)}
    onPointerDown={handlePointerDown}
    onPointerUp={handlePointerUp}
  >
    <div className="axis-carousel-meta"><span>{bursting ? "Recorriendo la galería" : "Galería aleatoria"}</span><strong>{String(position + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}</strong></div>
    <div className="axis-photo-stack">{photos.map((photo, index) => {
      const offset = (index - active + photos.length) % photos.length;
      return <figure key={photo.src + photo.caption} className="axis-photo" data-position={offset} aria-hidden={offset !== 0}>
        <Image src={photo.src} alt={offset === 0 ? photo.alt : ""} fill sizes="(max-width: 900px) 82vw, 31vw" />
        <figcaption><span>{String(position + 1).padStart(2, "0")}</span>{photo.caption}</figcaption>
      </figure>;
    })}</div>
    <div className="axis-carousel-controls">
      <button type="button" onClick={() => move(-1)} aria-label="Fotografía anterior"><ChevronLeft aria-hidden="true" /></button>
      <div>{visibleIndicators.map((photoIndex, visiblePosition) => {
        const orderPosition = indicatorStart + visiblePosition;
        return <button key={photos[photoIndex].src} type="button" className={orderPosition === position ? "is-active" : ""} onClick={() => commitPosition(photoOrder, orderPosition)} aria-label={`Ver fotografía ${orderPosition + 1}`} />;
      })}</div>
      <button type="button" onClick={() => move(1)} aria-label="Fotografía siguiente"><ChevronRight aria-hidden="true" /></button>
    </div>
  </div>;
}
