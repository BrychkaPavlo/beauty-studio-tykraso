"use client";

import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

type ParticleType = "dust" | "spark" | "glow";

interface Particle {
  id: number;
  type: ParticleType;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function HeroParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated: Particle[] = [];

    // Великі світлові плями
    for (let i = 0; i < 3; i++) {
      generated.push({
        id: generated.length,
        type: "glow",
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 220 + Math.random() * 180,
        duration: 24 + Math.random() * 10,
        delay: Math.random() * 5,
        opacity: 0.08 + Math.random() * 0.06,
      });
    }

    // Золотий пил
    for (let i = 0; i < 10; i++) {
      generated.push({
        id: generated.length,
        type: "dust",
        left: Math.random() * 100,
        top: 100 + Math.random() * 15,
        size: 8 + Math.random() * 12,
        duration: 18 + Math.random() * 12,
        delay: Math.random() * 8,
        opacity: 0.18 + Math.random() * 0.18,
      });
    }

    // Іскри
    for (let i = 0; i < 8; i++) {
      generated.push({
        id: generated.length,
        type: "spark",
        left: Math.random() * 100,
        top: 100 + Math.random() * 10,
        size: 2 + Math.random() * 3,
        duration: 12 + Math.random() * 8,
        delay: Math.random() * 10,
        opacity: 0.4 + Math.random() * 0.4,
      });
    }

    setParticles(generated);
  }, []);

  return (
    <div className={styles.particles}>
      {particles.map((particle) => (
        <span
          key={particle.id}
          className={`${styles.particle} ${styles[particle.type]}`}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
}