# Codebase Cleanup Plan

## Summary
The codebase has accumulated duplicate files, old versions, and unused components. This cleanup will remove ~30-40 files and improve maintainability.

---

## 🗑️ Files to Delete

### 1. Old Tool Components (components/Tools/)
**Reason**: Replaced by `components/Investigation/Tools/`

Delete entire directory:
- `src/components/Tools/` (entire folder)
  - AudioReceiver.tsx
  - AudioReceiverTool.tsx
  - Camera.tsx / Camera.css
  - CameraTool.tsx
  - EMFMeter.tsx
  - EMFMeterTool.tsx
  - RadarTool.tsx
  - ThermalScanner.tsx
  - ThermalScannerTool.tsx
  - ToolBar.tsx / ToolBar.css
  - index.ts
  - shared/ (if exists)

**Action**: Delete `src/components/Tools/` entirely

---

### 2. Old Horror Components (components/horror/)
**Reason**: Replaced by `components/analog/`

Delete entire directory:
- `src/components/horror/` (entire folder)
  - HandwrittenText.tsx
  - PaperCard.tsx
  - PolaroidPhoto.tsx
  - StampMark.tsx
  - index.ts

**Action**: Delete `src/components/horror/` entirely

---

### 3. Backup Files
**Reason**: No longer needed

- `src/components/Codex/GhostCodex.backup.tsx`

**Action**: Delete backup file

---

### 4. ~~Old FieldKit System~~ ❌ KEEP - STILL IN USE
**Status**: Currently used in InvestigationScreen

Keep (actively used):
- ✅ `src/components/Investigation/FieldKitDrawer.tsx` - Used in investigation mode
- ✅ `src/components/Investigation/FieldKit/` - Tabs used by drawer
  - CodexTab.tsx
  - EvidenceTab.tsx
  - PhotosTab.tsx / PhotosTab.css
  - ToolsTab.tsx

**Note**: The unified backpack (Spec 010) is for overworld mode. Investigation mode still uses the FieldKit drawer.

---

### 5. Empty Directories
**Reason**: Unused

- `src/components/Radar/` (empty)

**Action**: Delete empty directory

---

### 6. Old Mock Files (ui-playground/)
**Reason**: Superseded by newer versions or no longer needed

Keep these (still useful as reference):
- ✅ `tools/` folder (EMFMeterMock, RadarToolMock, etc.) - KEEP for Spec 013
- ✅ `JournalHorrorEnhanced.tsx` - Current reference
- ✅ `AnalogHorrorPlayground.tsx` - Testing ground
- ✅ `PlaygroundRouter.tsx` - Router
- ✅ `UnifiedBackpackDemo.tsx` - Demo

Delete these (old/duplicate):
- ❌ `CodexHorror.tsx` (old version)
- ❌ `CodexMock.tsx` (old version)
- ❌ `CodexJournalMobile.tsx` (old version)
- ❌ `InvestigationHorror.tsx` (old version)
- ❌ `InvestigationMock.tsx` (old version)
- ❌ `JournalHorrorMock.tsx` (superseded by JournalHorrorEnhanced)
- ❌ `MapHorror.tsx` (old version)
- ❌ `MapMock.tsx` (old version)
- ❌ `MapVariationsMock.tsx` (old experiments)
- ❌ `ProfileMock.tsx` (old version)
- ❌ `ProfileHorrorID.tsx` (old version)
- ❌ `ProfileHorrorIDTexture.tsx` (old version)
- ❌ `CorkboardMapView.tsx` (old version)
- ❌ `EvidenceBoardMock.tsx` (old version)
- ❌ `CorruptedDatabaseMock.tsx` (old experiment)
- ❌ `IconVariationsMock.tsx` (old experiment)
- ❌ `MediaMock_1.tsx` (old experiment)
- ❌ `MediaMock_2.tsx` (old experiment)
- ❌ `MediaMock_3.tsx` (old experiment)
- ❌ `MediaMock_4.tsx` (old experiment)
- ❌ `AnalogHorrorHybridMock.tsx` (old experiment)

**Action**: Delete 19 old mock files

---

### 7. Old Demo Files (ui-playground/)
**Reason**: Demos for components that are now integrated

- ❌ `AnalogCharmsIndicatorDemo.tsx` (component is integrated)
- ❌ `LEDBoostGaugeDemo.tsx` (component is integrated)
- ❌ `MechanicalFilmCounterDemo.tsx` (component is integrated)
- ❌ `PhysicalToolDeviceTest.tsx` (old test)
- ❌ `InvestigationDrawerMock.tsx` (integrated)

**Action**: Delete 5 demo files

---

### 8. Old Example Files (ui-playground/examples/)
Let me check what's in there:

---

## 📁 Files to Keep

### Production Components
- ✅ `src/components/analog/` - Current analog horror system
- ✅ `src/components/Backpack/` - Current backpack system
- ✅ `src/components/Investigation/` - Current investigation system
- ✅ `src/components/HUD/` - Current HUD components
- ✅ `src/components/Equipment/` - Current equipment components
- ✅ `src/components/Effects/` - VHS/CRT effects
- ✅ All marker components (PlayerMarker, SupplyMarker, etc.)

### UI Playground (Reference)
- ✅ `ui-playground/tools/` - Tool mocks (needed for Spec 013)
- ✅ `JournalHorrorEnhanced.tsx` - Current reference
- ✅ `AnalogHorrorPlayground.tsx` - Testing ground
- ✅ `PlaygroundRouter.tsx` - Router
- ✅ `UnifiedBackpackDemo.tsx` - Demo

---

## 🔍 Files to Review

Let me check these directories:
- `ui-playground/examples/`
- `ui-playground/sketchbook/`

---

## ⚠️ Before Deleting

1. **Backup**: Create a git branch or commit current state
2. **Search**: Search codebase for imports of files to be deleted
3. **Test**: Run the app to ensure nothing breaks
4. **Commit**: Commit cleanup in separate commit

---

## 📊 Cleanup Impact

**Files to delete**: ~35-40 files
**Directories to delete**: 3 directories
**Estimated space saved**: Significant (2000+ lines per old tool file)
**Risk**: Low (all are duplicates or old versions)

---

## 🎯 Recommendation

**Clean NOW** before Spec 013 refactoring because:
1. Clearer workspace for refactoring
2. Won't accidentally reference old files
3. Easier to navigate codebase
4. Faster builds
5. Less confusion

**Order**:
1. Delete old `components/Tools/` directory
2. Delete old `components/horror/` directory
3. Delete backup files
4. Delete old mock files
5. Delete old demo files
6. Delete empty directories
7. Test app still works
8. Commit cleanup
9. Start Spec 013 refactoring

