# Sensor Troubleshooting Guide

## Overview

Ghost Hunt uses real-world GPS and compass sensors. This guide helps you troubleshoot common sensor issues and optimize performance.

---

## 📍 GPS Issues

### Problem: "No GPS Signal" or "Acquiring GPS..."

**Causes:**
- Indoors or underground
- Poor weather conditions
- Device GPS disabled
- No location permissions

**Solutions:**
1. **Go outside** - GPS works best with clear sky view
2. **Wait 30-60 seconds** - Initial GPS acquisition takes time
3. **Check permissions** - Allow location access in device settings
4. **Enable GPS** - Turn on location services in device settings
5. **Restart device** - Fresh start can help acquire signal
6. **Use dev mode** - For desktop/indoor testing

---

### Problem: GPS Accuracy is Poor (>20m)

**Causes:**
- Tall buildings nearby (urban canyon effect)
- Heavy tree cover
- Poor satellite visibility
- Device GPS hardware limitations

**Solutions:**
1. **Move to open area** - Away from buildings and trees
2. **Wait for better accuracy** - GPS improves over time
3. **Check accuracy in debug overlay** - Monitor improvement
4. **Avoid metal structures** - Can interfere with GPS
5. **Use WiFi** - Assisted GPS uses WiFi for better accuracy

**Acceptable Accuracy:**
- ✅ **<10m** - Excellent (ideal for gameplay)
- ✅ **10-20m** - Good (playable)
- ⚠️ **20-50m** - Fair (may affect gameplay)
- ❌ **>50m** - Poor (not recommended)

---

### Problem: GPS Position Jumps Around

**Causes:**
- GPS jitter (normal behavior)
- Multipath interference (signal bouncing)
- Switching between GPS satellites

**Solutions:**
1. **Stand still briefly** - Let GPS stabilize
2. **Smoothing is automatic** - System uses weighted average
3. **Ignore small jumps** - <5m jumps are normal
4. **Move to better location** - If jumps are large (>20m)

**Note:** GPS smoother reduces jitter automatically using last 3 positions.

---

### Problem: GPS Drains Battery Quickly

**Causes:**
- High accuracy mode uses more power
- Continuous GPS tracking
- Background app refresh

**Solutions:**
1. **Close other apps** - Reduce overall battery drain
2. **Lower screen brightness** - Major battery saver
3. **Use power saving mode** - If device supports it
4. **Take breaks** - GPS updates throttled to 1Hz for efficiency

**Expected Battery Usage:**
- ~10-15% per 30 minutes of investigation
- ~20-30% per hour of continuous play

---

## 🧭 Compass Issues

### Problem: Compass Not Working

**Causes:**
- No device orientation permission
- Device doesn't have magnetometer
- Compass sensor disabled

**Solutions:**
1. **Grant permission** - Allow device orientation access
2. **Check device specs** - Verify magnetometer exists
3. **Use manual controls** - Fallback rotation buttons available
4. **Restart app** - Reinitialize sensors

**iOS Specific:**
- iOS 13+ requires explicit permission
- Tap "Allow" when prompted
- Check Settings → Privacy → Motion & Fitness

**Android Specific:**
- Usually no permission required
- Check Settings → Location → Improve accuracy
- Enable "Use compass" if available

---

### Problem: Compass Accuracy is Poor (>20°)

**Causes:**
- Compass not calibrated
- Magnetic interference nearby
- Device held incorrectly

**Solutions:**
1. **Calibrate compass** - Move device in figure-8 pattern
2. **Avoid interference** - Stay away from:
   - Metal objects (cars, fences, buildings)
   - Electronics (speakers, computers)
   - Magnets (phone cases with magnets)
3. **Hold device flat** - Parallel to ground for best accuracy
4. **Rotate slowly** - Fast rotation can confuse sensor

**Calibration Process:**
1. Hold device flat in front of you
2. Move in figure-8 pattern (like drawing ∞)
3. Rotate device on all 3 axes
4. Repeat 2-3 times
5. Check accuracy in debug overlay

**Acceptable Accuracy:**
- ✅ **<10°** - Excellent (ideal for gameplay)
- ✅ **10-20°** - Good (playable)
- ⚠️ **20-30°** - Fair (may affect gameplay)
- ❌ **>30°** - Poor (calibration needed)

---

### Problem: Compass Spins Wildly

**Causes:**
- Strong magnetic interference
- Device magnetometer damaged
- Rapid device movement

**Solutions:**
1. **Move away from interference** - Find clear area
2. **Recalibrate** - Figure-8 motion
3. **Use manual controls** - Fallback option
4. **Check device** - May need hardware repair

---

### Problem: Radar Doesn't Rotate

**Causes:**
- Compass not initialized
- Manual rotation mode enabled
- Sensor error

**Solutions:**
1. **Check compass status** - View in debug overlay
2. **Disable manual mode** - If accidentally enabled
3. **Restart investigation** - Reinitialize sensors
4. **Use manual controls** - Rotate with buttons

---

## 🔋 Performance Issues

### Problem: App is Laggy/Slow

**Causes:**
- Too many background apps
- Low device memory
- Overheating
- Old device hardware

**Solutions:**
1. **Close other apps** - Free up RAM
2. **Restart device** - Clear memory
3. **Let device cool** - Overheating throttles performance
4. **Lower quality** - Future graphics settings
5. **Update app** - Latest version has optimizations

**Performance Optimizations:**
- GPS updates: 1Hz (1000ms)
- Compass updates: 10Hz (100ms)
- Calculations: 5Hz (200ms)
- Target frame rate: 30fps+

---

### Problem: App Crashes or Freezes

**Causes:**
- Memory leak
- Sensor error
- Device compatibility

**Solutions:**
1. **Restart app** - Fresh start
2. **Update app** - Latest bug fixes
3. **Clear cache** - Device settings
4. **Report bug** - Include device model and OS version

---

## 🏙️ Indoor Usage

### Problem: Can't Play Indoors

**Causes:**
- GPS doesn't work indoors
- Compass affected by building materials

**Solutions:**
1. **Use dev mode** - Desktop/indoor testing mode
2. **Enable dev mode** - Toggle in investigation screen
3. **Use WASD keys** - Simulate movement
4. **Use manual rotation** - Rotate with buttons

**Dev Mode Features:**
- Simulated GPS position
- WASD movement (10m per step)
- Manual compass rotation
- Debug overlay for monitoring

---

## 📱 Device-Specific Issues

### iOS Issues

**Problem: Orientation Permission Denied**
- Settings → Privacy → Motion & Fitness
- Enable for Ghost Hunt app
- Restart app

**Problem: GPS Not Working**
- Settings → Privacy → Location Services
- Enable for Ghost Hunt app
- Select "While Using App"

**Problem: Compass Inaccurate**
- iOS compass can be affected by case magnets
- Remove case and recalibrate
- Use manual controls if needed

---

### Android Issues

**Problem: GPS Slow to Acquire**
- Settings → Location → Mode
- Select "High Accuracy"
- Enable WiFi scanning

**Problem: Compass Not Working**
- Some Android devices have poor magnetometers
- Calibrate using device settings
- Use manual controls as fallback

**Problem: Battery Drain**
- Settings → Battery → Optimize
- Don't optimize Ghost Hunt (needs background sensors)

---

## 🐛 Debug Tools

### Enable Debug Overlay

1. Start investigation
2. Tap "Debug OFF" button (top-left)
3. View sensor data in real-time

**Debug Overlay Shows:**
- GPS: Lat/Lng, accuracy, timestamp
- Compass: Heading, accuracy, cardinal direction
- Ghost: Distance, bearing, relative angle
- Game: Ghost type, sanity

**Use Debug Overlay To:**
- Verify sensors are working
- Check accuracy values
- Monitor performance
- Troubleshoot issues
- Learn how system works

---

### Enable Dev Mode

1. Start investigation
2. Tap "Dev Mode OFF" button (top-left)
3. Use WASD keys to move
4. Use arrow keys to rotate

**Dev Mode Features:**
- Simulated GPS movement
- Manual compass rotation
- Position/ghost tracking
- Desktop testing

---

## 📊 Sensor Status Indicators

### GPS Status
- 🟢 **Green** - Good accuracy (<20m)
- 🟡 **Yellow** - Fair accuracy (20-50m)
- 🔴 **Red** - Poor accuracy (>50m)
- ⚫ **Gray** - No signal

### Compass Status
- 🟢 **Green** - Good accuracy (<20°)
- 🟡 **Yellow** - Fair accuracy (20-30°)
- 🔴 **Red** - Poor accuracy (>30°)
- ⚫ **Gray** - Not available

---

## 🆘 Still Having Issues?

### Checklist
- [ ] Permissions granted (Location + Orientation)
- [ ] GPS enabled in device settings
- [ ] Outdoors with clear sky view
- [ ] Compass calibrated (figure-8 motion)
- [ ] Away from magnetic interference
- [ ] App updated to latest version
- [ ] Device restarted
- [ ] Other apps closed

### Report a Bug
If issues persist, report with:
- Device model and OS version
- Sensor accuracy values (from debug overlay)
- Steps to reproduce
- Screenshots if possible

---

## 💡 Pro Tips

### Optimal Conditions
- ✅ Outdoors in open area
- ✅ Clear weather
- ✅ Device held flat
- ✅ Slow, deliberate movements
- ✅ Calibrated compass
- ✅ Fresh device restart

### Avoid
- ❌ Indoors/underground
- ❌ Near metal structures
- ❌ Rapid device movement
- ❌ Low battery (<20%)
- ❌ Many background apps
- ❌ Magnetic phone cases

---

**Remember**: Real-world sensors aren't perfect. The game is designed to work with typical GPS/compass accuracy. If sensors are too inaccurate, use dev mode or manual controls! 🎮
