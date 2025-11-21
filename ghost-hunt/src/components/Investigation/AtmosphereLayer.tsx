// Atmosphere Layer - Vignette and particles
import './AtmosphereLayer.css';

interface AtmosphereLayerProps {
  sanity: number; // 0-100
}

export function AtmosphereLayer({ sanity }: AtmosphereLayerProps) {
  const isLowSanity = sanity < 30;
  const isCriticalSanity = sanity < 15;

  // Calculate vignette intensity based on sanity
  const vignetteIntensity = Math.max(0.3, 1 - sanity / 100);

  return (
    <div className="atmosphere-layer">
      {/* Vignette */}
      <div
        className={`atmosphere-vignette ${isLowSanity ? 'low-sanity' : ''} ${isCriticalSanity ? 'critical-sanity' : ''}`}
        style={{
          opacity: vignetteIntensity,
        }}
      />

      {/* Particle effects (dust, static) */}
      <div className="atmosphere-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="atmosphere-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
