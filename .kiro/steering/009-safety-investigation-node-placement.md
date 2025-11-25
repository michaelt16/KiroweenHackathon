# Safety Guidelines for Investigation Node Placement

## Purpose

This steering document establishes safety rules for investigation hotspot/node placement to ensure players can safely interact with the game in real-world locations without putting themselves in danger.

## Core Safety Principle

**Investigation nodes MUST NOT spawn on or near roads, highways, or any areas that would require players to cross traffic or enter dangerous locations.**

## Placement Rules

### 1. Prohibited Locations

Investigation nodes **CANNOT** be placed:
- On any public roads, streets, or highways
- Within 50 meters of any major road or intersection
- On railroad tracks or near active railway lines
- In construction zones or restricted areas
- On private property without explicit permission
- In areas with active traffic or vehicle access
- Near bodies of water without safe access points
- In areas requiring trespassing

### 2. Preferred Locations

Investigation nodes **SHOULD** be placed in:
- **Parks and public green spaces** (highest priority)
- Public plazas and squares
- Designated pedestrian areas
- Public buildings with safe access (libraries, community centers)
- Sidewalks in safe, low-traffic areas (only if no park alternative exists)
- Public parking lots (when empty/closed, with clear safety boundaries)

### 3. Safety Buffer Zones

- **Minimum distance from roads**: 50 meters (0.0005 degrees latitude/longitude)
- **Minimum distance from intersections**: 75 meters
- **Minimum distance from highways**: 100 meters
- **Minimum distance from active railways**: 100 meters

### 4. Validation Requirements

Before placing any investigation node, verify:
1. The location is accessible via safe pedestrian paths
2. No road crossing is required to reach the node
3. The area is well-lit and safe during typical play hours
4. Emergency services can access the location if needed
5. The location complies with local laws and regulations

## Implementation Guidelines

### Coordinate Validation

When generating or placing investigation nodes programmatically:

```typescript
// Example validation function
function isValidInvestigationLocation(lat: number, lng: number): boolean {
  // Check distance from nearest road (requires road data)
  // Check if location is in a park or safe zone
  // Verify no dangerous areas nearby
  return isInSafeZone(lat, lng) && !isNearRoad(lat, lng);
}
```

### Manual Placement

When manually placing nodes:
1. Use satellite/street view to verify location safety
2. Check for nearby roads, intersections, or dangerous areas
3. Prefer park locations visible on map data
4. Test the location in person if possible
5. Document the safety rationale for each placement

### Dynamic Spawning (Future)

If implementing dynamic/random spawning:
- Use geofencing to exclude road polygons
- Query park/land use data to prefer safe zones
- Implement fallback to manual approval if no safe location found
- Never spawn nodes automatically without safety validation

## Edge Cases and Exceptions

### Urban Dense Areas

In areas with limited parks:
- Use public plazas, courtyards, or pedestrian-only zones
- Ensure clear visibility and safe access
- Mark as "urban safe zone" in metadata

### Rural Areas

In rural locations:
- Prefer public parks, trailheads, or designated recreation areas
- Avoid private property or restricted lands
- Ensure cell service and emergency access

### International Considerations

- Respect local laws and regulations
- Consider cultural sensitivities
- Verify public access rights
- Account for different road systems and safety standards

## Metadata Requirements

Each investigation node should include:
- `safetyLevel`: 'safe' | 'caution' | 'review_required'
- `locationType`: 'park' | 'plaza' | 'public_building' | 'other'
- `safetyNotes`: Optional notes about access or considerations
- `lastSafetyReview`: Timestamp of last safety validation

## Review and Maintenance

- **Quarterly review**: Audit all investigation node locations for safety
- **User reporting**: Implement system for players to report unsafe locations
- **Automated checks**: Use map data APIs to verify locations remain safe
- **Update protocol**: Remove or relocate nodes if area becomes unsafe

## Enforcement

- **Pre-deployment**: All nodes must pass safety validation before going live
- **Testing**: QA should verify safe access to all investigation locations
- **Monitoring**: Track player reports and adjust placements accordingly
- **Compliance**: Non-compliant nodes must be removed or relocated immediately

## Related Documents

- Spec 001: World Map MVP (initial placement guidelines)
- Spec 008: Full UI Transformation (node visibility and interaction)

---

**Last Updated**: 2024
**Status**: Active
**Priority**: Critical - Safety Requirement

