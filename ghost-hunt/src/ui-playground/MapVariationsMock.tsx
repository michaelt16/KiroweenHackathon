import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import smoothPlastic from '../assets/texture/smoothplastictexture.png';
import wrinkledPaper from '../assets/texture/wrinkledpaper.png';
import dust from '../assets/texture/dust.png';
import tape from '../assets/texture/tape.png';
import filmgrain from '../assets/texture/filmgrain.png';
import corkboardtexture from '../assets/texture/corkboardtexture.png';

// Fix Leaflet default icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  iconRetinaUrl: iconRetina,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Map Controller Component
function MapController({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

// Mock locations
const mockLocations = [
  { id: 1, name: 'Whitmore Estate', lat: 40.7128, lng: -74.0060, status: 'ACTIVE', threat: 'HIGH' },
  { id: 2, name: 'Old Mill', lat: 40.7200, lng: -74.0100, status: 'AVAILABLE', threat: 'MEDIUM' },
  { id: 3, name: 'Cemetery', lat: 40.7050, lng: -74.0050, status: 'LOCKED', threat: 'EXTREME' },
  { id: 4, name: 'Abandoned School', lat: 40.7150, lng: -74.0080, status: 'COMPLETED', threat: 'LOW' },
];

const playerPosition: [number, number] = [40.7128, -74.0060];

// Map Variations Playground
export function MapVariationsMock() {
  const [activeStyle, setActiveStyle] = useState<'paper' | 'cork' | 'field' | 'hybrid'>('paper');
  const [mapCenter] = useState<[number, number]>(playerPosition);
  const [mapZoom] = useState(15);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100vw',
      height: '100vh',
      background: '#0a0a0a',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Style Selector */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        display: 'flex',
        gap: '12px',
        background: 'rgba(0, 0, 0, 0.8)',
        padding: '12px 20px',
        borderRadius: '8px',
        border: '2px solid rgba(100, 100, 100, 0.3)',
      }}>
        {(['paper', 'cork', 'field', 'hybrid'] as const).map((style) => (
          <button
            key={style}
            onClick={() => setActiveStyle(style)}
            style={{
              padding: '8px 16px',
              background: activeStyle === style ? 'rgba(45, 212, 191, 0.2)' : 'rgba(30, 30, 30, 0.8)',
              border: `2px solid ${activeStyle === style ? 'rgba(45, 212, 191, 0.6)' : 'rgba(100, 100, 100, 0.3)'}`,
              borderRadius: '6px',
              color: '#fff',
              cursor: 'pointer',
              fontFamily: '"Courier New", monospace',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            {style}
          </button>
        ))}
      </div>

      {/* Map Container - Different structure for cork style */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}>
      {activeStyle === 'cork' ? (
        <>
          {/* Cork board background - Full screen */}
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 400,
            background: `
              url(${corkboardtexture}),
              linear-gradient(135deg, #8B6F47 0%, #6B5230 50%, #5A4228 100%)
            `,
            backgroundSize: 'cover, cover',
            backgroundBlendMode: 'multiply, normal',
          }}>
            {/* Cork texture overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${corkboardtexture})`,
              backgroundSize: 'cover',
              mixBlendMode: 'overlay',
              opacity: 0.6,
            }} />
            
            {/* Cork board vignette */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.3) 100%)',
            }} />
          </div>

          {/* Paper map container - Pinned in center */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(95vw, 1400px)',
            height: 'min(85vh, 950px)',
            zIndex: 450,
            pointerEvents: 'none',
          }}>
            {/* Paper map with pins */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              background: `
                url(${wrinkledPaper}),
                linear-gradient(135deg, #e8e4dc 0%, #d4c5b0 50%, #c4b5a0 100%)
              `,
              backgroundSize: 'cover, cover',
              backgroundBlendMode: 'multiply, normal',
              borderRadius: '4px',
              boxShadow: `
                0 8px 32px rgba(0,0,0,0.6),
                0 4px 16px rgba(0,0,0,0.4),
                inset 0 2px 4px rgba(255,255,255,0.1)
              `,
              transform: 'rotate(-1deg)',
              border: '2px solid rgba(139, 69, 19, 0.3)',
              overflow: 'hidden',
            }}>
              {/* Paper texture overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${wrinkledPaper})`,
                backgroundSize: 'cover',
                mixBlendMode: 'overlay',
                opacity: 0.3,
                pointerEvents: 'none',
              }} />

              {/* Dust overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${dust})`,
                backgroundSize: 'cover',
                mixBlendMode: 'multiply',
                opacity: 0.15,
                pointerEvents: 'none',
              }} />

              {/* Map container - Leaflet rendered here */}
              <div style={{
                position: 'absolute',
                inset: '20px',
                borderRadius: '2px',
                overflow: 'hidden',
                pointerEvents: 'auto',
                zIndex: 1,
              }}>
                <MapContainer
                  center={mapCenter}
                  zoom={mapZoom}
                  style={{ height: '100%', width: '100%' }}
                  scrollWheelZoom={true}
                  zoomControl={false}
                >
                  <MapController center={mapCenter} zoom={mapZoom} />
                  
                  {/* Base tile layer */}
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maxZoom={19}
                  />

                  {/* Player marker */}
                  <Marker position={playerPosition}>
                    <Popup>Your Location</Popup>
                  </Marker>

                  {/* Location markers */}
                  {mockLocations.map((loc) => (
                    <Marker key={loc.id} position={[loc.lat, loc.lng]}>
                      <Popup>{loc.name}</Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>

              {/* Push pins holding the map */}
              {[
                { top: '15px', left: '15px' },
                { top: '15px', right: '15px' },
                { bottom: '15px', left: '15px' },
                { bottom: '15px', right: '15px' },
              ].map((pin, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    ...pin,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                  }}
                >
                  {/* Push pin */}
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50% 50% 50% 0',
                    background: 'radial-gradient(circle at 30% 30%, #cc0000, #990000)',
                    transform: 'rotate(-45deg)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
                  }} />
                  
                  {/* Pin shadow */}
                  <div style={{
                    position: 'absolute',
                    top: '14px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '10px',
                    height: '4px',
                    background: 'rgba(0,0,0,0.4)',
                    borderRadius: '50%',
                    filter: 'blur(2px)',
                  }} />
                </div>
              ))}
            </div>
          </div>

          {/* Decorative Elements on Paper Map */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(95vw, 1400px)',
            height: 'min(85vh, 950px)',
            zIndex: 500,
            pointerEvents: 'none',
          }}>
            {/* Push pins for locations - Positioned on the paper map */}
            {mockLocations.map((loc, i) => (
              <div
                key={loc.id}
                style={{
                  position: 'absolute',
                  left: `${20 + (i * 18)}%`,
                  top: `${25 + (i * 15)}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* Push pin */}
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50% 50% 50% 0',
                  background: loc.status === 'ACTIVE' 
                    ? 'radial-gradient(circle at 30% 30%, #ff4444, #cc0000)'
                    : loc.status === 'LOCKED'
                    ? 'radial-gradient(circle at 30% 30%, #666, #333)'
                    : 'radial-gradient(circle at 30% 30%, #ffaa00, #cc8800)',
                  transform: 'rotate(-45deg)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
                  zIndex: 10,
                }} />
                
                {/* Pin shadow */}
                <div style={{
                  position: 'absolute',
                  top: '18px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '12px',
                  height: '4px',
                  background: 'rgba(0,0,0,0.4)',
                  borderRadius: '50%',
                  filter: 'blur(2px)',
                }} />
              </div>
            ))}

            {/* Polaroid photos pinned to locations - On the paper map */}
            {mockLocations.slice(0, 2).map((loc, i) => (
              <div
                key={`photo-${loc.id}`}
                style={{
                  position: 'absolute',
                  left: `${15 + (i * 20)}%`,
                  top: `${55 + (i * 12)}%`,
                  transform: `rotate(${-5 + i * 8}deg)`,
                }}
              >
                <div style={{
                  background: '#e8e4dc',
                  padding: '8px 8px 30px 8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
                  borderRadius: '2px',
                }}>
                  <div style={{
                    width: '100px',
                    height: '80px',
                    background: 'radial-gradient(ellipse at center, #1a1a2a 0%, #0a0a15 100%)',
                    borderRadius: '2px',
                    position: 'relative',
                  }}>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url(${filmgrain})`,
                      backgroundSize: '200% 200%',
                      mixBlendMode: 'overlay',
                      opacity: 0.6,
                    }} />
                  </div>
                  <div style={{
                    fontFamily: '"Caveat", cursive',
                    fontSize: '9px',
                    color: '#1a1a1a',
                    marginTop: '4px',
                    textAlign: 'center',
                  }}>
                    {loc.name}
                  </div>
                </div>
                
                {/* Pin holding photo */}
                <div style={{
                  position: 'absolute',
                  top: '-6px',
                  left: '50%',
                  transform: 'translateX(-50%) rotate(-45deg)',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50% 50% 50% 0',
                  background: 'radial-gradient(circle at 30% 30%, #ff4444, #cc0000)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
                }} />
              </div>
            ))}

            {/* Red string connecting locations - On the paper map */}
            <svg
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 5,
              }}
            >
              {mockLocations.slice(0, 3).map((loc, i) => {
                if (i === 0) return null;
                const x1 = 20 + ((i - 1) * 18);
                const x2 = 20 + (i * 18);
                const y1 = 25 + ((i - 1) * 15);
                const y2 = 25 + (i * 15);
                
                return (
                  <line
                    key={i}
                    x1={`${x1}%`}
                    y1={`${y1}%`}
                    x2={`${x2}%`}
                    y2={`${y2}%`}
                    stroke="rgba(200, 0, 0, 0.5)"
                    strokeWidth="2"
                    strokeDasharray="3 3"
                  />
                );
              })}
            </svg>

            {/* Handwritten case file cards - Around the paper map (on cork board) */}
            {mockLocations.slice(0, 2).map((loc, i) => (
              <div
                key={`card-${loc.id}`}
                style={{
                  position: 'absolute',
                  right: `${-8 - (i * 2)}%`,
                  top: `${20 + (i * 25)}%`,
                  background: '#f4f0e6',
                  padding: '10px',
                  borderRadius: '4px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
                  transform: `rotate(${3 - i * 5}deg)`,
                  border: '2px solid #8B4513',
                  width: '140px',
                }}
              >
                <div style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: '9px',
                  color: '#1a1a1a',
                  marginBottom: '4px',
                  fontWeight: 'bold',
                }}>
                  {loc.name.toUpperCase()}
                </div>
                <div style={{
                  fontFamily: '"Caveat", cursive',
                  fontSize: '11px',
                  color: '#333',
                }}>
                  Status: {loc.status}
                </div>
                <div style={{
                  fontFamily: '"Caveat", cursive',
                  fontSize: '11px',
                  color: '#666',
                }}>
                  Threat: {loc.threat}
                </div>
                
                {/* Tape on card */}
                <div style={{
                  position: 'absolute',
                  top: '-5px',
                  left: '50%',
                  transform: 'translateX(-50%) rotate(-5deg)',
                  width: '35px',
                  height: '12px',
                  backgroundImage: `url(${tape})`,
                  backgroundSize: 'cover',
                  opacity: 0.8,
                }} />
                
                {/* Pin holding card to cork */}
                <div style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '10px',
                  transform: 'rotate(-45deg)',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50% 50% 50% 0',
                  background: 'radial-gradient(circle at 30% 30%, #cc0000, #990000)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
                }} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}>
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
            zoomControl={false}
          >
            <MapController center={mapCenter} zoom={mapZoom} />
            
            {/* Base tile layer */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={19}
            />

            {/* Player marker */}
            <Marker position={playerPosition}>
              <Popup>Your Location</Popup>
            </Marker>

            {/* Location markers */}
            {mockLocations.map((loc) => (
              <Marker key={loc.id} position={[loc.lat, loc.lng]}>
                <Popup>{loc.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}
        {activeStyle === 'paper' && (
          <div style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 500,
          }}>
            {/* Paper texture base - Reduced opacity */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: `
                url(${wrinkledPaper}),
                linear-gradient(135deg, rgba(232, 228, 220, 0.3) 0%, rgba(212, 197, 176, 0.25) 50%, rgba(196, 181, 160, 0.2) 100%)
              `,
              backgroundSize: 'cover, cover',
              backgroundBlendMode: 'multiply, normal',
              opacity: 0.4,
              mixBlendMode: 'multiply',
            }} />

            {/* Paper texture overlay - Reduced */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${wrinkledPaper})`,
              backgroundSize: 'cover',
              mixBlendMode: 'overlay',
              opacity: 0.15,
            }} />

            {/* Dust overlay - Reduced */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${dust})`,
              backgroundSize: 'cover',
              mixBlendMode: 'multiply',
              opacity: 0.08,
            }} />

            {/* Film grain - Reduced */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${filmgrain})`,
              backgroundSize: '200% 200%',
              mixBlendMode: 'overlay',
              opacity: 0.12,
              animation: 'grain 8s steps(10) infinite',
            }} />

            {/* Coffee stains - Reduced opacity */}
            {[
              { top: '15%', left: '20%', size: '120px' },
              { top: '60%', right: '25%', size: '80px' },
            ].map((stain, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  ...stain,
                  width: stain.size,
                  height: stain.size,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(101, 67, 33, 0.15) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                  opacity: 0.2,
                }}
              />
            ))}

            {/* Folded corners - Reduced opacity */}
            {[
              { top: 0, left: 0, transform: 'rotate(-45deg)', origin: 'top left' },
              { bottom: 0, right: 0, transform: 'rotate(45deg)', origin: 'bottom right' },
            ].map((corner, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  ...corner,
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.05) 0%, transparent 50%)',
                  transformOrigin: corner.origin,
                  transform: corner.transform,
                }}
              />
            ))}

            {/* Hand-drawn annotations - More transparent background */}
            <div style={{
              position: 'absolute',
              top: '10%',
              left: '10%',
              width: '200px',
              height: '150px',
              border: '2px solid rgba(139, 69, 19, 0.3)',
              borderRadius: '4px',
              transform: 'rotate(-2deg)',
              background: 'rgba(232, 228, 220, 0.4)',
            }}>
              <div style={{
                fontFamily: '"Caveat", cursive',
                fontSize: '14px',
                color: '#8B4513',
                padding: '8px',
                textShadow: '0 1px 2px rgba(255,255,255,0.8)',
              }}>
                High activity zone
              </div>
            </div>

            {/* Compass rose */}
            <div style={{
              position: 'absolute',
              bottom: '15%',
              right: '10%',
              width: '100px',
              height: '100px',
              fontFamily: '"Courier New", monospace',
              fontSize: '12px',
              color: '#8B4513',
              textAlign: 'center',
              transform: 'rotate(-5deg)',
            }}>
              <div style={{ fontSize: '24px', marginBottom: '4px' }}>N</div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>W</span>
                <span>E</span>
              </div>
              <div style={{ fontSize: '24px', marginTop: '4px' }}>S</div>
            </div>

            {/* Tape patches */}
            {[
              { top: '25%', left: '15%', rotation: 12 },
              { top: '70%', right: '20%', rotation: -8 },
            ].map((patch, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  ...patch,
                  width: '60px',
                  height: '25px',
                  backgroundImage: `url(${tape})`,
                  backgroundSize: 'cover',
                  transform: `rotate(${patch.rotation}deg)`,
                  opacity: 0.7,
                }}
              />
            ))}
          </div>
        )}


        {/* ============================================ */}
        {/* WORN FIELD MAP OVERLAY */}
        {/* ============================================ */}
        {activeStyle === 'field' && (
          <div style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 500,
          }}>
            {/* Military-style map base - Reduced opacity */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: `
                linear-gradient(135deg, rgba(232, 228, 220, 0.25) 0%, rgba(212, 197, 176, 0.2) 30%, rgba(196, 181, 160, 0.15) 70%, rgba(184, 168, 144, 0.1) 100%),
                repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(139, 69, 19, 0.08) 20px),
                repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(139, 69, 19, 0.08) 20px)
              `,
              backgroundSize: 'cover, 20px 20px, 20px 20px',
              opacity: 0.4,
            }} />

            {/* Paper texture - Reduced */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${wrinkledPaper})`,
              backgroundSize: 'cover',
              mixBlendMode: 'multiply',
              opacity: 0.2,
            }} />

            {/* Weathering and wear - Reduced */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${dust})`,
              backgroundSize: 'cover',
              mixBlendMode: 'multiply',
              opacity: 0.12,
            }} />

            {/* Grid coordinates */}
            <div style={{
              position: 'absolute',
              top: '10%',
              left: '5%',
              fontFamily: '"Courier New", monospace',
              fontSize: '9px',
              color: 'rgba(139, 69, 19, 0.6)',
              letterSpacing: '1px',
            }}>
              <div>GRID: 40°42'46"N</div>
              <div>74°00'22"W</div>
            </div>

            {/* Hand-drawn markers */}
            {mockLocations.map((loc, i) => (
              <div
                key={loc.id}
                style={{
                  position: 'absolute',
                  left: `${15 + (i * 20)}%`,
                  top: `${25 + (i * 15)}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* Circle marker */}
                <div style={{
                  width: '24px',
                  height: '24px',
                  border: '2px solid rgba(139, 69, 19, 0.8)',
                  borderRadius: '50%',
                  background: loc.status === 'ACTIVE' 
                    ? 'rgba(200, 0, 0, 0.2)'
                    : 'rgba(139, 69, 19, 0.1)',
                }} />
                
                {/* Handwritten label */}
                <div style={{
                  position: 'absolute',
                  top: '30px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontFamily: '"Caveat", cursive',
                  fontSize: '11px',
                  color: '#8B4513',
                  whiteSpace: 'nowrap',
                  textShadow: '0 1px 2px rgba(255,255,255,0.8)',
                  transform: `translateX(-50%) rotate(${Math.random() * 4 - 2}deg)`,
                }}>
                  {loc.name}
                </div>
              </div>
            ))}

            {/* Compass rose (hand-drawn style) */}
            <div style={{
              position: 'absolute',
              bottom: '12%',
              right: '8%',
              width: '120px',
              height: '120px',
              border: '2px solid rgba(139, 69, 19, 0.6)',
              borderRadius: '50%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: '"Courier New", monospace',
              fontSize: '14px',
              color: '#8B4513',
              transform: 'rotate(-3deg)',
            }}>
              <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>N</div>
              <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', fontSize: '16px' }}>
                <span>W</span>
                <span>E</span>
              </div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '4px' }}>S</div>
            </div>

            {/* Dirt and wear marks - Reduced opacity */}
            {[
              { top: '20%', left: '30%', size: '60px' },
              { top: '65%', right: '25%', size: '40px' },
              { bottom: '20%', left: '40%', size: '50px' },
            ].map((mark, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  ...mark,
                  width: mark.size,
                  height: mark.size,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(101, 67, 33, 0.1) 0%, transparent 70%)',
                  filter: 'blur(15px)',
                  opacity: 0.25,
                }}
              />
            ))}

            {/* Tape patches */}
            {[
              { top: '15%', left: '12%', rotation: 15 },
              { top: '75%', right: '15%', rotation: -10 },
            ].map((patch, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  ...patch,
                  width: '50px',
                  height: '20px',
                  backgroundImage: `url(${tape})`,
                  backgroundSize: 'cover',
                  transform: `rotate(${patch.rotation}deg)`,
                  opacity: 0.6,
                }}
              />
            ))}
          </div>
        )}

        {/* ============================================ */}
        {/* HYBRID APPROACH (Leaflet + Analog Overlays) */}
        {/* ============================================ */}
        {activeStyle === 'hybrid' && (
          <div style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 500,
          }}>
            {/* Subtle paper texture overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${wrinkledPaper})`,
              backgroundSize: 'cover',
              mixBlendMode: 'multiply',
              opacity: 0.15,
            }} />

            {/* Film grain */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${filmgrain})`,
              backgroundSize: '200% 200%',
              mixBlendMode: 'overlay',
              opacity: 0.2,
              animation: 'grain 8s steps(10) infinite',
            }} />

            {/* Hand-drawn style markers overlay */}
            {mockLocations.map((loc, i) => (
              <div
                key={loc.id}
                style={{
                  position: 'absolute',
                  left: `${15 + (i * 20)}%`,
                  top: `${25 + (i * 15)}%`,
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'auto',
                  cursor: 'pointer',
                }}
              >
                {/* Hand-drawn circle */}
                <div style={{
                  width: '30px',
                  height: '30px',
                  border: '3px solid rgba(200, 0, 0, 0.8)',
                  borderRadius: '50%',
                  background: loc.status === 'ACTIVE' 
                    ? 'rgba(200, 0, 0, 0.2)'
                    : 'rgba(200, 0, 0, 0.1)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                  transform: `rotate(${Math.random() * 2 - 1}deg)`,
                }} />
                
                {/* Handwritten label */}
                <div style={{
                  position: 'absolute',
                  top: '35px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontFamily: '"Caveat", cursive',
                  fontSize: '12px',
                  color: '#fff',
                  background: 'rgba(0, 0, 0, 0.7)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  whiteSpace: 'nowrap',
                  textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                  transform: `translateX(-50%) rotate(${Math.random() * 3 - 1.5}deg)`,
                }}>
                  {loc.name}
                </div>
              </div>
            ))}

            {/* Folded corner effect */}
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '120px',
              height: '120px',
              background: 'linear-gradient(225deg, rgba(0,0,0,0.1) 0%, transparent 50%)',
              clipPath: 'polygon(100% 0, 100% 50%, 50% 100%, 0 100%)',
            }} />

            {/* Hand-drawn annotations */}
            <div style={{
              position: 'absolute',
              bottom: '15%',
              left: '10%',
              fontFamily: '"Caveat", cursive',
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.8)',
              background: 'rgba(0, 0, 0, 0.6)',
              padding: '8px 12px',
              borderRadius: '4px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transform: 'rotate(-1deg)',
            }}>
              High activity detected
            </div>
          </div>
        )}
        
        <style>{`
          @keyframes grain {
            0%, 100% { background-position: 0% 0%; }
            25% { background-position: 25% 25%; }
            50% { background-position: 50% 50%; }
            75% { background-position: 75% 75%; }
          }
        `}</style>
      </div>
    </div>
  );
}

