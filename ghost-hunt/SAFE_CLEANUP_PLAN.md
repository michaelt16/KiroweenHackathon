# Safe Cleanup Plan - Archive, Don't Delete

## Philosophy
**Keep iteration history, but organize it better.**

Instead of deleting old files, we'll:
1. Move old iterations to `src/ui-playground/archive/`
2. Only delete files we're 100% certain are unused duplicates
3. Keep a clear separation between production code and experiments

---

## ✅ Safe to Delete (Confirmed Duplicates)

### 1. Old Tool Components (components/Tools/)
**Reason**: Completely replaced by `components/Investigation/Tools/`
**Verification**: Searched imports - not used anywhere

Delete:
- `src/components/Tools/` (entire folder)

**Risk**: ✅ ZERO - These are old versions, completely replaced

---

### 2. Old Horror Components (components/horror/)
**Reason**: Completely replaced by `components/analog/`
**Verification**: Searched imports - not used anywhere

Delete:
- `src/components/horror/` (entire folder)

**Risk**: ✅ ZERO - These are old versions, completely replaced

---

### 3. Backup Files
**Reason**: Backup files no longer needed

Delete:
- `src/components/Codex/GhostCodex.backup.tsx`

**Risk**: ✅ ZERO - It's a backup file

---

### 4. Empty Directories
**Reason**: Unused

Delete:
- `src/components/Radar/` (empty)

**Risk**: ✅ ZERO - Empty folder

---

## 📦 Archive (Move to ui-playground/archive/)

### Create Archive Structure
```
src/ui-playground/
├── archive/
│   ├── iterations/          ← Old design iterations
│   │   ├── codex/
│   │   ├── investigation/
│   │   ├── map/
│   │   ├── profile/
│   │   └── media/
│   └── experiments/         ← One-off experiments
├── tools/                   ← KEEP - Current tool mocks
├── examples/                ← KEEP - Reference examples
├── sketchbook/              ← KEEP - Active experiments
└── [current files]          ← KEEP - Active mocks
```

### Files to Archive (Not Delete)

#### Codex Iterations
Move to `archive/iterations/codex/`:
- CodexHorror.tsx
- CodexMock.tsx
- CodexJournalMobile.tsx

#### Investigation Iterations
Move to `archive/iterations/investigation/`:
- InvestigationHorror.tsx
- InvestigationMock.tsx
- InvestigationDrawerMock.tsx

#### Map Iterations
Move to `archive/iterations/map/`:
- MapHorror.tsx
- MapMock.tsx
- MapVariationsMock.tsx
- CorkboardMapView.tsx
- EvidenceBoardMock.tsx

#### Profile Iterations
Move to `archive/iterations/profile/`:
- ProfileMock.tsx
- ProfileHorrorID.tsx
- ProfileHorrorIDTexture.tsx

#### Journal Iterations
Move to `archive/iterations/journal/`:
- JournalHorrorMock.tsx (superseded by JournalHorrorEnhanced)

#### Media Experiments
Move to `archive/experiments/`:
- MediaMock_1.tsx
- MediaMock_2.tsx
- MediaMock_3.tsx
- MediaMock_4.tsx
- CorruptedDatabaseMock.tsx
- IconVariationsMock.tsx
- AnalogHorrorHybridMock.tsx

#### Demo Files (Integrated Components)
Move to `archive/demos/`:
- AnalogCharmsIndicatorDemo.tsx
- LEDBoostGaugeDemo.tsx
- MechanicalFilmCounterDemo.tsx
- PhysicalToolDeviceTest.tsx

---

## ✅ Keep (Active Files)

### Production Components
- ✅ All of `src/components/` (except Tools/ and horror/)
- ✅ `src/components/Investigation/FieldKitDrawer.tsx` - Used in investigation
- ✅ `src/components/Investigation/FieldKit/` - Used by drawer

### UI Playground - Active
- ✅ `tools/` - Tool mocks (needed for Spec 013)
- ✅ `JournalHorrorEnhanced.tsx` - Current reference
- ✅ `AnalogHorrorPlayground.tsx` - Testing ground
- ✅ `PlaygroundRouter.tsx` - Router
- ✅ `UnifiedBackpackDemo.tsx` - Demo
- ✅ `examples/` - Reference examples
- ✅ `sketchbook/` - Active experiments

---

## 📋 Cleanup Steps

### Step 1: Create Archive Structure
```bash
mkdir -p src/ui-playground/archive/iterations/codex
mkdir -p src/ui-playground/archive/iterations/investigation
mkdir -p src/ui-playground/archive/iterations/map
mkdir -p src/ui-playground/archive/iterations/profile
mkdir -p src/ui-playground/archive/iterations/journal
mkdir -p src/ui-playground/archive/experiments
mkdir -p src/ui-playground/archive/demos
```

### Step 2: Move Files to Archive
Move (don't delete) old iterations to archive folders

### Step 3: Delete Confirmed Duplicates
Only delete:
- `src/components/Tools/`
- `src/components/horror/`
- `src/components/Codex/GhostCodex.backup.tsx`
- `src/components/Radar/`

### Step 4: Update PlaygroundRouter
Update routes to point to archived files if needed

### Step 5: Add Archive README
Create `src/ui-playground/archive/README.md` explaining the archive

---

## 📊 Impact

**Files to delete**: 4 items (only confirmed duplicates)
**Files to archive**: ~24 files (preserved for history)
**Risk**: ✅ MINIMAL - Only deleting confirmed unused duplicates

---

## 🎯 Benefits

1. **Clean workspace** - Active files are clear
2. **Preserved history** - Can reference old iterations
3. **Low risk** - Not deleting anything potentially useful
4. **Organized** - Clear structure for experiments vs production

---

## ⚠️ Verification Before Cleanup

Run these checks:
```bash
# Check if Tools/ is imported anywhere
grep -r "from.*components/Tools" src/

# Check if horror/ is imported anywhere
grep -r "from.*components/horror" src/

# Check if any archived files are imported
grep -r "CodexHorror\|InvestigationHorror\|MapHorror" src/
```

If any results found, DO NOT delete those files.

---

## 🤔 Recommendation

**Approach**: Archive first, delete later

1. **Now**: Move old iterations to archive
2. **After Spec 013**: Review archive, delete if truly not needed
3. **Keep**: Tool mocks, current references, active experiments

This way you keep your iteration history but have a cleaner workspace.

