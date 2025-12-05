import { useState, useRef, useEffect, ReactNode } from 'react';
import { NavigationArrows } from './NavigationArrows';

interface CarouselWrapperProps {
  children: ReactNode[];
  initialIndex?: number;
  onViewChange?: (index: number) => void;
  hideNavigation?: boolean;
}

export function CarouselWrapper({ 
  children, 
  initialIndex = 1, 
  onViewChange,
  hideNavigation = false
}: CarouselWrapperProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchMoveRef = useRef<{ x: number; y: number } | null>(null);
  const prevIndexRef = useRef(initialIndex);
  
  // Update prevIndexRef when currentIndex changes
  useEffect(() => {
    prevIndexRef.current = currentIndex;
  }, [currentIndex]);

  // Calculate translateX based on current index
  const translateX = -currentIndex * 100;

  // Handle view change with auto-skip for plant art (index 1)
  const handleViewChange = (newIndex: number) => {
    if (isAnimating || newIndex < 0 || newIndex >= children.length) {
      return;
    }

    setIsAnimating(true);
    
    // If transitioning from Map (2) to Cork (0) or vice versa, pass through Plant Art (1)
    if ((prevIndexRef.current === 2 && newIndex === 0) || (prevIndexRef.current === 0 && newIndex === 2)) {
      // First, quickly transition to plant art
      setCurrentIndex(1);
      if (onViewChange) {
        onViewChange(1);
      }
      
      // Faster transition
      setTimeout(() => {
        setCurrentIndex(newIndex);
        if (onViewChange) {
          onViewChange(newIndex);
        }
        
        prevIndexRef.current = newIndex;
        
        setTimeout(() => {
          setIsAnimating(false);
        }, 300); // Faster transition time
      }, 200); // Shorter pause
    } else if (newIndex === 1) {
      // If directly clicking on plant art, skip through it
      const targetIndex = prevIndexRef.current === 2 ? 0 : 2;
      
      setCurrentIndex(1);
      if (onViewChange) {
        onViewChange(1);
      }
      
      setTimeout(() => {
        setCurrentIndex(targetIndex);
        if (onViewChange) {
          onViewChange(targetIndex);
        }
        
        prevIndexRef.current = targetIndex;
        
        setTimeout(() => {
          setIsAnimating(false);
        }, 300);
      }, 200);
    } else {
      // Normal transition
      setCurrentIndex(newIndex);
      prevIndexRef.current = newIndex;
      
      if (onViewChange) {
        onViewChange(newIndex);
      }

      // Reset animation flag after transition completes
      setTimeout(() => {
        setIsAnimating(false);
      }, 600);
    }
  };

  // Touch event handlers for swipe detection - DISABLED
  // Swipe gestures removed per user request - navigation only via arrow buttons
  const handleTouchStart = () => {
    // Disabled - no swipe navigation
  };

  const handleTouchMove = () => {
    // Disabled - no swipe navigation
  };

  const handleTouchEnd = () => {
    // Disabled - no swipe navigation
  };

  // Handle arrow navigation
  const handleArrowNavigate = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      handleViewChange(currentIndex - 1);
    } else {
      handleViewChange(currentIndex + 1);
    }
  };

  // Full 3D rotation effect - like turning your head left/right
  // Views overlap during transition to prevent gaps
  const getViewTransform = (viewIndex: number) => {
    const offset = viewIndex - currentIndex;
    
    // Add blur if plant art is the current view (passing through quickly)
    const isPlantArt = viewIndex === 1;
    const isCurrentlyAtPlantArt = currentIndex === 1;
    
    if (offset < 0) {
      // Views to the left - no 3D transition, flat
      // Special case: if cork (0) to transition (1) or vice versa, completely flat - same board
      const isCorkToTransition = (currentIndex === 1 && viewIndex === 0) || (currentIndex === 0 && viewIndex === 1);
      
      // Much larger overlap to prevent gaps/tearing
      const translateX3D = Math.abs(offset) * -20; // Much larger negative offset to create more overlap
      
      // Add blur during transition
      const isTransitioning = currentIndex === 1 || prevIndexRef.current === 1;
      const blur = isTransitioning ? 'blur(3px)' : 'blur(0px)';
      
      // Flat 2D only - no 3D at all
      return {
        transform: `translateX(${translateX3D}px)`, // 2D only
        opacity: 1, // Full opacity to prevent gaps
        filter: blur,
        zIndex: 1000 + offset,
      };
    } else if (offset > 0) {
      // Views to the right - but when coming FROM left (cork), they should rotate from left side
      // Check if we're transitioning from cork (0) - if so, flip the rotation
      const isComingFromLeft = currentIndex === 0;
      
      // Add blur during transition
      const isTransitioning = currentIndex === 1 || prevIndexRef.current === 1;
      const blur = isTransitioning ? 'blur(3px)' : 'blur(0px)';
      
      // Flat 2D only - no 3D at all
      const translateX3D = offset * -15; // Horizontal movement only
      
      return {
        transform: `translateX(${translateX3D}px)`, // 2D only
        opacity: Math.max(0.85, 1 + (offset * 0.08)),
        filter: blur,
        zIndex: 1000 + offset,
      };
    } else {
      // Current view - front and center, full size
      // Special case: if transitioning from cork (0) to transition (1), no 3D at all
      const isCorkToTransition = currentIndex === 1 && prevIndexRef.current === 0;
      const isTransitionToCork = currentIndex === 0 && prevIndexRef.current === 1;
      
      // Add blur during transition
      const isTransitioning = currentIndex === 1 || prevIndexRef.current === 1;
      const blur = isTransitioning ? 'blur(3px)' : 'blur(0px)';
      
      // Flat 2D only - no 3D at all
      return {
        transform: 'translateX(0)',
        opacity: 1,
        filter: blur,
        zIndex: 1000,
      };
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        // No perspective - flat 2D transitions only
        backgroundColor: '#1a0f0a', // Dark background to prevent black spots
      }}
      // Swipe gestures disabled - navigation only via arrow buttons
      // onTouchStart={handleTouchStart}
      // onTouchMove={handleTouchMove}
      // onTouchEnd={handleTouchEnd}
    >
      <div
        style={{
          display: 'flex',
          width: `${children.length * 100}vw`,
          height: '100vh',
          transform: `translateX(${translateX}vw)`,
          transition: currentIndex === 1 
            ? 'transform 300ms ease-in-out' // Faster transition
            : 'transform 400ms cubic-bezier(0.2, 0.4, 0.3, 0.95)', // Faster transition
          pointerEvents: isAnimating ? 'none' : 'auto',
          // No 3D transforms
          position: 'relative', // For z-index stacking
          overflow: 'visible', // Allow overlap between views
        }}
      >
        {children.map((child, index) => {
          const viewTransform = getViewTransform(index);
          return (
            <div
              key={index}
              style={{
                width: '100vw',
                height: '100vh',
                flexShrink: 0,
                overflow: 'hidden', // Prevent overflow to adjacent views
                backgroundColor: '#1a0f0a', // Match container background to prevent gaps
                ...viewTransform,
                transition: currentIndex === 1 && (index === 0 || index === 2)
                  ? 'transform 300ms ease-in-out, opacity 300ms ease-in-out, filter 300ms ease-in-out' // Faster transition
                  : 'transform 400ms cubic-bezier(0.2, 0.4, 0.3, 0.95), opacity 400ms ease-in-out, filter 400ms ease-in-out', // Faster transition
                willChange: 'transform',
              }}
            >
              {child}
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows - hide when modal is open */}
      {!hideNavigation && (
        <NavigationArrows
          currentIndex={currentIndex}
          totalViews={children.length}
          onNavigate={handleArrowNavigate}
          isAnimating={isAnimating}
        />
      )}
    </div>
  );
}
