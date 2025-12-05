# Field Journals System Analysis

## 📊 Current State Overview

### ✅ **What's Being Used**

#### 1. **Data Source: `src/data/fieldJournals.ts`**
   - **15 journal entries** (`journal-001` to `journal-015`)
   - Structure: `JournalEntry` type with:
     - `id`, `date`, `location`, `agentName`
     - `agentStatus` (MISSING/DECEASED/RETIRED/ACTIVE)
     - `threatLevel` (LOW/MEDIUM/HIGH/EXTREME)
     - `notes[]` (array of investigation notes)
     - `evidence[]` (array of evidence strings)
     - `photos[]` (optional array of image paths)
     - `finalEntry` (optional final note)
   - **Status**: ✅ ACTIVE - This is the primary data source

#### 2. **Storage: `src/context/FieldJournalsContext.tsx`**
   - Manages collected journals in `localStorage`
   - Provides: `collectedJournals`, `addJournal()`, `hasJournal()`, `resetJournals()`
   - **Status**: ✅ ACTIVE - Used throughout the app

#### 3. **Display: `src/screens/FieldJournalsScreen.tsx`**
   - Main screen at `/field-journals` route
   - Shows paginated journal entries
   - Has collapsible journal list selector
   - Uses analog horror styling (EvidencePage, HandwrittenText, etc.)
   - **Status**: ✅ ACTIVE - Main display component

#### 4. **Collection: `src/components/FieldJournalMarker.tsx`**
   - Map marker for collecting journals
   - Uses `getJournalById()` from `fieldJournals.ts`
   - **Status**: ✅ ACTIVE - Used on map

#### 5. **Reading Modal: `src/components/JournalReadingModal.tsx`**
   - Modal shown when journal is collected
   - Similar pagination to FieldJournalsScreen
   - **Status**: ✅ ACTIVE - Used when collecting journals

#### 6. **Map Nodes: `src/data/mockData.ts`**
   - `MOCK_FIELD_JOURNAL_NODES` array
   - 5 journal nodes that reference journal IDs
   - **Status**: ✅ ACTIVE - Spawns journals on map

---

### ❌ **What's NOT Being Used**

#### 1. **Ghost Store Field Journals: `src/stores/ghostStore.ts`**
   - Each `GhostData` has a `fieldJournal` property
   - Structure: `{ agentName, date, story, fate }`
   - **Status**: ❌ UNUSED - These stories are never displayed
   - **Note**: According to specs, field journals should remain separate from ghost data

#### 2. **FieldJournalTab: `src/components/Backpack/tabs/FieldJournalTab.tsx`**
   - **Status**: ⚠️ MISLEADING NAME
   - This is NOT about field journals - it's just investigation tips/reminders
   - Has hardcoded content about tool usage, safety, etc.
   - Should probably be renamed to `InvestigationTipsTab` or similar

---

## 🔍 Data Flow

```
1. Map Spawns Journal Nodes
   └─> mockData.ts: MOCK_FIELD_JOURNAL_NODES
       └─> References journalId (e.g., 'journal-001')

2. Player Collects Journal
   └─> FieldJournalMarker.tsx
       └─> Calls getJournalById(journalId)
           └─> fieldJournals.ts: MOCK_JOURNALS array
       └─> Opens JournalReadingModal
           └─> Shows journal content with pagination

3. Journal Added to Collection
   └─> FieldJournalsContext.addJournal()
       └─> Stored in localStorage
       └─> Journal node removed from map

4. Viewing Collected Journals
   └─> FieldJournalsScreen.tsx
       └─> Reads from FieldJournalsContext
       └─> Displays paginated journal entries
```

---

## 📁 File Structure

```
src/
├── data/
│   ├── fieldJournals.ts          ✅ 15 journal entries (ACTIVE)
│   └── mockData.ts                ✅ Journal node spawns (ACTIVE)
│
├── context/
│   └── FieldJournalsContext.tsx   ✅ Storage & state (ACTIVE)
│
├── screens/
│   └── FieldJournalsScreen.tsx    ✅ Main display (ACTIVE)
│
├── components/
│   ├── FieldJournalMarker.tsx     ✅ Map collection (ACTIVE)
│   ├── JournalReadingModal.tsx    ✅ Reading modal (ACTIVE)
│   └── Backpack/tabs/
│       └── FieldJournalTab.tsx     ⚠️  Misleading name (tips, not journals)
│
├── stores/
│   └── ghostStore.ts              ❌ FieldJournal in GhostData (UNUSED)
│
└── types/
    └── game.ts                     ✅ JournalEntry type (ACTIVE)
```

---

## 🎯 Issues & Recommendations

### Issue 1: **Two Different Field Journal Types**
- `JournalEntry` in `types/game.ts` (used)
- `FieldJournal` in `ghostStore.ts` (unused)
- **Recommendation**: Keep them separate as per design spec. The ghost store field journals are for codex display (if needed), while `JournalEntry` is for the field journals screen.

### Issue 2: **FieldJournalTab Misleading Name**
- Component name suggests it shows field journals
- Actually shows investigation tips/reminders
- **Recommendation**: Rename to `InvestigationTipsTab` or `FieldGuideTab`

### Issue 3: **Data Scattered**
- Journal data: `fieldJournals.ts`
- Journal nodes: `mockData.ts`
- Collection state: `FieldJournalsContext.tsx`
- **Recommendation**: Consider consolidating journal data and nodes into a single file, or create a clear data organization structure.

### Issue 4: **15 Journals, Only 5 Nodes**
- 15 journal entries exist
- Only 5 journal nodes spawn on map
- **Recommendation**: Either add more nodes or document why only 5 spawn.

### Issue 5: **No Search/Filter**
- With 15 journals, finding specific ones could be difficult
- **Recommendation**: Add search/filter by location, agent name, threat level, or status.

---

## 📝 Summary

**What Works:**
- ✅ Journal collection system is functional
- ✅ Storage in localStorage works
- ✅ Display with pagination works
- ✅ Map markers work

**What's Confusing:**
- ⚠️ Two different field journal types (one used, one not)
- ⚠️ FieldJournalTab name is misleading
- ⚠️ Data spread across multiple files
- ⚠️ 15 journals but only 5 spawn on map

**Recommendations:**
1. Keep `JournalEntry` system as-is (it works)
2. Rename `FieldJournalTab` to something clearer
3. Document why ghost store `FieldJournal` is separate
4. Consider adding search/filter to FieldJournalsScreen
5. Consider consolidating journal data organization
