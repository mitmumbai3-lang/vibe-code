import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * ThreeSacredCanvas
 * Renders a subtle, reverent particle constellation in the background.
 * Particles gently drift and form celestial alignments (sacred cross / star constellation).
 * Gracefully degrades to a CSS radial glow if WebGL is unavailable or reduced-motion is requested.
 */
export default function ThreeSacredCanvas({ currentChapterIndex = 0, isReducedMotion = false }) {
  const mountRef = useRef(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    if (isReducedMotion) return;

    // Check WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0c0a09, 0.0018);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 180;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      container.appendChild(renderer.domElement);
    } catch {
      setHasWebGL(false);
      return;
    }

    // Geometry - Celestial Stardust + Sacred Cross Alignment
    const particleCount = 650;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);

    // Warm Baroque Gold / Alabaster tones
    const goldColor = new THREE.Color(0xd4af37);
    const alabasterColor = new THREE.Color(0xf5f0e6);
    const crimsonColor = new THREE.Color(0x8c2424);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // 30% of particles form a subtle celestial cross in space
      if (i < particleCount * 0.3) {
        const isVertical = i % 2 === 0;
        if (isVertical) {
          positions[i3] = (Math.random() - 0.5) * 6; // x narrow
          positions[i3 + 1] = (Math.random() - 0.5) * 140; // y tall
          positions[i3 + 2] = (Math.random() - 0.5) * 20; // z
        } else {
          positions[i3] = (Math.random() - 0.5) * 85; // x wide
          positions[i3 + 1] = 20 + (Math.random() - 0.5) * 6; // y crossbeam
          positions[i3 + 2] = (Math.random() - 0.5) * 20;
        }

        const mixed = alabasterColor.clone().lerp(goldColor, Math.random());
        colors[i3] = mixed.r;
        colors[i3 + 1] = mixed.g;
        colors[i3 + 2] = mixed.b;
      } else {
        // Ambient celestial field
        positions[i3] = (Math.random() - 0.5) * 360;
        positions[i3 + 1] = (Math.random() - 0.5) * 260;
        positions[i3 + 2] = (Math.random() - 0.5) * 200;

        const mixed = Math.random() > 0.8
          ? crimsonColor.clone().lerp(goldColor, 0.4)
          : goldColor.clone().lerp(alabasterColor, Math.random());
        colors[i3] = mixed.r * 0.7;
        colors[i3 + 1] = mixed.g * 0.7;
        colors[i3 + 2] = mixed.b * 0.7;
      }

      originalPositions[i3] = positions[i3];
      originalPositions[i3 + 1] = positions[i3 + 1];
      originalPositions[i3 + 2] = positions[i3 + 2];
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Canvas circular soft particle texture
    const particleCanvas = document.createElement("canvas");
    particleCanvas.width = 32;
    particleCanvas.height = 32;
    const ctx = particleCanvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.3, "rgba(229, 209, 129, 0.8)");
      gradient.addColorStop(0.8, "rgba(212, 175, 55, 0.2)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const texture = new THREE.CanvasTexture(particleCanvas);

    const material = new THREE.PointsMaterial({
      size: 3.2,
      map: texture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.65,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse tilt effect
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 12;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 12;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Subtle slow rotation
      particles.rotation.y = elapsedTime * 0.025;
      particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.05;

      // Mouse lerping
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;
      particles.position.x = targetX;
      particles.position.y = -targetY;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !renderer) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer?.dispose();
    };
  }, [isReducedMotion]);

  if (isReducedMotion || !hasWebGL) {
    return (
      <div 
        className="pointer-events-none fixed inset-0 z-0 opacity-20 overflow-hidden" 
        aria-hidden="true"
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-400/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-crimson-600/10 blur-[100px]" />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="pointer-events-none fixed inset-0 z-10 opacity-70 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
}
