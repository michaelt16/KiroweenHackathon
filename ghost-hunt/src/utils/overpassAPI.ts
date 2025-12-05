// Overpass API utility - Fetch real-world landmarks and POIs from OpenStreetMap
// Similar to Pokemon Go's Pokestops/Gyms at real locations

export interface POI {
  id: string;
  name: string;
  type: 'park' | 'landmark' | 'building' | 'monument' | 'other';
  lat: number;
  lng: number;
  tags: Record<string, string>;
}

const OVERPASS_API_URL = 'https://overpass-api.de/api/interpreter';

/**
 * Fetch nearby POIs (parks, landmarks, etc.) using Overpass API
 * @param centerLat - Center latitude
 * @param centerLng - Center longitude
 * @param radiusMeters - Search radius in meters (default: 500m)
 * @returns Array of POIs
 */
export async function fetchNearbyPOIs(
  centerLat: number,
  centerLng: number,
  radiusMeters: number = 2500 // Default to 2.5km for Pokemon Go-style preloading
): Promise<POI[]> {
  try {
    // Calculate bounding box from center and radius
    // Approximate: 1 degree latitude ≈ 111km, 1 degree longitude ≈ 111km * cos(latitude)
    const latDelta = radiusMeters / 111000;
    const lngDelta = radiusMeters / (111000 * Math.cos(centerLat * Math.PI / 180));
    const bbox = `${centerLat - latDelta},${centerLng - lngDelta},${centerLat + latDelta},${centerLng + lngDelta}`;
    
    // Overpass QL query - using bounding box for ways (areas) and around for nodes (points)
    // Ways don't work with around: so we use bbox for them
    // Expanded to include more neighborhood-level landmarks
    const query = `
[out:json][timeout:25];
(
  // Nodes (points) - use around:
  node(around:${radiusMeters}, ${centerLat}, ${centerLng})["leisure"="park"];
  node(around:${radiusMeters}, ${centerLat}, ${centerLng})["tourism"~"attraction|monument|viewpoint"];
  node(around:${radiusMeters}, ${centerLat}, ${centerLng})["historic"~"monument|memorial|building"];
  node(around:${radiusMeters}, ${centerLat}, ${centerLng})["building"~"church|cathedral|chapel|school|community"];
  node(around:${radiusMeters}, ${centerLat}, ${centerLng})["leisure"~"playground|sports_centre|pitch"];
  node(around:${radiusMeters}, ${centerLat}, ${centerLng})["natural"~"water|lake|pond"];
  node(around:${radiusMeters}, ${centerLat}, ${centerLng})["waterway"~"river|stream|canal"];
  node(around:${radiusMeters}, ${centerLat}, ${centerLng})["amenity"~"fountain|library|community_centre|arts_centre"];
  node(around:${radiusMeters}, ${centerLat}, ${centerLng})["barrier"~"gate|entrance"];
  node(around:${radiusMeters}, ${centerLat}, ${centerLng})["man_made"~"arch|tower|bridge"];
  node(around:${radiusMeters}, ${centerLat}, ${centerLng})["highway"~"bridge"];
  
  // Ways (areas) - use bounding box
  way(${bbox})["leisure"="park"];
  way(${bbox})["tourism"~"attraction|monument|viewpoint"];
  way(${bbox})["historic"~"monument|memorial|building"];
  way(${bbox})["building"~"church|cathedral|chapel|school|community"];
  way(${bbox})["leisure"~"playground|sports_centre|pitch"];
  way(${bbox})["natural"~"water|lake|pond"];
  way(${bbox})["waterway"~"river|stream|canal"];
  way(${bbox})["amenity"~"library|community_centre|arts_centre"];
  way(${bbox})["barrier"~"gate|entrance"];
  way(${bbox})["man_made"~"arch|tower|bridge"];
  way(${bbox})["highway"~"path|footway|cycleway|bridge"];
  
  // Additional neighborhood landmarks
  // Benches, memorials, sculptures (often in parks/neighborhoods)
  node(around:${radiusMeters}, ${centerLat}, ${centerLng})["amenity"="bench"];
  node(around:${radiusMeters}, ${centerLat}, ${centerLng})["historic"="memorial"];
  node(around:${radiusMeters}, ${centerLat}, ${centerLng})["tourism"="artwork"];
  way(${bbox})["historic"="memorial"];
  way(${bbox})["tourism"="artwork"];
  
  // Sports fields, tennis courts, basketball courts
  node(around:${radiusMeters}, ${centerLat}, ${centerLng})["leisure"~"pitch|sports_centre|stadium|swimming_pool"];
  way(${bbox})["leisure"~"pitch|sports_centre|stadium|swimming_pool"];
  
  // Schools, community centers, recreation centers
  node(around:${radiusMeters}, ${centerLat}, ${centerLng})["amenity"~"school|kindergarten|community_centre|social_facility"];
  way(${bbox})["amenity"~"school|kindergarten|community_centre|social_facility"];
  
  // Named intersections, roundabouts, plazas
  node(around:${radiusMeters}, ${centerLat}, ${centerLng})["place"~"square|locality"];
  way(${bbox})["place"~"square|locality"];
  
  // Named streets/roads (often have signs)
  way(${bbox})["highway"~"residential|tertiary"]["name"];
);
out center;
`;

    const response = await fetch(OVERPASS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: query,
    });

    if (!response.ok) {
      throw new Error(`Overpass API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('📡 Overpass API response:', { 
      elementCount: data.elements?.length || 0,
      elements: data.elements?.slice(0, 3).map((el: any) => ({
        type: el.type,
        tags: el.tags,
        hasName: !!el.tags?.name,
        name: el.tags?.name
      })) // Log first 3 for debugging
    });
    
    const pois: POI[] = [];
    let skippedNoName = 0;
    let processedCount = 0;

    // Process nodes
    if (data.elements) {
      console.log(`📦 Processing ${data.elements.length} elements from Overpass API`);
      
      for (const element of data.elements) {
        if (element.type === 'node' && element.lat && element.lon) {
          processedCount++;
          // Try multiple name sources, generate fallback name if needed
          let name = element.tags?.name || 
                     element.tags?.['name:en'] ||
                     element.tags?.ref || 
                     element.tags?.['addr:housename'] ||
                     element.tags?.operator ||
                     element.tags?.brand ||
                     null;
          
          // Generate fallback name based on type if no name found - with spooky prefixes
          if (!name) {
            const spookyAdjectives = ['Cursed', 'Abandoned', 'Forgotten', 'Haunted', 'Desolate', 'Eerie', 'Shadowed', 'Lost'];
            const randomAdjective = spookyAdjectives[Math.floor(Math.random() * spookyAdjectives.length)];
            
            if (element.tags?.leisure === 'park') name = `${randomAdjective} Park`;
            else if (element.tags?.leisure === 'playground') name = `Abandoned Playground`;
            else if (element.tags?.natural === 'water' || element.tags?.natural === 'lake' || element.tags?.natural === 'pond') name = `${randomAdjective} Waters`;
            else if (element.tags?.waterway) name = `Forgotten Waterway`;
            else if (element.tags?.barrier) name = `Cursed Gate`;
            else if (element.tags?.man_made === 'arch') name = `${randomAdjective} Arch`;
            else if (element.tags?.man_made === 'bridge' || element.tags?.highway === 'bridge') name = `Abandoned Bridge`;
            else if (element.tags?.amenity === 'fountain') name = `Desolate Fountain`;
            else if (element.tags?.amenity === 'library') name = `Forgotten Library`;
            else if (element.tags?.amenity === 'community_centre') name = `Abandoned Community Centre`;
            else if (element.tags?.amenity === 'school' || element.tags?.amenity === 'kindergarten') name = `Haunted School`;
            else if (element.tags?.leisure === 'pitch' || element.tags?.leisure === 'sports_centre') name = `Desolate Field`;
            else if (element.tags?.historic === 'memorial') name = `Forgotten Memorial`;
            else if (element.tags?.tourism === 'artwork') name = `Eerie Artwork`;
            else if (element.tags?.place === 'square') name = `Shadowed Square`;
            else {
              skippedNoName++;
              continue; // Skip if we can't generate a meaningful name
            }
          }
          
          // Determine type
          let type: POI['type'] = 'other';
          if (element.tags?.leisure === 'park') type = 'park';
          else if (element.tags?.tourism || element.tags?.historic) type = 'landmark';
          else if (element.tags?.building) type = 'building';
          else if (element.tags?.historic === 'monument') type = 'monument';
          else if (element.tags?.natural === 'water' || element.tags?.natural === 'lake' || element.tags?.natural === 'pond' || element.tags?.waterway) type = 'landmark'; // Water features
          else if (element.tags?.barrier || element.tags?.man_made) type = 'landmark'; // Gates, arches, structures
          else if (element.tags?.amenity) type = 'landmark'; // Community features

          pois.push({
            id: `poi-${element.id}`,
            name,
            type,
            lat: element.lat,
            lng: element.lon,
            tags: element.tags || {},
          });
        } else if (element.type === 'way' && element.center) {
          processedCount++;
          
          // For ways (areas), use the center point
          // Note: With "out center;" the center should be in element.center
          let name = element.tags?.name || 
                     element.tags?.['name:en'] ||
                     element.tags?.ref || 
                     element.tags?.['addr:housename'] ||
                     element.tags?.operator ||
                     element.tags?.brand ||
                     null;
          
          // Generate fallback name based on type if no name found - with spooky prefixes
          if (!name) {
            const spookyAdjectives = ['Cursed', 'Abandoned', 'Forgotten', 'Haunted', 'Desolate', 'Eerie', 'Shadowed', 'Lost'];
            const randomAdjective = spookyAdjectives[Math.floor(Math.random() * spookyAdjectives.length)];
            
            if (element.tags?.leisure === 'park') name = `${randomAdjective} Park`;
            else if (element.tags?.leisure === 'playground') name = `Abandoned Playground`;
            else if (element.tags?.natural === 'water' || element.tags?.natural === 'lake' || element.tags?.natural === 'pond') name = `${randomAdjective} Waters`;
            else if (element.tags?.waterway) name = `Forgotten Waterway`;
            else if (element.tags?.barrier) name = `Cursed Gate`;
            else if (element.tags?.man_made === 'arch') name = `${randomAdjective} Arch`;
            else if (element.tags?.man_made === 'bridge' || element.tags?.highway === 'bridge') name = `Abandoned Bridge`;
            else if (element.tags?.amenity === 'fountain') name = `Desolate Fountain`;
            else if (element.tags?.amenity === 'library') name = `Forgotten Library`;
            else if (element.tags?.amenity === 'community_centre') name = `Abandoned Community Centre`;
            else if (element.tags?.amenity === 'school' || element.tags?.amenity === 'kindergarten') name = `Haunted School`;
            else if (element.tags?.leisure === 'pitch' || element.tags?.leisure === 'sports_centre') name = `Desolate Field`;
            else if (element.tags?.historic === 'memorial') name = `Forgotten Memorial`;
            else if (element.tags?.tourism === 'artwork') name = `Eerie Artwork`;
            else if (element.tags?.place === 'square') name = `Shadowed Square`;
            else {
              skippedNoName++;
              continue; // Skip if we can't generate a meaningful name
            }
          }
          
          // For ways, we need to calculate center if not provided
          if (!element.center && element.bounds) {
            // Calculate center from bounds if available
            const centerLat = (element.bounds.minlat + element.bounds.maxlat) / 2;
            const centerLng = (element.bounds.minlon + element.bounds.maxlon) / 2;
            element.center = { lat: centerLat, lon: centerLng };
          }
          
          // Skip if we still don't have coordinates
          if (!element.center || !element.center.lat || !element.center.lon) {
            skippedNoName++;
            continue;
          }
          
          let type: POI['type'] = 'other';
          if (element.tags?.leisure === 'park') type = 'park';
          else if (element.tags?.tourism || element.tags?.historic) type = 'landmark';
          else if (element.tags?.building) type = 'building';
          else if (element.tags?.historic === 'monument') type = 'monument';
          else if (element.tags?.natural === 'water' || element.tags?.natural === 'lake' || element.tags?.natural === 'pond' || element.tags?.waterway) type = 'landmark'; // Water features
          else if (element.tags?.barrier || element.tags?.man_made) type = 'landmark'; // Gates, arches, structures
          else if (element.tags?.amenity && (element.tags?.amenity === 'library' || element.tags?.amenity === 'community_centre' || element.tags?.amenity === 'arts_centre' || element.tags?.amenity === 'fountain')) type = 'landmark'; // Community features

          pois.push({
            id: `poi-way-${element.id}`,
            name,
            type,
            lat: element.center.lat,
            lng: element.center.lon,
            tags: element.tags || {},
          });
        }
      }
    }

    console.log(`🔍 Processed ${pois.length} POIs with names from ${data.elements?.length || 0} total elements`);
    console.log(`   - Skipped ${skippedNoName} elements without names`);
    console.log(`   - Processed ${processedCount} elements total`);
    
    if (pois.length === 0 && data.elements && data.elements.length > 0) {
      console.warn('⚠️ Found elements but none had names. Sample element:', data.elements[0]);
    }
    
    // Remove duplicates and sort by distance
    const uniquePOIs = Array.from(
      new Map(pois.map(poi => [poi.id, poi])).values()
    );

    console.log(`🔍 After deduplication: ${uniquePOIs.length} unique POIs`);

    // Calculate distance and sort (closest first)
    const poisWithDistance = uniquePOIs.map(poi => ({
      ...poi,
      distance: calculateDistance(centerLat, centerLng, poi.lat, poi.lng),
    }));

    poisWithDistance.sort((a, b) => a.distance - b.distance);
    
    console.log(`📊 POIs sorted by distance. Closest: ${poisWithDistance[0]?.name || 'none'} (${poisWithDistance[0]?.distance?.toFixed(0) || 0}m)`);

    // Filter POIs to spread them out (minimum 200m between POIs, like Pokemon Go)
    // This prevents clustering and makes hotspots more spread out
    const MIN_POI_DISTANCE = 200; // meters
    const spreadOutPOIs: typeof poisWithDistance = [];
    
    for (const poi of poisWithDistance) {
      // Check if this POI is far enough from all already selected POIs
      const isFarEnough = spreadOutPOIs.every(selectedPoi => {
        const distance = calculateDistance(selectedPoi.lat, selectedPoi.lng, poi.lat, poi.lng);
        return distance >= MIN_POI_DISTANCE;
      });
      
      if (isFarEnough) {
        spreadOutPOIs.push(poi);
        // Limit to 10 spread-out POIs (like Pokemon Go has limited stops per area)
        if (spreadOutPOIs.length >= 10) break;
      }
    }

    // Return spread-out POIs
    return spreadOutPOIs.map(({ distance, ...poi }) => poi);
  } catch (error) {
    console.error('Failed to fetch POIs from Overpass API:', error);
    return [];
  }
}

/**
 * Calculate distance between two coordinates (Haversine formula)
 */
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371e3; // Earth radius in meters
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lng2 - lng1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}

/**
 * Get icon/emoji for POI type
 */
export function getPOIIcon(type: POI['type']): string {
  switch (type) {
    case 'park':
      return '🌳';
    case 'landmark':
      return '🏛️';
    case 'monument':
      return '🗿';
    case 'building':
      return '🏢';
    default:
      return '📍';
  }
}



