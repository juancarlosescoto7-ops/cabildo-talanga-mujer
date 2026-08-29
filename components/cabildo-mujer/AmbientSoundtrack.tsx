"use client";

import { Music2, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export type SoundtrackMood = "melancholic" | "silence" | "joyful";
export type SoundEffect = "intro" | "timeline" | "percentage" | "numbers" | "axis" | "testimony" | "closing";

type MusicTrack = "melancholic" | "joyful";

const MUSIC: Record<MusicTrack, string> = {
  melancholic: "/audio/cabildo-mujer/music/inicio-melancolico.mp3",
  joyful: "/audio/cabildo-mujer/music/testimonios-alegre.mp3",
};

const SFX = {
  timelineMeasure: "/audio/cabildo-mujer/sfx/linea-tiempo-regla.mp3",
  timelineMark: "/audio/cabildo-mujer/sfx/linea-tiempo-marca.mp3",
  count: "/audio/cabildo-mujer/sfx/conteo.mp3",
  harp: "/audio/cabildo-mujer/sfx/porcentaje-arpa.mp3",
  chartSplit: "/audio/cabildo-mujer/sfx/grafico-dividir.mp3",
  carousel: "/audio/cabildo-mujer/sfx/carrusel-cambio.mp3",
  shimmer: "/audio/cabildo-mujer/sfx/transicion-brillo.mp3",
  bell: "/audio/cabildo-mujer/sfx/campana-suave.mp3",
  testimony: "/audio/cabildo-mujer/sfx/testimonio-destello.mp3",
} as const;

const trackForMood = (mood: SoundtrackMood): MusicTrack | null => mood === "silence" ? null : mood;

export function AmbientSoundtrack({ mood, effect, cue }: { mood: SoundtrackMood; effect: SoundEffect; cue: number }) {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const musicRef = useRef<Partial<Record<MusicTrack, HTMLAudioElement>>>({});
  const sfxRef = useRef<Partial<Record<keyof typeof SFX, HTMLAudioElement>>>({});
  const fadeTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastCountTickRef = useRef(0);
  const lastCarouselTickRef = useRef(0);

  useEffect(() => {
    setReady(typeof window !== "undefined" && typeof Audio !== "undefined");
  }, []);

  const getMusic = useCallback((track: MusicTrack) => {
    let audio = musicRef.current[track];
    if (!audio) {
      audio = new Audio(MUSIC[track]);
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = 0;
      musicRef.current[track] = audio;
    }
    return audio;
  }, []);

  const playSfx = useCallback((name: keyof typeof SFX, volume: number, delay = 0) => {
    if (!enabled) return;
    let source = sfxRef.current[name];
    if (!source) {
      source = new Audio(SFX[name]);
      source.preload = "auto";
      sfxRef.current[name] = source;
    }
    const play = () => {
      const audio = source.cloneNode(true) as HTMLAudioElement;
      audio.volume = volume;
      void audio.play().catch(() => undefined);
    };
    if (delay > 0) window.setTimeout(play, delay);
    else play();
  }, [enabled]);

  const crossfadeTo = useCallback((track: MusicTrack | null) => {
    if (!enabled) return;
    if (track) {
      const target = getMusic(track);
      void target.play().catch(() => undefined);
    }
    if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);

    fadeTimerRef.current = setInterval(() => {
      let settled = true;
      (Object.keys(MUSIC) as MusicTrack[]).forEach((candidate) => {
        const audio = musicRef.current[candidate];
        if (!audio) return;
        const desired = candidate === track ? .19 : 0;
        const distance = desired - audio.volume;
        if (Math.abs(distance) > .006) {
          const fadeStep = track ? .006 : .0035;
          audio.volume = Math.max(0, Math.min(1, audio.volume + Math.sign(distance) * fadeStep));
          settled = false;
        } else {
          audio.volume = desired;
          if (candidate !== track) audio.pause();
        }
      });
      if (settled && fadeTimerRef.current) {
        clearInterval(fadeTimerRef.current);
        fadeTimerRef.current = null;
      }
    }, 45);
  }, [enabled, getMusic]);

  useEffect(() => {
    crossfadeTo(trackForMood(mood));
  }, [crossfadeTo, mood]);

  useEffect(() => {
    if (!enabled) return;
    if (effect === "timeline") {
      playSfx("timelineMeasure", .13);
      [70, 180, 290, 400].forEach((delay, index) => {
        playSfx("timelineMark", .055 + index * .012, delay);
      });
    }
    else if (effect === "percentage") playSfx("harp", .2);
    else if (effect === "numbers") playSfx("count", .12);
    else if (effect === "testimony") playSfx("testimony", .18);
    else if (effect === "axis") playSfx("shimmer", .12);
    else if (effect === "closing") playSfx("bell", .14);
  }, [cue, effect, enabled, playSfx]);

  useEffect(() => {
    const handleCount = () => {
      const now = performance.now();
      if (now - lastCountTickRef.current < 95) return;
      lastCountTickRef.current = now;
      playSfx("count", .075);
    };
    window.addEventListener("cabildo:count-tick", handleCount);
    return () => window.removeEventListener("cabildo:count-tick", handleCount);
  }, [playSfx]);

  useEffect(() => {
    const handleChartSplit = () => playSfx("chartSplit", .2);
    const handleCarouselChange = () => {
      const now = performance.now();
      if (now - lastCarouselTickRef.current < 85) return;
      lastCarouselTickRef.current = now;
      playSfx("carousel", .045);
    };
    window.addEventListener("cabildo:chart-split", handleChartSplit);
    window.addEventListener("cabildo:carousel-change", handleCarouselChange);
    return () => {
      window.removeEventListener("cabildo:chart-split", handleChartSplit);
      window.removeEventListener("cabildo:carousel-change", handleCarouselChange);
    };
  }, [playSfx]);

  useEffect(() => () => {
    if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
    Object.values(musicRef.current).forEach((audio) => audio.pause());
  }, []);

  const start = async () => {
    const track = trackForMood(mood);
    if (!track) {
      setEnabled(true);
      return;
    }
    const target = getMusic(track);
    target.volume = 0;
    try {
      await target.play();
      setEnabled(true);
    } catch (error) {
      console.warn("El navegador no permitió iniciar el audio.", error);
    }
  };

  const stop = () => {
    if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
    fadeTimerRef.current = null;
    Object.values(musicRef.current).forEach((audio) => {
      audio.pause();
      audio.volume = 0;
    });
    setEnabled(false);
  };

  if (!ready) return null;

  return (
    <button
      type="button"
      className={`soundtrack-button presentation-control intro-reveal intro-reveal--meta ${enabled ? "is-playing" : ""}`}
      onClick={enabled ? stop : start}
      aria-label={enabled ? "Silenciar música de fondo" : "Activar música de fondo"}
      title={enabled ? "Silenciar música" : "Activar música"}
    >
      {enabled ? <Volume2 aria-hidden="true" /> : Object.keys(musicRef.current).length ? <VolumeX aria-hidden="true" /> : <Music2 aria-hidden="true" />}
    </button>
  );
}
