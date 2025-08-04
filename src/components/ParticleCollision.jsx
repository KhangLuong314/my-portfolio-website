import { useState, useEffect, useRef } from 'react';
import '../designs/ParticleCollision.css';

const ParticleCollision = ({ scrollProgress = 0 }) => {
  const [collisionCount, setCollisionCount] = useState(0);
  const [energyLevel, setEnergyLevel] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [activeSegments, setActiveSegments] = useState([]);
  
  // --- CHANGE 1: Add state to manage the trail elements ---
  const [trails, setTrails] = useState([]);

  const beamParticlesRef = useRef([]);
  const scatteredParticlesRef = useRef([]);
  const lastCollisionTimeRef = useRef(0);
  const animationFrameRef = useRef(null);

  const DETECTOR_RADIUS = 350;
  const NUM_DETECTOR_SEGMENTS = 48;

  useEffect(() => {
    const particles = [];
    for (let i = 0; i < 10; i++) {
      particles.push({
        id: i,
        baseX: -(i * 100 + 150),
        speed: 1 + Math.random() * 0.8,
        pulseOffset: i,
      });
    }
    beamParticlesRef.current = particles;
  }, []);

  const createScatteredParticles = (x, y, energy) => {
    const particleCount = Math.floor(30 + energy * 50);
    const newParticles = [];
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 7 + Math.random() * 15 * (1 + energy);
      const life = 8 + Math.random() * 5;
      const particleType = ['proton', 'electron', 'exotic'][Math.floor(Math.random() * 3)];
      newParticles.push({
        id: Date.now() + i,
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: life,
        maxLife: life,
        decay: 0.995,
        type: particleType,
        hasHitDetector: false,
      });
    }
    scatteredParticlesRef.current = [...scatteredParticlesRef.current, ...newParticles];
  };

  const triggerCollision = () => {
    const now = Date.now();
    if (now - lastCollisionTimeRef.current < 500) return;
    lastCollisionTimeRef.current = now;
    setCollisionCount(prev => prev + 1);
    const collisionX = window.innerWidth * 0.6;
    const collisionY = window.innerHeight * 0.5;
    createScatteredParticles(collisionX, collisionY, scrollProgress);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
    const scene = document.querySelector('.particle-scene');
    if (scene) {
      scene.classList.add('collision-event');
      setTimeout(() => scene.classList.remove('collision-event'), 1000);
    }
  };

  useEffect(() => {
    const collisionPoint = window.innerWidth * 0.6;
    beamParticlesRef.current.forEach(particle => {
      const currentX = particle.baseX + scrollProgress * (collisionPoint + 800);
      if (currentX >= collisionPoint - 25 && currentX <= collisionPoint + 25) {
        if (Math.random() < 0.3) {
          triggerCollision();
        }
      }
    });
    setEnergyLevel(Math.round(scrollProgress * 13.8));
  }, [scrollProgress]);

  useEffect(() => {
    const animate = () => {
      const collisionX = window.innerWidth * 0.6;
      const collisionY = window.innerHeight * 0.5;
      const newActiveSegments = [];

      // --- CHANGE 2: Create a list of new trail segments each frame ---
      const newTrailSegments = [];

      scatteredParticlesRef.current = scatteredParticlesRef.current.filter(p => {
        // Create a trail segment at the particle's current position before it moves
        if (p.life > 0.1) { // Only create trails for living particles
            newTrailSegments.push({
                id: Math.random() + p.id,
                x: p.x,
                y: p.y,
                type: p.type, // Pass the type for coloring
                life: 20, // Lifespan in frames
                maxLife: 20,
            });
        }
        
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.998;
        p.vy *= 0.998;
        p.life *= p.decay;

        if (!p.hasHitDetector) {
          const distFromCenter = Math.sqrt(Math.pow(p.x - collisionX, 2) + Math.pow(p.y - collisionY, 2));
          if (distFromCenter >= DETECTOR_RADIUS) {
            p.hasHitDetector = true;
            const angle = Math.atan2(p.y - collisionY, p.x - collisionX);
            const segmentIndex = Math.floor(((angle + Math.PI) / (2 * Math.PI)) * NUM_DETECTOR_SEGMENTS);
            newActiveSegments.push({ id: segmentIndex, life: 10 });
            p.life = 0;
          }
        }
        return p.life > 0.05;
      });
      
      setActiveSegments(prev => {
        const next = [...prev, ...newActiveSegments].map(s => ({...s, life: s.life - 1})).filter(s => s.life > 0);
        return [...new Map(next.map(item => [item.id, item])).values()];
      });

      // --- CHANGE 3: Update the trails state ---
      // This updates existing trails (reducing their life) and adds the new ones
      setTrails(prevTrails => [
          ...prevTrails.map(t => ({ ...t, life: t.life - 1 })).filter(t => t.life > 0),
          ...newTrailSegments
      ]);
      
      scatteredParticlesRef.current.forEach(p => {
        const element = document.getElementById(`scattered-${p.id}`);
        if (element) {
          const opacity = p.life / p.maxLife;
          const rotation = Math.atan2(p.vy, p.vx) * (180 / Math.PI);
          element.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${rotation}deg)`;
          element.style.opacity = opacity;
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const detectorSegments = Array.from({ length: NUM_DETECTOR_SEGMENTS }, (_, i) => {
      const angle = (i * 360) / NUM_DETECTOR_SEGMENTS;
      const isActive = activeSegments.some(s => s.id === i);
      return <div key={i} className={`detector-segment ${isActive ? 'active' : ''}`} style={{ transform: `rotate(${angle}deg) translate(${DETECTOR_RADIUS}px)` }} />;
  });

  return (
    <div className={`particle-collision-container ${isShaking ? 'screen-shake' : ''}`}>
      <div className="particle-scene">
        <div className="beam-line" />
        <div className="target-particle" />

        <div className="collision-effects">
            <div className="collision-flash" />
            <div className="blast-wave" />
            <div className="shock-wave" />
        </div>

        {beamParticlesRef.current.map(p => (
          <div key={p.id} className="particle beam-particle" style={{ left: `${p.baseX + scrollProgress * (window.innerWidth * 0.6 + 1600)}px`, opacity: Math.sin(Date.now() * 0.005 + p.pulseOffset) * 0.4 + 0.6 }} />
        ))}
        
        {/* --- CHANGE 4: Render the trail segments --- */}
        {trails.map(t => (
            <div
                key={t.id}
                className={`trail-segment ${t.type}`}
                style={{
                    transform: `translate(${t.x}px, ${t.y}px)`,
                    opacity: t.life / t.maxLife, // Fade out over its lifetime
                }}
            />
        ))}

        {scatteredParticlesRef.current.map(p => (
            <div key={p.id} id={`scattered-${p.id}`} className={`particle scattered-particle ${p.type}`} />
        ))}

        <div className="detector">
          <div className="detector-ring" />
          {detectorSegments}
        </div>

        <div className="particle-hud">
          <div>LHC STATUS: <span style={{color: '#4dff4d'}}>ONLINE</span></div>
          <div>ENERGY LEVEL: <span>{energyLevel.toFixed(2)}</span> TeV</div>
          <div className="energy-bar"><div className="energy-fill" style={{ width: `${Math.min(scrollProgress * 100, 100)}%` }} /></div>
          <div>COLLISION EVENTS: <span>{collisionCount}</span></div>
          <div>SCROLL: <span>{Math.round(scrollProgress * 100)}</span>%</div>
        </div>
      </div>
    </div>
  );
};

export default ParticleCollision;