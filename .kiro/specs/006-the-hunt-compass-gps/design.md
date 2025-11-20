# 006 – The Hunt: Compass & GPS Integration – Design

## Overview

This spec transforms investigations from screen-based to physical-space hunting by implementing:
1. **Compass-based Radar** - Spin your body to find direction
2. **EMF Beeping System** - Walk to close distance
3. **GPS-based Ghost Positioning** - Ghost exists in real space

**Core Philosophy**: Information asymmetry creates skill expression. Radar knows direction, EMF knows distance, player must combine both.

---

## Architecture

### High-Level Flow

```
Investigation Start
    ↓
Request Permissions (Location + Orientation)
    ↓
Spawn Ghost at Random GPS Position
    ↓
Start Sensor Loops:
    - GPS updates (1Hz)
    - Compass updates (10Hz)
    ↓
Calculate in Real-Time:
    - Distance (player GPS → ghost GPS)
    - Bearing (player GPS → ghost GPS)
    ↓
Update Tools:
    - Radar: Show blip if bearing in forward cone
    - EMF: Beep based on distance
    ↓
Player Actions:
    - Rotate body → Radar updates
    - Walk forward → EMF beeps faster
    - Switch tools → Gather evidence
    ↓
Deduction & Complete
```

---

## 1. Compass System

### Device Orientation API

```typescript
interface CompassData {
  heading: number;        // 0-360° (0 = North)
  accuracy: number;       // Degrees of uncertainty
  timestamp: number;      // When reading was taken
}

// Request permission (iOS 13+)
if (typeof DeviceOrientationEvent.requestPermission === 'function') {
  const permission = await DeviceOrientationEvent.requestPermission();
  if (permission === 'granted') {
    startCompass();
  }
}

// Listen to orientation
window.addEventListener('deviceorientationabsolute', (event) => {
  const heading = event.alpha; // 0-360°
  const accuracy = event.webkitCompassAccuracy || 20;
  
  updateCompass({ heading, accuracy, timestamp: Date.now() });
});
```

### Compass Smoothing

```typescript
// Smooth compass readings to prevent jitter
class CompassSmoother {
  private readings: number[] = [];
  private maxReadings = 5;
  
  addReading(heading: number): number {
    this.readings.push(heading);
    if (this.readings.length > this.maxReadings) {
      this.readings.shift();
    }
    
    // Circular mean for angles
    const sinSum = this.readings.reduce((sum, h) => sum + Math.sin(h * Math.PI / 180), 0);
    const cosSum = this.readings.reduce((sum, h) => sum + Math.cos(h * Math.PI / 180), 0);
    
    const meanAngle = Math.atan2(sinSum, cosSum) * 180 / Math.PI;
    return (meanAngle + 360) % 360;
  }
}
```

### Calibration Flow

```typescript
interface CalibrationState {
  isCalibrating: boolean;
  accuracyBefore: number;
  accuracyAfter: number;
  startTime: number;
}

// Trigger calibration when accuracy < 20°
if (compassAccuracy > 20) {
  showCalibrationPrompt();
}

// Calibration UI
<CalibrationOverlay>
  <h2>Calibrate Compass</h2>
  <p>Move your phone in a figure-8 pattern</p>
  <AccuracyMeter value={compassAccuracy} />
  <Button onClick={dismissCalibration}>Continue Anyway</Button>
</CalibrationOverlay>
```

---

## 2. GPS System

### Geolocation API

```typescript
interface GPSPosition {
  lat: number;
  lng: number;
  accuracy: number;      // Meters
  timestamp: number;
}

// Request permission
const permission = await navigator.permissions.query({ name: 'geolocation' });

// Watch position
const watchId = navigator.geolocation.watchPosition(
  (position) => {
    const gpsData: GPSPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      accuracy: position.coords.accuracy,
      timestamp: position.timestamp,
    };
    
    updatePlayerPosition(gpsData);
  },
  (error) => handleGPSError(error),
  {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 1000,
  }
);
```

### GPS Smoothing

```typescript
// Smooth GPS to prevent jitter
class GPSSmoother {
  private positions: GPSPosition[] = [];
  private maxPositions = 3;
  
  addPosition(pos: GPSPosition): GPSPosition {
    this.positions.push(pos);
    if (this.positions.length > this.maxPositions) {
      this.positions.shift();
    }
    
    // Weighted average (newer positions weighted more)
    const weights = [0.2, 0.3, 0.5]; // Last position weighted most
    let latSum = 0, lngSum = 0, weightSum = 0;
    
    this.positions.forEach((p, i) => {
      const weight = weights[i] || 0.33;
      latSum += p.lat * weight;
      lngSum += p.lng * weight;
      weightSum += weight;
    });
    
    return {
      lat: latSum / weightSum,
      lng: lngSum / weightSum,
      accuracy: Math.max(...this.positions.map(p => p.accuracy)),
      timestamp: Date.now(),
    };
  }
}
```

### Ghost Spawning

```typescript
interface GhostSpawnConfig {
  hotspotPosition: GPSPosition;
  spawnRadius: number;  // Meters (default: 50)
}

function spawnGhost(config: GhostSpawnConfig): GPSPosition {
  const { hotspotPosition, spawnRadius } = config;
  
  // Random angle
  const angle = Math.random() * 2 * Math.PI;
  
  // Random distance within radius
  const distance = Math.random() * spawnRadius;
  
  // Convert to lat/lng offset
  // 1 degree lat ≈ 111km, 1 degree lng ≈ 111km * cos(lat)
  const latOffset = (distance * Math.cos(angle)) / 111000;
  const lngOffset = (distance * Math.sin(angle)) / (111000 * Math.cos(hotspotPosition.lat * Math.PI / 180));
  
  return {
    lat: hotspotPosition.lat + latOffset,
    lng: hotspotPosition.lng + lngOffset,
    accuracy: 0,
    timestamp: Date.now(),
  };
}
```

---

## 3. Distance & Bearing Calculations

### Haversine Distance

```typescript
function haversineDistance(pos1: GPSPosition, pos2: GPSPosition): number {
  const R = 6371000; // Earth radius in meters
  
  const lat1 = pos1.lat * Math.PI / 180;
  const lat2 = pos2.lat * Math.PI / 180;
  const deltaLat = (pos2.lat - pos1.lat) * Math.PI / 180;
  const deltaLng = (pos2.lng - pos1.lng) * Math.PI / 180;
  
  const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return R * c; // Distance in meters
}
```

### Bearing Calculation

```typescript
function calculateBearing(from: GPSPosition, to: GPSPosition): number {
  const lat1 = from.lat * Math.PI / 180;
  const lat2 = to.lat * Math.PI / 180;
  const deltaLng = (to.lng - from.lng) * Math.PI / 180;
  
  const y = Math.sin(deltaLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) -
            Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLng);
  
  const bearing = Math.atan2(y, x) * 180 / Math.PI;
  
  return (bearing + 360) % 360; // Normalize to 0-360°
}
```

### Normalized Distance

```typescript
// Convert meters to normalized 0-1 for tool compatibility
function normalizeDistance(meters: number, maxDistance: number = 50): number {
  return Math.min(1, meters / maxDistance);
}
```

---

## 4. Radar Component Redesign

### Radar Props

```typescript
interface RadarProps {
  ghostBearing: number;      // 0-360° from player to ghost
  playerHeading: number;     // 0-360° player is facing
  compassAccuracy: number;   // Degrees of uncertainty
}

// NO distance prop!
```

### Radar Logic

```typescript
function Radar({ ghostBearing, playerHeading, compassAccuracy }: RadarProps) {
  // Calculate relative angle (where ghost appears on radar)
  const relativeAngle = (ghostBearing - playerHeading + 360) % 360;
  
  // Forward cone is ±45° (90° total)
  const forwardConeAngle = 45;
  const isInForwardCone = 
    relativeAngle <= forwardConeAngle || 
    relativeAngle >= (360 - forwardConeAngle);
  
  // Is ghost directly ahead? (±5°)
  const isDirectlyAhead = 
    relativeAngle <= 5 || 
    relativeAngle >= 355;
  
  return (
    <RadarDisplay>
      {/* Rotating radar sweep */}
      <RadarSweep rotation={playerHeading} />
      
      {/* North indicator (always points north) */}
      <NorthIndicator rotation={-playerHeading} />
      
      {/* Forward cone visualization */}
      <ForwardCone angle={forwardConeAngle} />
      
      {/* Ghost blip (only if in cone) */}
      {isInForwardCone && (
        <GhostBlip 
          angle={relativeAngle} 
          pulsing={isDirectlyAhead}
        />
      )}
      
      {/* Heading display */}
      <HeadingDisplay>
        Facing: {playerHeading.toFixed(0)}°
      </HeadingDisplay>
      
      {/* Target bearing (when visible) */}
      {isInForwardCone && (
        <TargetDisplay>
          Target: {ghostBearing.toFixed(0)}°
        </TargetDisplay>
      )}
      
      {/* Calibration warning */}
      {compassAccuracy > 20 && (
        <CalibrationWarning />
      )}
    </RadarDisplay>
  );
}
```

---

## 5. EMF Component Redesign

### EMF Props

```typescript
interface EMFProps {
  ghostDistance: number;  // Meters
  ghostType: GhostType;   // For type-specific multiplier
}

// NO bearing prop!
```

### EMF Beeping Logic

```typescript
function EMF({ ghostDistance, ghostType }: EMFProps) {
  const [beepCount, setBeepCount] = useState(0);
  
  // Apply ghost type multiplier
  const emfMultipliers = {
    Wraith: 2.5,
    Shade: 0.3,
    Poltergeist: 0.8,
  };
  const multiplier = emfMultipliers[ghostType];
  const adjustedDistance = ghostDistance / multiplier;
  
  // Calculate beep interval (inverse of distance)
  const getBeepInterval = (distance: number): number => {
    if (distance < 5) return 300;   // Very close: 3.3 beeps/sec
    if (distance < 10) return 600;  // Close: 1.7 beeps/sec
    if (distance < 20) return 1000; // Medium: 1 beep/sec
    if (distance < 30) return 1500; // Far: 0.67 beeps/sec
    return 2000;                    // Very far: 0.5 beeps/sec
  };
  
  const beepInterval = getBeepInterval(adjustedDistance);
  
  // Beep loop
  useEffect(() => {
    const interval = setInterval(() => {
      playBeepSound();
      setBeepCount(c => c + 1);
      
      // Visual pulse
      triggerVisualPulse();
      
      // Optional: vibrate
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }, beepInterval);
    
    return () => clearInterval(interval);
  }, [beepInterval]);
  
  // Proximity level
  const getProximityLevel = (distance: number): string => {
    if (distance < 5) return 'Very Close';
    if (distance < 10) return 'Close';
    if (distance < 20) return 'Medium';
    if (distance < 30) return 'Far';
    return 'Very Far';
  };
  
  const proximityLevel = getProximityLevel(adjustedDistance);
  const proximityBars = Math.max(1, Math.min(5, Math.floor((50 - adjustedDistance) / 10)));
  
  return (
    <EMFDisplay>
      {/* Proximity bars */}
      <ProximityBars count={proximityBars} max={5} />
      
      {/* Proximity text */}
      <ProximityText level={proximityLevel}>
        {proximityLevel}
      </ProximityText>
      
      {/* Beep frequency */}
      <BeepFrequency>
        {(60000 / beepInterval).toFixed(0)} BPM
      </BeepFrequency>
      
      {/* Visual pulse indicator */}
      <PulseIndicator beepCount={beepCount} />
      
      {/* NO directional indicators */}
      {/* NO distance in meters */}
    </EMFDisplay>
  );
}
```

### Audio System

```typescript
// Create beep sound
const audioContext = new AudioContext();

function playBeepSound() {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = 800; // Hz
  oscillator.type = 'sine';
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.1);
}
```

---

## 6. Investigation Context Updates

### New State

```typescript
interface InvestigationContextType {
  // ... existing state
  
  // New GPS/Compass state
  playerPosition: GPSPosition | null;
  playerHeading: number | null;
  ghostPosition: GPSPosition | null;
  compassAccuracy: number;
  gpsAccuracy: number;
  
  // Calculated values
  ghostDistance: number;  // Meters
  ghostBearing: number;   // 0-360°
  
  // Permissions
  hasLocationPermission: boolean;
  hasOrientationPermission: boolean;
  
  // Methods
  requestPermissions: () => Promise<void>;
  startSensors: () => void;
  stopSensors: () => void;
  updatePlayerPosition: (pos: GPSPosition) => void;
  updatePlayerHeading: (heading: number) => void;
}
```

### Sensor Management Hook

```typescript
function useSensors() {
  const [playerPosition, setPlayerPosition] = useState<GPSPosition | null>(null);
  const [playerHeading, setPlayerHeading] = useState<number | null>(null);
  const [compassAccuracy, setCompassAccuracy] = useState(20);
  
  const gpsSmoother = useRef(new GPSSmoother());
  const compassSmoother = useRef(new CompassSmoother());
  
  // Request permissions
  const requestPermissions = async () => {
    // Location
    const locationPerm = await navigator.permissions.query({ name: 'geolocation' });
    
    // Orientation (iOS)
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      await DeviceOrientationEvent.requestPermission();
    }
  };
  
  // Start GPS
  const startGPS = () => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const raw: GPSPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        };
        
        const smoothed = gpsSmoother.current.addPosition(raw);
        setPlayerPosition(smoothed);
      },
      (error) => console.error('GPS error:', error),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 1000 }
    );
    
    return () => navigator.geolocation.clearWatch(watchId);
  };
  
  // Start compass
  const startCompass = () => {
    const handler = (event: DeviceOrientationEvent) => {
      const rawHeading = event.alpha || 0;
      const smoothedHeading = compassSmoother.current.addReading(rawHeading);
      
      setPlayerHeading(smoothedHeading);
      setCompassAccuracy(event.webkitCompassAccuracy || 20);
    };
    
    window.addEventListener('deviceorientationabsolute', handler);
    
    return () => window.removeEventListener('deviceorientationabsolute', handler);
  };
  
  return {
    playerPosition,
    playerHeading,
    compassAccuracy,
    requestPermissions,
    startGPS,
    startCompass,
  };
}
```

---

## 7. Fallback Systems

### Manual Rotation (No Compass)

```typescript
function ManualRotationControls({ onRotate }: { onRotate: (delta: number) => void }) {
  return (
    <div style={{ position: 'fixed', bottom: 100, left: 0, right: 0 }}>
      <button onClick={() => onRotate(-15)}>← Rotate Left</button>
      <button onClick={() => onRotate(15)}>Rotate Right →</button>
    </div>
  );
}
```

### Relative Positioning (No GPS)

```typescript
// If GPS unavailable, use relative positioning from hotspot
function useRelativePositioning(hotspot: Hotspot) {
  const [relativePosition, setRelativePosition] = useState({ x: 0, y: 0 });
  
  // Simulate movement with device motion
  useEffect(() => {
    const handler = (event: DeviceMotionEvent) => {
      const accel = event.accelerationIncludingGravity;
      if (accel) {
        // Integrate acceleration to estimate movement
        // (Very rough, but better than nothing)
        setRelativePosition(prev => ({
          x: prev.x + (accel.x || 0) * 0.01,
          y: prev.y + (accel.y || 0) * 0.01,
        }));
      }
    };
    
    window.addEventListener('devicemotion', handler);
    return () => window.removeEventListener('devicemotion', handler);
  }, []);
  
  return relativePosition;
}
```

---

## 8. Performance Optimizations

### Update Frequencies

```typescript
// GPS: 1Hz (once per second)
const GPS_UPDATE_INTERVAL = 1000;

// Compass: 10Hz (10 times per second)
const COMPASS_UPDATE_INTERVAL = 100;

// Calculations: 5Hz (5 times per second)
const CALCULATION_UPDATE_INTERVAL = 200;

// Throttle expensive calculations
const throttledCalculations = useCallback(
  throttle(() => {
    const distance = haversineDistance(playerPos, ghostPos);
    const bearing = calculateBearing(playerPos, ghostPos);
    updateCalculations({ distance, bearing });
  }, CALCULATION_UPDATE_INTERVAL),
  [playerPos, ghostPos]
);
```

### Battery Optimization

```typescript
// Stop sensors when app backgrounded
useEffect(() => {
  const handleVisibilityChange = () => {
    if (document.hidden) {
      stopSensors();
    } else {
      startSensors();
    }
  };
  
  document.addEventListener('visibilitychange', handleVisibilityChange);
  return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
}, []);
```

---

## 9. Testing Strategy

### Unit Tests
- Haversine distance calculation
- Bearing calculation
- Compass smoothing algorithm
- GPS smoothing algorithm
- Angle normalization (0-360°)

### Integration Tests
- Sensor permission flow
- GPS position updates
- Compass heading updates
- Distance/bearing recalculation
- Tool switching with sensor data

### Manual Testing
- Walk in straight line → distance decreases
- Walk in circle → bearing changes, distance constant
- Rotate body → radar updates
- Indoor testing (no GPS)
- Low accuracy scenarios

---

## 10. Error Handling

### Permission Denied

```typescript
if (!hasLocationPermission) {
  return (
    <PermissionPrompt>
      <h2>Location Required</h2>
      <p>Ghost Hunt needs your location to place the ghost in real space.</p>
      <button onClick={requestPermissions}>Grant Permission</button>
    </PermissionPrompt>
  );
}
```

### Poor GPS Accuracy

```typescript
if (gpsAccuracy > 20) {
  return (
    <AccuracyWarning>
      ⚠️ GPS accuracy is low ({gpsAccuracy.toFixed(0)}m)
      <br />
      Try moving to an open area
    </AccuracyWarning>
  );
}
```

### Compass Unavailable

```typescript
if (!hasCompass) {
  return (
    <FallbackMode>
      <p>Compass unavailable - using manual rotation</p>
      <ManualRotationControls onRotate={handleManualRotation} />
    </FallbackMode>
  );
}
```

---

## Success Metrics

006 is successful when:

1. ✅ Compass rotates radar smoothly (30fps+)
2. ✅ GPS updates position within 2 seconds of movement
3. ✅ Distance calculation accurate to ±5 meters
4. ✅ Bearing calculation accurate to ±10 degrees
5. ✅ EMF beeps sync with distance changes
6. ✅ Radar only shows direction, EMF only shows distance
7. ✅ Battery drain < 10% per 30min investigation
8. ✅ Works on iOS 13+ and Android 8+
9. ✅ Fallbacks work when sensors unavailable
10. ✅ Players physically rotate and walk during investigations

---

**Next**: Task list will break this down into implementable chunks.
