# Investigation Mode Guide

## Overview

Investigation Mode is where you hunt ghosts using real-world GPS and compass sensors. Walk around in the real world, use your tools to gather evidence, and identify the ghost type.

---

## 🎯 Core Gameplay Loop

1. **Enter Investigation** - Walk to a hotspot and start investigation
2. **Use Radar** - Rotate your body to find the ghost's direction
3. **Use EMF** - Walk toward the ghost to close the distance
4. **Use Other Tools** - Gather evidence (Camera, Thermal, Audio)
5. **Identify Ghost** - Deduce the ghost type from evidence
6. **Complete Ritual** - Banish or bind the ghost

---

## 📡 Radar Tool (Direction Only)

### How It Works
- **Shows direction only** - No distance information
- **Rotate your body** - The radar rotates with your compass heading
- **Ghost blip appears** - When ghost is in your forward cone (±45°)
- **Blip pulses** - When ghost is directly ahead (±5°)

### Tips
- Stand still and rotate slowly in a circle
- Watch for the ghost blip to appear
- Note the direction, then switch to EMF
- Re-check periodically as you move

### Visual Elements
- **Compass rose** - Shows N/S/E/W directions
- **Heading display** - Your current compass heading in degrees
- **Forward cone** - Subtle visualization of detection area
- **Ghost blip** - Red dot when ghost is detected

---

## 📊 EMF Tool (Distance Only)

### How It Works
- **Shows distance only** - No directional information
- **Audio beeping** - Faster beeps = closer to ghost
- **Proximity bars** - Visual indicator of distance
- **Walk to close distance** - Move in the direction Radar showed

### Beep Frequencies
- **Very Close** (<5m): ~120 BPM - Rapid beeping
- **Close** (5-15m): ~60 BPM - Fast beeping
- **Medium** (15-30m): ~30 BPM - Moderate beeping
- **Far** (30-50m): ~15 BPM - Slow beeping
- **Very Far** (>50m): ~5 BPM - Very slow beeping

### Tips
- Use Radar first to find direction
- Walk in that direction while EMF is active
- Listen to beep frequency changes
- If beeps slow down, you're going the wrong way
- When beeps are rapid, you're very close

### Visual Elements
- **Proximity bars** - 5 bars showing relative distance
- **BPM display** - Beats per minute of beeping
- **Color coding** - Green (far) → Yellow (medium) → Red (close)

---

## 🎮 Using Radar + EMF Together

This is the core skill of ghost hunting:

### The Hunt Sequence

1. **Pull out Radar**
   - Stand still
   - Rotate your body slowly
   - Watch for ghost blip to appear
   - Note the direction (e.g., "Northeast")

2. **Switch to EMF**
   - Keep facing that direction
   - Start walking forward
   - Listen to beep frequency
   - Watch proximity bars

3. **Adjust Course**
   - If beeps slow down → Stop and use Radar again
   - If beeps speed up → Keep going
   - Ghost might have moved → Re-check with Radar

4. **Get Close**
   - When EMF is rapid (Very Close)
   - Switch to Camera for photos
   - Use Thermal/Audio for more evidence

5. **Repeat**
   - Check Radar: Did ghost move?
   - Check EMF: Still close?
   - Gather evidence from multiple tools

---

## 📷 Other Tools

### Camera
- **Flash photos** - Uses film (limited resource)
- **7-second development** - Wait for photo to develop
- **Manifestations** - Closer = better chance of capturing ghost
- **Sanity impact** - Strong manifestations drain sanity

### Thermal Scanner
- **Cold spots** - Detects temperature anomalies
- **Blue pulses** - Visual indication of cold areas
- **Ghost proximity** - More cold spots when close

### Audio Receiver
- **Whispers** - Random ghost phrases
- **Subtitles** - Shows what the ghost says
- **Audio static** - Increases near ghost

---

## 🧭 Compass & GPS

### Compass (Device Orientation)
- **Automatic rotation** - Radar rotates with your body
- **Calibration** - May need to calibrate (figure-8 motion)
- **Accuracy** - Shown in debug overlay (±10-20° typical)
- **Manual fallback** - Use rotation buttons if compass unavailable

### GPS (Location Tracking)
- **Position tracking** - Tracks your real-world movement
- **Distance calculation** - Measures distance to ghost
- **Accuracy** - Shown in debug overlay (±5-20m typical)
- **Dev mode fallback** - Use WASD keys for desktop testing

---

## 🎯 Tips for Success

### General Strategy
1. **Radar first** - Always find direction before moving
2. **EMF second** - Walk in that direction to close distance
3. **Re-check often** - Ghost might move (in harder modes)
4. **Manage resources** - Film is limited, use wisely
5. **Watch sanity** - Don't let it reach 0%

### Skill Expression
- **Fast tool switching** - Swap between Radar and EMF quickly
- **Efficient movement** - Don't waste time walking wrong direction
- **Resource management** - Use film at optimal distance
- **Pattern recognition** - Learn ghost behavior patterns

### Common Mistakes
- ❌ Walking without checking Radar first
- ❌ Ignoring EMF beep changes
- ❌ Taking photos too far away
- ❌ Not re-checking Radar after moving
- ❌ Letting sanity drain to 0%

---

## 🐛 Troubleshooting

### Compass Not Working
- **Calibrate device** - Move in figure-8 pattern
- **Check permissions** - Allow device orientation access
- **Avoid interference** - Stay away from metal/magnets
- **Use manual controls** - Fallback rotation buttons available

### GPS Not Accurate
- **Go outside** - GPS works best outdoors
- **Wait for signal** - May take 30-60 seconds to acquire
- **Check accuracy** - View in debug overlay
- **Use dev mode** - For desktop/indoor testing

### Performance Issues
- **Close other apps** - Free up device resources
- **Reduce graphics** - Lower quality settings (future)
- **Check battery** - Low battery can throttle sensors
- **Restart app** - Fresh start can help

---

## 🎮 Controls

### Mobile (Real Sensors)
- **Walk** - Physical movement updates GPS
- **Rotate** - Physical rotation updates compass
- **Tap tools** - Switch between Radar, EMF, etc.
- **Tap buttons** - Take photos, use items

### Desktop (Dev Mode)
- **W / ↑** - Move forward (in compass direction)
- **S / ↓** - Move backward
- **Left/Right arrows** - Rotate compass heading
- **Mouse** - Click tools and buttons

---

## 📊 Debug Overlay

Enable debug overlay to see:
- **GPS Data** - Lat/Lng, accuracy, timestamp
- **Compass Data** - Heading, accuracy, cardinal direction
- **Ghost Data** - Distance, bearing, relative angle
- **Game State** - Ghost type, sanity

Useful for:
- Verifying sensors are working
- Checking accuracy values
- Debugging issues
- Learning how the system works

---

## 🎓 Advanced Techniques

### Triangulation
1. Check Radar from position A
2. Walk perpendicular to that direction
3. Check Radar from position B
4. Ghost is where the two directions intersect

### Spiral Search
1. Start at hotspot center
2. Walk in expanding spiral
3. Use EMF to detect when getting closer
4. Tighten spiral when EMF increases

### Quick Scan
1. Radar: Rotate 360° quickly
2. Note all directions where blip appears
3. Ghost is in that general area
4. Use EMF to narrow down

---

## 📝 Evidence Tracking

### Manual Evidence Log
- **EMF** - Strong/Weak/None
- **Whispers** - Frequent/Rare/None
- **Cold** - Strong/Weak/None
- **Static** - Frequent/Rare/None
- **Photos** - Manifestation/Faint/None
- **Sanity** - Fast drain/Normal/Slow
- **Movement** - Fast/Medium/Slow

### Ghost Identification
- **Wraith** - Strong EMF, fast movement, rare whispers
- **Shade** - Frequent whispers, cold spots, slow sanity drain
- **Poltergeist** - Static distortions, camera anomalies, no cold

---

## 🏆 Success Criteria

### Investigation Complete When:
- ✅ Gathered enough evidence (3-5 clues)
- ✅ Identified ghost type correctly
- ✅ Performed ritual successfully
- ✅ Sanity above 0%

### Rewards:
- XP for completion
- Ghost added to Codex
- Supplies for next investigation
- Unlock harder hotspots

---

**Remember**: The hunt is about skill, not luck. Master Radar + EMF, and you'll catch any ghost! 👻
