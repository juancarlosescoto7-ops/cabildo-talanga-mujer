"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type TouchEvent as ReactTouchEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import { flushSync } from "react-dom";
import { AxisAllocationTabs } from "./AxisAllocationTabs";
import { AmbientSoundtrack, type SoundEffect, type SoundtrackMood } from "./AmbientSoundtrack";
import { EditorialVisual } from "./EditorialVisual";
import { DetallePorcentajesSlide } from "./DetallePorcentajesSlide";
import { EjeActividadesSlide } from "./EjeActividadesSlide";
import { EjeFinancieroSlide } from "./EjeFinancieroSlide";
import { EjeTestimonioSlide } from "./EjeTestimonioSlide";
import { FullscreenButton } from "./FullscreenButton";
import { IntroOverlay } from "./IntroOverlay";
import { InteresSectorMujerCover } from "./InteresSectorMujerCover";
import { InteresSectorMujerSlide } from "./InteresSectorMujerSlide";
import { MarcoLegalSlide } from "./MarcoLegalSlide";
import { MotivoSlide } from "./MotivoSlide";
import { CommitmentSummarySlide, FinalMessageSlide, HumanOpeningSlide, ListeningSlide, RoadmapSlide } from "./NarrativeSlides";
import { SituacionFinancieraSlide } from "./SituacionFinancieraSlide";
import { WomenRightsTimelineRail, WomenRightsTimelineSlide } from "./WomenRightsTimelineSlide";
import { officeWomanReport } from "@/data/oficina-mujer-report";

const INTEREST_COVER_SLIDE = 4;
const FIRST_INTEREST_SLIDE = INTEREST_COVER_SLIDE + 1;
const LAST_INTEREST_CONTEXT_SLIDE = FIRST_INTEREST_SLIDE + 1;
const FIRST_TIMELINE_SLIDE = LAST_INTEREST_CONTEXT_SLIDE + 1;
const TIMELINE_SLIDE_COUNT = 3;
const INTEREST_ALLOCATION_SLIDE = FIRST_TIMELINE_SLIDE + TIMELINE_SLIDE_COUNT;
const LEGAL_SLIDE = INTEREST_ALLOCATION_SLIDE + 1;
const FIRST_AXIS_SLIDE = LEGAL_SLIDE + 1;
type AxisSlidePhase = 0 | 1 | 2 | 3;
const AXIS_SLIDE_SEQUENCE = officeWomanReport.axes.flatMap((axis, axisIndex) => {
  const phases: AxisSlidePhase[] = axis.representative ? [0, 1, 2, 3] : [0, 1, 2];
  return phases.map((phase) => ({ axis: axisIndex, phase }));
});
const LAST_AXIS_SLIDE = FIRST_AXIS_SLIDE + AXIS_SLIDE_SEQUENCE.length - 1;
const FINANCIAL_SLIDE = LAST_AXIS_SLIDE + 1;
const SUMMARY_SLIDE = FINANCIAL_SLIDE + 1;
const LISTENING_SLIDE = SUMMARY_SLIDE + 1;
const LAST_SLIDE = LISTENING_SLIDE + 1;

const isAxisSlide = (slide: number) => slide >= FIRST_AXIS_SLIDE && slide <= LAST_AXIS_SLIDE;
const axisPosition = (slide: number) => AXIS_SLIDE_SEQUENCE[slide - FIRST_AXIS_SLIDE] ?? { axis: 0, phase: 0 as AxisSlidePhase };
const firstSlideForAxis = (axis: number) => FIRST_AXIS_SLIDE + AXIS_SLIDE_SEQUENCE.findIndex((position) => position.axis === axis);

type BrowserViewTransition = {
  finished: Promise<void>;
};

type DocumentWithViewTransition = Document & {
  startViewTransition?: (update: () => void) => BrowserViewTransition;
};

export function CabildoMujerExperience() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [controlsIdle, setControlsIdle] = useState(false);
  const [legalChartShared, setLegalChartShared] = useState(false);
  const [slideTransition, setSlideTransition] = useState("neutral");
  const experienceRef = useRef<HTMLElement>(null);
  const activeSlideRef = useRef(0);
  const viewTransitionRunning = useRef(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const wakeControls = useCallback(() => {
    setControlsIdle(false);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setControlsIdle(true), 4200);
  }, []);

  const goToSlide = useCallback((slide: number) => {
    const nextSlide = Math.max(0, Math.min(LAST_SLIDE, slide));
    const previousSlide = activeSlideRef.current;

    if (nextSlide === previousSlide || viewTransitionRunning.current) return;

    const transitionDocument = document as DocumentWithViewTransition;
    const isTimelineSlide = (candidate: number) =>
      candidate >= FIRST_TIMELINE_SLIDE && candidate < INTEREST_ALLOCATION_SLIDE;
    const shouldShareLegalChart =
      previousSlide === INTEREST_ALLOCATION_SLIDE &&
      nextSlide === LEGAL_SLIDE &&
      Boolean(transitionDocument.startViewTransition) &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nextTransition = (() => {
      if (isAxisSlide(previousSlide) && isAxisSlide(nextSlide)) {
        const previous = axisPosition(previousSlide);
        const next = axisPosition(nextSlide);
        if (previous.axis === next.axis && next.phase > previous.phase) return "down";
        if (previous.axis === next.axis && next.phase < previous.phase) return "up";
        return nextSlide > previousSlide ? "side-forward" : "side-back";
      }
      if (isTimelineSlide(previousSlide) && isTimelineSlide(nextSlide)) {
        return nextSlide > previousSlide ? "timeline-forward" : "timeline-back";
      }
      return nextSlide > previousSlide ? "side-forward" : "side-back";
    })();
    const commitSlide = (sharedChart: boolean) => {
      activeSlideRef.current = nextSlide;
      setLegalChartShared(sharedChart);
      setSlideTransition(nextTransition);
      setActiveSlide(nextSlide);
    };

    if (shouldShareLegalChart && transitionDocument.startViewTransition) {
      viewTransitionRunning.current = true;

      try {
        const transition = transitionDocument.startViewTransition(() => {
          flushSync(() => commitSlide(true));
        });

        void transition.finished
          .catch(() => undefined)
          .finally(() => {
            viewTransitionRunning.current = false;
          });
        return;
      } catch {
        viewTransitionRunning.current = false;
      }
    }

    commitSlide(false);
  }, []);

  const moveSlide = useCallback((direction: 1 | -1) => {
    goToSlide(activeSlideRef.current + direction);
  }, [goToSlide]);

  useEffect(() => {
    wakeControls();
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      if (wheelTimer.current) clearTimeout(wheelTimer.current);
    };
  }, [wakeControls]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target?.tagName ?? "")) {
        return;
      }

      const nextKeys = ["ArrowDown", "ArrowRight", "Enter", "Space", "PageDown"];
      const previousKeys = ["ArrowUp", "ArrowLeft", "Backspace", "PageUp"];

      if (nextKeys.includes(event.code)) {
        event.preventDefault();
        moveSlide(1);
        wakeControls();
      } else if (previousKeys.includes(event.code)) {
        event.preventDefault();
        moveSlide(-1);
        wakeControls();
      } else if (event.code === "Home") {
        event.preventDefault();
        goToSlide(0);
      } else if (event.code === "End") {
        event.preventDefault();
        goToSlide(LAST_SLIDE);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToSlide, moveSlide, wakeControls]);

  const handleWheel = useCallback(
    (event: ReactWheelEvent<HTMLElement>) => {
      if (Math.abs(event.deltaY) < 18 || wheelTimer.current) return;
      moveSlide(event.deltaY > 0 ? 1 : -1);
      wakeControls();
      wheelTimer.current = setTimeout(() => {
        wheelTimer.current = null;
      }, 720);
    },
    [moveSlide, wakeControls],
  );

  const handleTouchStart = useCallback((event: ReactTouchEvent<HTMLElement>) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchEnd = useCallback(
    (event: ReactTouchEvent<HTMLElement>) => {
      const start = touchStart.current;
      const touch = event.changedTouches[0];
      touchStart.current = null;
      if (!start || !touch) return;

      const deltaX = touch.clientX - start.x;
      const deltaY = touch.clientY - start.y;
      const dominantDelta = Math.abs(deltaY) > Math.abs(deltaX) ? deltaY : deltaX;
      if (Math.abs(dominantDelta) < 42) return;
      moveSlide(dominantDelta < 0 ? 1 : -1);
      wakeControls();
    },
    [moveSlide, wakeControls],
  );

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      wakeControls();
      const root = experienceRef.current;
      if (!root) return;

      const x = (event.clientX / window.innerWidth - 0.5) * 14;
      const y = (event.clientY / window.innerHeight - 0.5) * 9;
      root.style.setProperty("--parallax-x", `${x.toFixed(2)}px`);
      root.style.setProperty("--parallax-y", `${y.toFixed(2)}px`);
    },
    [wakeControls],
  );

  const resetParallax = useCallback(() => {
    experienceRef.current?.style.setProperty("--parallax-x", "0px");
    experienceRef.current?.style.setProperty("--parallax-y", "0px");
  }, []);

  const currentAxisPhase = isAxisSlide(activeSlide) ? axisPosition(activeSlide).phase : null;
  const soundtrackMood: SoundtrackMood = activeSlide === INTEREST_ALLOCATION_SLIDE - 1
    ? "silence"
    : activeSlide < INTEREST_ALLOCATION_SLIDE
      ? "melancholic"
      : "joyful";
  const soundtrackEffect: SoundEffect = activeSlide >= FIRST_TIMELINE_SLIDE && activeSlide < INTEREST_ALLOCATION_SLIDE
    ? "timeline"
    : activeSlide === INTEREST_ALLOCATION_SLIDE
      ? "percentage"
      : currentAxisPhase === 3
        ? "testimony"
        : currentAxisPhase === 1 || activeSlide === FINANCIAL_SLIDE
          ? "numbers"
          : currentAxisPhase !== null
            ? "axis"
            : activeSlide >= SUMMARY_SLIDE
              ? "closing"
              : "intro";

  return (
    <main
      ref={experienceRef}
      className={`cabildo-experience view-${activeSlide + 1} ${controlsIdle ? "is-controls-idle" : ""} ${isAxisSlide(activeSlide) ? "is-axis-sequence" : ""} ${isAxisSlide(activeSlide) && axisPosition(activeSlide).phase === 1 ? "is-axis-financial" : ""}`}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetParallax}
    >
      <div className="ambient-backdrop" aria-hidden="true" />

      <div
        key={activeSlide}
        className={`slide-stage slide-stage--${slideTransition} ${legalChartShared ? "slide-stage--shared-chart" : ""}`}
      >
        {activeSlide === 0 ? (
          <>
            <EditorialVisual />
            <IntroOverlay />
          </>
        ) : activeSlide === 1 ? (
          <HumanOpeningSlide />
        ) : activeSlide === 2 ? (
          <MotivoSlide />
        ) : activeSlide === 3 ? (
          <RoadmapSlide />
        ) : activeSlide === INTEREST_COVER_SLIDE ? (
          <InteresSectorMujerCover />
        ) : activeSlide <= LAST_INTEREST_CONTEXT_SLIDE ? (
          <InteresSectorMujerSlide step={(activeSlide - FIRST_INTEREST_SLIDE) as 0 | 1 | 2} />
        ) : activeSlide >= FIRST_TIMELINE_SLIDE && activeSlide < INTEREST_ALLOCATION_SLIDE ? (
          <WomenRightsTimelineSlide step={(activeSlide - FIRST_TIMELINE_SLIDE) as 0 | 1 | 2} />
        ) : activeSlide === INTEREST_ALLOCATION_SLIDE ? (
          <InteresSectorMujerSlide step={2} />
        ) : activeSlide === LEGAL_SLIDE ? (
          <MarcoLegalSlide sharedChartEntry={legalChartShared} />
        ) : activeSlide >= FIRST_AXIS_SLIDE && activeSlide <= LAST_AXIS_SLIDE ? (
          axisPosition(activeSlide).phase === 0
            ? <DetallePorcentajesSlide activeAxis={axisPosition(activeSlide).axis} />
            : axisPosition(activeSlide).phase === 1
              ? <EjeFinancieroSlide activeAxis={axisPosition(activeSlide).axis} />
              : axisPosition(activeSlide).phase === 2
                ? <EjeActividadesSlide activeAxis={axisPosition(activeSlide).axis} />
                : <EjeTestimonioSlide activeAxis={axisPosition(activeSlide).axis} />
        ) : activeSlide === FINANCIAL_SLIDE ? (
          <SituacionFinancieraSlide />
        ) : activeSlide === SUMMARY_SLIDE ? (
          <CommitmentSummarySlide />
        ) : activeSlide === LISTENING_SLIDE ? (
          <ListeningSlide />
        ) : (
          <FinalMessageSlide />
        )}
      </div>

      <WomenRightsTimelineRail
        activeStep={
          activeSlide >= FIRST_TIMELINE_SLIDE && activeSlide < INTEREST_ALLOCATION_SLIDE
            ? (activeSlide - FIRST_TIMELINE_SLIDE) as 0 | 1 | 2
            : null
        }
      />

      {activeSlide >= LEGAL_SLIDE && activeSlide <= LAST_AXIS_SLIDE && (
        <AxisAllocationTabs
          mode={activeSlide === LEGAL_SLIDE ? "legal" : "detail"}
          activeAxis={activeSlide === LEGAL_SLIDE ? 0 : axisPosition(activeSlide).axis}
          onSelect={(index) => goToSlide(firstSlideForAxis(index))}
        />
      )}

      <button
        type="button"
        className="navigation-zone navigation-zone--previous"
        onClick={() => moveSlide(-1)}
        aria-label="Vista anterior"
      />
      <button
        type="button"
        className="navigation-zone navigation-zone--next"
        onClick={() => moveSlide(1)}
        aria-label="Vista siguiente"
      />

      <FullscreenButton />
      <AmbientSoundtrack mood={soundtrackMood} effect={soundtrackEffect} cue={activeSlide} />
      <div className="grain" aria-hidden="true" />
    </main>
  );
}
