# Design Document - Spec 012: Investigation Drawer Refinement

## Overview

This design refines the investigation mode backpack drawer to create more authentic, context-appropriate UI for each tab. The key insight is that different tabs serve different purposes and should feel different:

- **Photos**: Fresh evidence just captured → Polaroids on dark surface
- **Evidence**: Active investigation notes → Field notepad with handwritten checklist
- **Field Journals**: Historical records → Collapsible selector + aged journal pages
- **Codex**: Reference material → Manila folder with organized tabs

## Architecture

### Component Structure

```
InvestigationDrawer
├── BackpackDrawer (container)
│   ├── Tab Bar (Tools, Photos, Evidence, Journal, Codex)
│   └── Tab Content
│       ├── Tools Tab (existing - equipment case)
│       ├── Photos Tab (NEW - fresh Polaroids)
│       ├── Evidence Tab (NEW - field notepad)
│       ├── Field Journals Tab (UPDATED - collapsible selector)
│       └── Codex Tab (UPDATED - manila folder only)
```

### State Management

```typescript
interface DrawerState {
  isOpen: boolean;
  activeTab: 'tools' | 'photos' | 'evidence' | 'journal' | 'codex';
  
  // Photos tab
  capturedPhotos: Photo[];
  
  // Evidence tab
  evidenceChecklist: EvidenceItem[];
  suspectedGhosts: GhostSuspect[];
  
  // Field Journals tab
  selectedJournal: JournalEntry | null;
  isJournalListExpanded: boolean;
  currentJournalPage: number;
  
  // Codex tab
  // Uses GhostCodexContent component state
}
```

---

## Components and Interfaces

### 1. Photos Tab Component

**Purpose**: Display freshly captured Polaroid photos on a dark surface

**Visual Design**:
```
┌─────────────────────────────────────┐
│  Dark Surface (#1a1612)             │
│                                     │
│  ┌─────────────────────┐            │
│  │ [Tape: "Evidence    │            │
│  │  Photos - Just      │            │
│  │  Taken"]            │            │
│  └─────────────────────┘            │
│                                     │
│    ┌────────┐  ┌────────┐          │
│    │ Photo  │  │ Photo  │          │
│    │   1    │  │   2    │          │
│    │ 23:15  │  │ 23:20  │          │
│    └────────┘  └────────┘          │
│                                     │
│         ┌────────┐                  │
│         │ Photo  │                  │
│         │   3    │                  │
│         │ 23:25  │                  │
│         └────────┘                  │
│                                     │
│  ┌─────────────────────┐            │
│  │ [Tape: "3 photos    │            │
│  │  captured"]         │            │
│  └─────────────────────┘            │
└─────────────────────────────────────┘
```

**Implementation**:
```typescript
interface PhotosTabProps {
  photos: Photo[];
}

interface Photo {
  id: string;
  imageUrl: string;
  timestamp: string;
  caption?: string;
}

function PhotosTab({ photos }: PhotosTabProps) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#1a1612',
      padding: '20px',
      overflow: 'auto',
    }}>
      {/* Title on tape */}
      <TapeLabel text="Evidence Photos - Just Taken" rotation={-1} />
      
      {/* Polaroid grid */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '32px',
        justifyContent: 'center',
        maxWidth: '800px',
        margin: '30px auto',
      }}>
        {photos.map((photo, i) => (
          <PolaroidPhoto
            key={photo.id}
            src={photo.imageUrl}
            caption={photo.timestamp}
            damage="light"
            rotation={i % 2 === 0 ? -3 : 3}
            seed={photo.id}
          />
        ))}
      </div>
      
      {/* Count on tape */}
      <TapeLabel 
        text={`${photos.length} photos captured`} 
        rotation={1.5} 
      />
    </div>
  );
}
```

**Key Styling**:
- Background: `#1a1612` (dark surface)
- No PaperBase wrapper
- Polaroids with `damage="light"` (fresh, not aged)
- Natural scatter with rotations: `-3deg` to `3deg`
- Tape labels: `rgba(255, 255, 255, 0.85)` with handwritten text

---

### 2. Evidence Tab Component

**Purpose**: Display field notepad with handwritten evidence checklist

**Visual Design**:
```
┌─────────────────────────────────────┐
│  Dark Background (#1a1612)          │
│                                     │
│     ┌─────────────────────┐         │
│     │    [Metal Clip]     │         │
│     ├─────────────────────┤         │
│     │  Notepad (#f4f0e6)  │         │
│     │                     │         │
│     │  Evidence Checklist │         │
│     │                     │         │
│     │  Evidence Found:    │         │
│     │  ✓ EMF Level 5      │         │
│     │  ✓ Freezing Temps   │         │
│     │  ○ Spirit Box       │         │
│     │  ○ Ghost Orbs       │         │
│     │  ○ Ghost Writing    │         │
│     │  ○ Fingerprints     │         │
│     │                     │         │
│     │  ┌───────────────┐  │         │
│     │  │ Suspects:     │  │         │
│     │  │ ⭕ WRAITH     │  │         │
│     │  │ ○ BANSHEE     │  │         │
│     │  │ ○ DEMON       │  │         │
│     │  └───────────────┘  │         │
│     │                     │         │
│     │  [Make Identification] │      │
│     └─────────────────────┘         │
└─────────────────────────────────────┘
```

**Implementation**:
```typescript
interface EvidenceTabProps {
  evidence: EvidenceItem[];
  suspects: GhostSuspect[];
  onIdentify: () => void;
}

interface EvidenceItem {
  name: string;
  found: boolean;
}

interface GhostSuspect {
  name: string;
  confidence: 'High' | 'Medium' | 'Low';
}

function EvidenceTab({ evidence, suspects, onIdentify }: EvidenceTabProps) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#1a1612',
      padding: '20px',
      overflow: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
    }}>
      {/* Clipboard */}
      <div style={{
        maxWidth: '500px',
        width: '100%',
        background: '#f4f0e6',
        padding: '30px 25px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
        transform: 'rotate(-0.5deg)',
        position: 'relative',
        borderRadius: '4px',
      }}>
        {/* Metal clip */}
        <ClipboardClip />
        
        {/* Title */}
        <HandwrittenText urgency="urgent" fontSize="24px">
          Evidence Checklist
        </HandwrittenText>
        
        {/* Evidence list */}
        <EvidenceChecklist items={evidence} />
        
        {/* Suspects box */}
        <SuspectsBox suspects={suspects} />
        
        {/* Identify button */}
        <IdentifyButton onClick={onIdentify} />
      </div>
    </div>
  );
}
```

**Key Styling**:
- Background: `#1a1612` (dark)
- Notepad: `#f4f0e6` (light paper)
- All text: Caveat font (handwritten)
- Font sizes: 18-24px (readable handwriting)
- Checkmarks: `✓` for found, `○` for not found
- Suspects box: Yellow highlight `rgba(255, 255, 0, 0.15)` with yellow border
- High confidence: Red circle `⭕` and bold text

---

### 3. Field Journals Tab Component (Updated)

**Purpose**: Display collapsible journal selector with paginated journal content

**Visual Design**:
```
┌─────────────────────────────────────┐
│  ┌─────────────────────────────┐    │
│  │ 11/20/2024 - Oakwood        │ ▼  │ ← Collapsed
│  │ Agent Rodriguez - DECEASED  │    │
│  └─────────────────────────────┘    │
│                                     │
│  [Journal Page Content]             │
│  [Click to advance]                 │
│                                     │
│  [← Previous] [Page 1/3] [Next →]   │
└─────────────────────────────────────┘

When expanded:
┌─────────────────────────────────────┐
│  ┌─────────────────────────────┐    │
│  │ 11/20/2024 - Oakwood        │ ▲  │ ← Expanded
│  │ Agent Rodriguez - DECEASED  │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │ [Scrollable List]           │    │
│  │ • Journal 1                 │    │
│  │ • Journal 2                 │    │
│  │ • Journal 3                 │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

**Implementation**:
```typescript
interface FieldJournalsTabProps {
  journals: JournalEntry[];
}

function FieldJournalsTab({ journals }: FieldJournalsTabProps) {
  const [selectedJournal, setSelectedJournal] = useState(journals[0]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  
  const handleJournalClick = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  return (
    <div>
      {/* Collapsible selector */}
      <CollapsibleJournalSelector
        selectedJournal={selectedJournal}
        allJournals={journals}
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
        onSelect={(journal) => {
          setSelectedJournal(journal);
          setIsExpanded(false);
          setCurrentPage(0);
        }}
      />
      
      {/* Journal content - clickable to advance */}
      <div onClick={handleJournalClick}>
        <EvidencePage>
          {/* Page content based on currentPage */}
        </EvidencePage>
      </div>
      
      {/* Pagination */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
```

**Key Features**:
- Collapsed state shows current journal info + dropdown arrow
- Expanded state shows scrollable list (max 400px height)
- Clicking journal auto-collapses and switches
- Clicking journal page advances to next page
- Pagination buttons for explicit navigation

---

### 4. Codex Tab Component (Updated)

**Purpose**: Display manila folder content without wood table wrapper

**Visual Design**:
```
┌─────────────────────────────────────┐
│ [COVER][WRAITH][SHADE][POLTERGEIST] │ ← Folder tabs
├─────────────────────────────────────┤
│  Manila Folder (#c4b49a)            │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Aged Paper (#d8d4c8)        │   │
│  │                             │   │
│  │ [Ghost Entry Content]       │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

**Implementation**:
```typescript
function CodexTab() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      overflow: 'auto',
    }}>
      <GhostCodexContent />
    </div>
  );
}
```

**Key Changes**:
- Uses `GhostCodexContent` component (no wood table)
- Reduced padding: `12px` mobile, `20px` desktop
- Same visual styling as /codex route
- Manila folder tabs + brown folder frame
- Aged paper content with textures

---

## Data Models

### Photo Model
```typescript
interface Photo {
  id: string;
  imageUrl: string;
  timestamp: string;
  caption?: string;
  location?: string;
}
```

### Evidence Model
```typescript
interface EvidenceItem {
  id: string;
  name: string;
  found: boolean;
  timestamp?: string;
}

interface GhostSuspect {
  ghostId: string;
  name: string;
  confidence: 'High' | 'Medium' | 'Low';
  matchingEvidence: string[];
}
```

### Journal Model (Existing)
```typescript
interface JournalEntry {
  id: string;
  date: string;
  location: string;
  agentName: string;
  agentStatus: 'ACTIVE' | 'MISSING' | 'DECEASED';
  threatLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
  evidence: string[];
  notes: string[];
  photos?: string[];
  finalEntry?: string;
}
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Tab Content Isolation
*For any* tab switch, the content of one tab should not affect the content or state of another tab
**Validates: Requirements 6.6**

### Property 2: Collapsible State Consistency
*For any* journal selector state, when expanded is true, the list should be visible, and when false, only the selected journal should be shown
**Validates: Requirements 3.4, 3.6**

### Property 3: Photo Display Consistency
*For any* set of photos, each photo should be displayed with light damage and natural rotation between -3 and 3 degrees
**Validates: Requirements 1.2, 1.3**

### Property 4: Evidence Checklist Accuracy
*For any* evidence item, if found is true, it should display with a checkmark (✓), otherwise with a circle (○)
**Validates: Requirements 2.4**

### Property 5: Page Navigation Bounds
*For any* journal page click, the page should only advance if currentPage < totalPages - 1
**Validates: Requirements 3.10**

### Property 6: Codex Content Equivalence
*For any* ghost entry, the content displayed in the Codex tab should be identical to the /codex route minus the wood table wrapper
**Validates: Requirements 4.6, 4.7**

---

## Error Handling

### Photos Tab
- **No photos captured**: Show empty state with tape label "No photos yet"
- **Photo load failure**: Show placeholder Polaroid with error message
- **Invalid photo URL**: Skip photo and log error

### Evidence Tab
- **No evidence found**: Show all items unchecked
- **No suspects**: Show message "Collect more evidence"
- **Identify with insufficient evidence**: Disable button or show warning

### Field Journals Tab
- **No journals collected**: Show empty state message
- **Journal load failure**: Show error message and retry option
- **Invalid page number**: Clamp to valid range [0, totalPages-1]

### Codex Tab
- **No ghosts discovered**: Show locked entries
- **Ghost data missing**: Show placeholder with "???"

---

## Testing Strategy

### Unit Tests
- Test collapsible selector expand/collapse logic
- Test page navigation bounds checking
- Test evidence checklist rendering with various states
- Test photo grid layout with different photo counts

### Property-Based Tests
- Property 1: Tab isolation (switch tabs randomly, verify no state leakage)
- Property 2: Collapsible consistency (toggle randomly, verify UI matches state)
- Property 3: Photo rotation (generate random photos, verify rotation range)
- Property 4: Evidence display (generate random evidence, verify checkmark logic)
- Property 5: Page bounds (generate random page clicks, verify no out-of-bounds)
- Property 6: Codex equivalence (compare drawer vs route rendering)

### Integration Tests
- Test full drawer workflow: open → switch tabs → interact → close
- Test journal selection → page navigation → close drawer
- Test photo capture → view in drawer → verify display
- Test evidence collection → view checklist → identify ghost

---

## Performance Considerations

### Optimization Strategies
1. **Lazy render tab content**: Only render active tab
2. **Virtualize journal list**: Use virtual scrolling for 100+ journals
3. **Memoize Polaroid components**: Prevent re-renders on tab switch
4. **Debounce page clicks**: Prevent rapid clicking issues
5. **Cache GhostCodexContent**: Reuse between drawer and /codex route

### Performance Targets
- Tab switch: < 100ms
- Drawer open/close: 300ms (smooth animation)
- Photo grid render: < 200ms for 20 photos
- Journal page advance: < 150ms
- Evidence checklist update: < 50ms

---

## Mobile Responsiveness

### Breakpoints
- Mobile: < 768px
- Desktop: ≥ 768px

### Mobile Adjustments
- Photos: 1-2 columns instead of 3-4
- Evidence notepad: Full width with reduced padding
- Journal selector: Full width button
- Codex: Reduced padding (12px vs 20px)
- Font sizes: Slightly smaller but still readable

### Touch Interactions
- Tap journal selector to expand/collapse
- Tap journal page to advance
- Tap outside expanded list to collapse
- Swipe gestures: Not implemented (future enhancement)

---

## Dependencies

- Spec 006: Analog Horror Component System (PolaroidPhoto, HandwrittenText, TypewrittenText)
- Spec 007: Investigation Tools Design System (tool aesthetics)
- Spec 011: Unified Backpack System (drawer container, tab structure)
- GhostCodexContent component (extracted from GhostCodex)
- FieldJournalsScreen component (existing journal display)

---

## Implementation Notes

### Component Reuse
- `GhostCodexContent`: Used in both /codex route and drawer
- `PolaroidPhoto`: Used in Photos tab and Field Journals
- `HandwrittenText`: Used in Evidence tab and Field Journals
- `EvidencePage`: Used in Field Journals for page display

### Styling Consistency
- Follow steering document 006 for analog horror patterns
- Use established color palette from steering documents
- Maintain texture layering approach
- Apply appropriate damage elements per context

### State Management
- Drawer state managed at InvestigationDrawer level
- Tab-specific state managed within each tab component
- Journal state managed by FieldJournalsContext
- Codex state managed by GhostCodexContent

---

## Future Enhancements

- Swipe gestures for page navigation
- Photo zoom/fullscreen view
- Evidence item tap for details
- Journal search/filter
- Codex bookmarks
- Tab history/back button
- Offline support for cached content
