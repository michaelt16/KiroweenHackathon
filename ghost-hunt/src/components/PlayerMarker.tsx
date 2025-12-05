// Custom player marker - Detective character video with silhouette
import { Marker, Popup, Circle, useMap, useMapEvents } from 'react-leaflet';
import { useGameState } from '../context/GameStateContext';
import { useMapData } from '../context/MapDataContext';
import { isInRange } from '../utils/distance';
import { divIcon } from 'leaflet';
import { useEffect, useState, useMemo, useRef } from 'react';
import detectiveIdleVideo from '../assets/videos/dectective/dectective_idle.mp4';
import detectiveIdle2Video from '../assets/videos/dectective/dectective_idle2.mp4';
import detectiveIdle3Video from '../assets/videos/dectective/dectective_idle3.mp4';
import detectiveWalkVideo from '../assets/videos/dectective/dectective_walk.mp4';
import detectiveWalk2Video from '../assets/videos/dectective/dectective_walk2.mp4';
import detectiveWalk3Video from '../assets/videos/dectective/dectective_walk3.mp4';
import detectiveWalk4Video from '../assets/videos/dectective/dectective_walk4.mp4';
import detectiveMagnifyingVideo from '../assets/videos/dectective/dectective_magnifying.mp4';

// Inner component that has access to map zoom
function ZoomAwarePlayerMarker() {
  const { playerPosition, isPlayerMoving, movementDirection } = useGameState();
  const { hotspots } = useMapData();
  const map = useMap();
  const [zoom, setZoom] = useState(map.getZoom());
  const [hasPlayedMagnifying, setHasPlayedMagnifying] = useState(false);
  const [wasInInvestigationRadius, setWasInInvestigationRadius] = useState(false);
  const [wasMoving, setWasMoving] = useState(false);
  const [currentIdleIndex, setCurrentIdleIndex] = useState(0);
  const switchTimeoutRef = useRef<number | null>(null);
  const lastVideoRef = useRef<string | null>(null);
  
  // Array of idle animations
  const idleVideos = [detectiveIdleVideo, detectiveIdle2Video, detectiveIdle3Video];
  
  // Check if player is in range of any hotspot (investigation radius)
  const isInInvestigationRadius = hotspots.some(hotspot => 
    isInRange(playerPosition, { lat: hotspot.lat, lng: hotspot.lng })
  );

  // Track when player enters/exits investigation radius
  useEffect(() => {
    if (isInInvestigationRadius && !wasInInvestigationRadius) {
      // Just entered investigation radius - reset flag to play animation
      setHasPlayedMagnifying(false);
    } else if (!isInInvestigationRadius && wasInInvestigationRadius) {
      // Just left investigation radius - reset flag
      setHasPlayedMagnifying(false);
    }
    setWasInInvestigationRadius(isInInvestigationRadius);
  }, [isInInvestigationRadius, wasInInvestigationRadius]);

  // Track when movement stops in investigation radius to trigger magnifying animation
  useEffect(() => {
    if (isInInvestigationRadius) {
      if (wasMoving && !isPlayerMoving) {
        // Just stopped moving in investigation radius - reset flag to play magnifying animation
        setHasPlayedMagnifying(false);
      } else if (!wasMoving && isPlayerMoving) {
        // Just started moving - reset flag so magnifying will play again when movement stops
        setHasPlayedMagnifying(false);
      }
    }
    setWasMoving(isPlayerMoving);
  }, [isPlayerMoving, isInInvestigationRadius, wasMoving]);

  // Listen to zoom changes
  useMapEvents({
    zoomend: () => {
      setZoom(map.getZoom());
    },
    zoom: () => {
      setZoom(map.getZoom());
    },
  });

  // Calculate size based on zoom level
  // Min zoom (10) = small size (50x75px)
  // Max zoom (20) = large size (120x180px)
  // Base zoom is 16
  const minZoom = 10;
  const maxZoom = 20;
  const minWidth = 50;
  const minHeight = 75;
  const maxWidth = 120;
  const maxHeight = 180;
  
  // Linear interpolation between min and max based on zoom
  const zoomRange = maxZoom - minZoom;
  const currentZoomRange = Math.max(minZoom, Math.min(maxZoom, zoom)) - minZoom;
  const zoomProgress = currentZoomRange / zoomRange; // 0 to 1
  
  const width = minWidth + (maxWidth - minWidth) * zoomProgress;
  const height = minHeight + (maxHeight - minHeight) * zoomProgress;
  
  // Calculate mask size proportionally
  const maskWidth = (65 / 120) * width;
  const maskHeight = (120 / 180) * height;

  // Select video based on movement state, direction, and investigation radius
  // In investigation radius: walk when moving, magnifying when idle (after walk finishes)
  // Outside investigation radius: walk when moving, random idle when not
  const currentVideo = isInInvestigationRadius
    ? (isPlayerMoving 
      ? (movementDirection === 'north' ? detectiveWalk2Video 
        : movementDirection === 'west' ? detectiveWalk3Video 
        : movementDirection === 'east' ? detectiveWalk4Video 
        : detectiveWalkVideo) // Walk animations when moving in investigation zone
      : detectiveMagnifyingVideo) // Magnifying animation when idle in investigation zone
    : (isPlayerMoving 
      ? (movementDirection === 'north' ? detectiveWalk2Video 
        : movementDirection === 'west' ? detectiveWalk3Video 
        : movementDirection === 'east' ? detectiveWalk4Video 
        : detectiveWalkVideo) // Default/south uses walk
      : idleVideos[currentIdleIndex]); // Random idle when not in investigation radius

  // Only preload the current video (lazy loading optimization)
  useEffect(() => {
    if (!currentVideo) return;
    
    const video = document.createElement('video');
    video.src = currentVideo;
    video.preload = 'auto';
    video.muted = true;
    
    // Cleanup
    return () => {
      video.src = '';
    };
  }, [currentVideo]);
  
  // Cycle through idle animations when idle (not in investigation radius and not moving)
  useEffect(() => {
    if (!isInInvestigationRadius && !isPlayerMoving) {
      // When idle, cycle through idle animations
      const idleInterval = setInterval(() => {
        setCurrentIdleIndex((prevIndex) => {
          // Randomly select a different idle animation (not the same one twice in a row)
          const availableIndices = idleVideos.map((_, index) => index).filter(index => index !== prevIndex);
          const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
          return randomIndex;
        });
      }, 4000 + Math.random() * 3000); // 4-7 seconds between idle animation changes
      
      return () => clearInterval(idleInterval);
    }
  }, [isInInvestigationRadius, isPlayerMoving]);
  
  // OPTIMIZED: Use requestAnimationFrame instead of setInterval for better performance
  // (Keeping old code above for now, but this is the optimized version)
  useEffect(() => {
    if (isInInvestigationRadius || isPlayerMoving) {
      return;
    }
    
    const targetInterval = 4000 + Math.random() * 3000;
    let lastSwitchTime = performance.now();
    let animationFrameId: number | null = null;
    
    const animate = (currentTime: number) => {
      if (isInInvestigationRadius || isPlayerMoving) {
        if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
        return;
      }
      
      const elapsed = currentTime - lastSwitchTime;
      if (elapsed >= targetInterval) {
        setCurrentIdleIndex((prevIndex) => {
          const availableIndices = idleVideos.map((_, index) => index).filter(index => index !== prevIndex);
          const randomIndex = Math.floor(Math.random() * availableIndices.length);
          return availableIndices[randomIndex];
        });
        lastSwitchTime = currentTime;
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInInvestigationRadius, isPlayerMoving]);

  // Ensure video autoplays and handles transitions smoothly
  useEffect(() => {
    if (lastVideoRef.current === currentVideo) {
      return; // nothing to do
    }
    lastVideoRef.current = currentVideo;

    if (switchTimeoutRef.current !== null) {
      clearTimeout(switchTimeoutRef.current);
    }

    switchTimeoutRef.current = window.setTimeout(() => {
      const videoElements = document.querySelectorAll('.detective-character-video');
      videoElements.forEach((video) => {
        if (!(video instanceof HTMLVideoElement)) return;
        
        const currentVideoUrl = new URL(currentVideo, window.location.href).href;
        const videoUrl = video.src || video.currentSrc;
        
        if (videoUrl === currentVideoUrl || videoUrl.includes(currentVideo)) {
          // same video – just ensure loop / play logic like before
          if (isInInvestigationRadius && currentVideo === detectiveMagnifyingVideo && !isPlayerMoving) {
            video.loop = false;
            if (video.paused) {
              const handleEnded = () => {
                video.pause();
                if (video.duration && !isNaN(video.duration)) {
                  video.currentTime = Math.max(0, video.duration - 0.1);
                }
                setHasPlayedMagnifying(true);
              };
              video.addEventListener('ended', handleEnded, { once: true });
              video.play().catch(() => {});
            }
          } else {
            video.loop = true;
            if (video.paused) {
              video.play().catch(() => {});
            }
          }
          return;
        }
        
        // actually switching to a new src (debounced)
        const wasPlaying = !video.paused;
        video.src = currentVideo;
        
        if (isInInvestigationRadius && currentVideo === detectiveMagnifyingVideo && !isPlayerMoving) {
          video.loop = false;
        } else {
          video.loop = true;
        }
        
        const tryPlay = () => {
          if (wasPlaying) {
            video.play().catch(() => {});
          }
        };
        
        if (video.readyState >= 3) {
          tryPlay();
        } else {
          const handleCanPlay = () => {
            video.removeEventListener('canplay', handleCanPlay);
            tryPlay();
          };
          video.addEventListener('canplay', handleCanPlay, { once: true });
        }
      });
    }, 120);

    return () => {
      if (switchTimeoutRef.current !== null) {
        clearTimeout(switchTimeoutRef.current);
      }
    };
  }, [currentVideo, isInInvestigationRadius, hasPlayedMagnifying, isPlayerMoving]);

  const icon = useMemo(() => {
    return divIcon({
      className: 'detective-video-marker',
      html: `
        <div style="
          width: ${width}px;
          height: ${height}px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          overflow: hidden;
        ">
          <video
            class="detective-character-video"
            src="${currentVideo}"
            autoplay
            loop
            muted
            playsinline
            preload="none"
            style="
              width: 100%;
              height: 100%;
              object-fit: contain;
              object-position: center bottom;
              filter: saturate(0.7) brightness(0.9) contrast(1.05) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
              -webkit-mask-image: 
                linear-gradient(to bottom, black 0%, black 70%, rgba(0, 0, 0, 0.98) 85%, rgba(0, 0, 0, 0.85) 92%, rgba(0, 0, 0, 0.6) 96%, rgba(0, 0, 0, 0.3) 98%, transparent 100%),
                radial-gradient(ellipse ${maskWidth}px ${maskHeight}px at 50% 70%, black 55%, rgba(0, 0, 0, 0.95) 65%, rgba(0, 0, 0, 0.8) 75%, rgba(0, 0, 0, 0.5) 85%, transparent 98%);
              -webkit-mask-composite: intersect;
              mask-image: 
                linear-gradient(to bottom, black 0%, black 70%, rgba(0, 0, 0, 0.98) 85%, rgba(0, 0, 0, 0.85) 92%, rgba(0, 0, 0, 0.6) 96%, rgba(0, 0, 0, 0.3) 98%, transparent 100%),
                radial-gradient(ellipse ${maskWidth}px ${maskHeight}px at 50% 70%, black 55%, rgba(0, 0, 0, 0.95) 65%, rgba(0, 0, 0, 0.8) 75%, rgba(0, 0, 0, 0.5) 85%, transparent 98%);
              mask-composite: intersect;
            "
          />
        </div>
      `,
      iconSize: [width, height],
      iconAnchor: [width / 2, height - 10], // Anchor at bottom center (feet position)
      popupAnchor: [0, -height + 10],
    });
  }, [width, height, maskWidth, maskHeight]); // Removed currentVideo to prevent marker recreation

  return (
    <>
      {/* Outer pulsing ring */}
      <Circle
        center={[playerPosition.lat, playerPosition.lng]}
        radius={12}
        pathOptions={{
          color: 'rgba(45, 212, 191, 0.4)',
          fillColor: 'transparent',
          fillOpacity: 0,
          weight: 2,
          opacity: 0.6,
        }}
        className="player-marker-ring"
      />
      
      {/* Detective character video marker */}
      <Marker 
        position={[playerPosition.lat, playerPosition.lng]} 
        icon={icon} 
        key={`${zoom}-${width}-${height}`}
        zIndexOffset={1000}
      />
    </>
  );
}

export function PlayerMarker() {
  return <ZoomAwarePlayerMarker />;
}
