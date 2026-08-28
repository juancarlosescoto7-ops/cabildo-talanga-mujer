"use client";

import { Maximize2, Minimize2 } from "lucide-react";
import { useEffect, useState } from "react";

export function FullscreenButton() {
  const [supported, setSupported] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    setSupported(Boolean(document.documentElement.requestFullscreen));
    const handleFullscreenChange = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
      }
    } catch (error) {
      console.warn("El modo de pantalla completa no está disponible.", error);
    }
  };

  if (!supported) return null;

  return (
    <button
      type="button"
      className="fullscreen-button presentation-control intro-reveal intro-reveal--meta"
      onClick={toggleFullscreen}
      aria-label={fullscreen ? "Salir de pantalla completa" : "Entrar en pantalla completa"}
      title={fullscreen ? "Salir de pantalla completa" : "Modo presentación"}
    >
      {fullscreen ? <Minimize2 aria-hidden="true" /> : <Maximize2 aria-hidden="true" />}
    </button>
  );
}
