"use client"

import createGlobe from "cobe";
import { useEffect, useRef } from "react";

export default function Cobe({ coords, size }) {
  const canvasRef = useRef();

  useEffect(() => {
    let phi = 0;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: size * 2,
      height: size * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      opacity: 0.6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        { location: [coords.latitude, coords.longitude], size: 0.1 }
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.005;
      }
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas
    ref={canvasRef}
    style={{ width: size, height: size, maxWidth: "100%", aspectRatio: 1 }}
    />
  );
}
