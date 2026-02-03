import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function HolographicCard({ 
  children, 
  className = '',
  intensity = 1,
  disabled = false 
}) {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (disabled || !cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate percentage position
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    
    // Calculate rotation (max 15 degrees in each direction)
    const rotateY = ((xPercent - 50) / 50) * 15 * intensity;
    const rotateX = -((yPercent - 50) / 50) * 15 * intensity;
    
    setRotation({ x: rotateX, y: rotateY });
    setGlare({ x: xPercent, y: yPercent, opacity: 0.4 });
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    
    setRotation({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
    >
      {/* Holographic rainbow effect */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              circle at ${glare.x}% ${glare.y}%,
              rgba(255, 255, 255, 0.8) 0%,
              rgba(0, 255, 198, 0.6) 20%,
              rgba(138, 43, 226, 0.4) 40%,
              rgba(255, 105, 180, 0.3) 60%,
              transparent 80%
            )
          `,
          opacity: glare.opacity,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Glare effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              circle at ${glare.x}% ${glare.y}%,
              rgba(255, 255, 255, 0.3) 0%,
              transparent 50%
            )
          `,
          opacity: glare.opacity * 0.8,
          transition: 'opacity 0.2s ease',
        }}
      />

      {/* Shimmer effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(
              ${Math.atan2(glare.y - 50, glare.x - 50) * (180 / Math.PI) + 90}deg,
              transparent 0%,
              rgba(255, 255, 255, 0.1) 45%,
              rgba(255, 255, 255, 0.3) 50%,
              rgba(255, 255, 255, 0.1) 55%,
              transparent 100%
            )
          `,
          opacity: glare.opacity * 0.5,
        }}
      />

      {/* Border glow */}
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{
          boxShadow: `
            0 0 20px rgba(0, 255, 198, ${glare.opacity * 0.5}),
            inset 0 0 20px rgba(0, 255, 198, ${glare.opacity * 0.3})
          `,
          transition: 'box-shadow 0.3s ease',
        }}
      />

      {/* Content */}
      <div style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </motion.div>
  );
}

// Preset variants for quick use
export function HolographicProjectCard({ 
  title, 
  description, 
  tech = [], 
  image,
  className = '' 
}) {
  return (
    <HolographicCard 
      className={`
        p-6 rounded-2xl 
        bg-black/40 backdrop-blur-xl 
        border border-white/10
        ${className}
      `}
      intensity={0.8}
    >
      {image && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-48 object-cover"
          />
        </div>
      )}
      
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/70 mb-4">{description}</p>
      
      {tech.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tech.map((item, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs rounded-full bg-primary/20 text-primary border border-primary/30"
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </HolographicCard>
  );
}

export function HolographicMetricCard({ label, value, icon, className = '' }) {
  return (
    <HolographicCard 
      className={`
        p-6 rounded-xl 
        bg-black/40 backdrop-blur-xl 
        border border-white/10
        ${className}
      `}
      intensity={1.2}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-3xl font-bold text-primary mb-1">{value}</div>
          <div className="text-sm text-white/60">{label}</div>
        </div>
        {icon && (
          <div className="text-4xl opacity-50">{icon}</div>
        )}
      </div>
    </HolographicCard>
  );
}

export function HolographicSkillCard({ title, skills = [], icon, className = '' }) {
  return (
    <HolographicCard 
      className={`
        p-6 rounded-xl 
        bg-black/40 backdrop-blur-xl 
        border border-white/10
        ${className}
      `}
      intensity={0.9}
    >
      <div className="flex items-center gap-3 mb-4">
        {icon && <span className="text-3xl">{icon}</span>}
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>
      
      <div className="space-y-2">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white/80 hover:bg-white/10 hover:border-primary/30 transition"
          >
            {skill}
          </div>
        ))}
      </div>
    </HolographicCard>
  );
}
