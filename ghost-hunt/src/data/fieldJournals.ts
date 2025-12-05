// Field Journal entries data - Generated from ghostStore with behavioral hints
import type { JournalEntry } from '../types/game';
import { GhostType } from '../stores/ghostStore';
import type { GhostData } from '../stores/ghostStore';
import WraithImage from '../assets/images/ghosts/Wraith.png';
import ShadeImage from '../assets/images/ghosts/Shade.png';
import PoltergeistImage from '../assets/images/ghosts/Poltergeist.png';
import BansheeImage from '../assets/images/ghosts/Banshee.png';
import PhantomImage from '../assets/images/ghosts/Phantom.png';
import OnyxImage from '../assets/images/ghosts/Onyx.png';
import TricksterImage from '../assets/images/ghosts/Trickster.png';

// Map ghost types to images
const ghostImageMap: Record<GhostType, string> = {
  [GhostType.WRAITH]: WraithImage,
  [GhostType.SHADE]: ShadeImage,
  [GhostType.POLTERGEIST]: PoltergeistImage,
  [GhostType.BANSHEE]: BansheeImage,
  [GhostType.PHANTOM]: PhantomImage,
  [GhostType.ONYX]: OnyxImage,
  [GhostType.TRICKSTER]: TricksterImage,
};

// Helper function to convert GhostData to JournalEntry with behavioral hints
function createJournalEntryFromGhost(ghost: GhostData): JournalEntry {
  // Defensive checks for missing data BEFORE destructuring
  if (!ghost || !ghost.id) {
    console.error('Invalid ghost data:', ghost);
    return {
      id: 'journal-unknown',
      date: 'Unknown',
      location: 'Unknown Location',
      agentName: 'Unknown Agent',
      agentStatus: 'MISSING',
      threatLevel: 'MEDIUM',
      notes: ['Data unavailable'],
      evidence: [],
      finalEntry: 'Journal data could not be loaded.',
    };
  }
  
  const { fieldJournal, cameraManifestations, thermalReading, spiritBoxResponse, threatLevel, name, id } = ghost;
  
  // Defensive checks for missing required properties
  if (!fieldJournal || !spiritBoxResponse || !cameraManifestations || !thermalReading) {
    console.error('Missing required ghost data:', { 
      id, 
      name, 
      hasFieldJournal: !!fieldJournal, 
      hasSpiritBoxResponse: !!spiritBoxResponse,
      hasCameraManifestations: !!cameraManifestations,
      hasThermalReading: !!thermalReading
    });
    // Return a minimal journal entry as fallback
    return {
      id: `journal-${id}`,
      date: fieldJournal?.date || 'Unknown',
      location: 'Unknown Location',
      agentName: fieldJournal?.agentName || 'Unknown Agent',
      agentStatus: 'MISSING',
      threatLevel: threatLevel || 'MEDIUM',
      notes: ['Data unavailable'],
      evidence: [],
      finalEntry: 'Journal data could not be loaded.',
    };
  }
  
  // Extract behavioral hints - now safe to access
  const primaryManifestation = cameraManifestations[0]?.primary;
  const manifestationStr = primaryManifestation || 'faint_silhouette';
  const spiritBoxPersonality = Array.isArray(spiritBoxResponse.personality) 
    ? spiritBoxResponse.personality[0] 
    : spiritBoxResponse.personality;
  const responseRate = spiritBoxResponse.frequency || 0.5;
  
  // Get unique words for Spirit Box
  const uniqueWords = [
    ...(spiritBoxResponse.wordPools?.q1?.unique || []),
    ...(spiritBoxResponse.wordPools?.q2?.unique || []),
    ...(spiritBoxResponse.wordPools?.q3?.unique || []),
  ];
  const sampleWords = uniqueWords.slice(0, 3).join('. ') || 'unknown';
  
  // Parse the story from fieldJournal and convert it into detailed timestamped notes
  // Make them URGENT and PANICKED - agents writing during dangerous missions
  const storyText = fieldJournal.story;
  const notes: string[] = [];
  
  // Generate timestamps starting from evening (19:00-23:00 range)
  const baseHour = 19 + Math.floor(Math.random() * 4); // 19-22
  let currentMinute = Math.floor(Math.random() * 60);
  
  // Helper to get next timestamp
  const getNextTimestamp = () => {
    currentMinute += 15 + Math.floor(Math.random() * 30); // 15-45 minute intervals
    if (currentMinute >= 60) {
      const hourIncrement = Math.floor(currentMinute / 60);
      currentMinute = currentMinute % 60;
      const hour = baseHour + hourIncrement;
      return `${hour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
    }
    const hour = baseHour;
    return `${hour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
  };
  
  // Helper to add panic/urgency with strategic CAPS
  const addUrgency = (text: string, isUrgent: boolean = false): string => {
    if (!isUrgent) return text;
    
    // Add CAPS to key urgent/panicked words
    const urgentWords = [
      'spiked', 'spikes', 'haywire', 'fast', 'gone', 'missing', 'deceased', 'danger', 'warning',
      'wrong', 'impossible', 'can\'t', 'couldn\'t', 'won\'t', 'didn\'t', 'isn\'t', 'aren\'t',
      'constant', 'constantly', 'suddenly', 'immediately', 'instantly', 'quickly', 'rapidly',
      'suffocating', 'choking', 'burning', 'frozen', 'numb', 'desperate', 'terrified', 'afraid',
      'fear', 'panic', 'urgent', 'critical', 'extreme', 'deadly', 'lethal'
    ];
    
    urgentWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      text = text.replace(regex, (match) => {
        // Make it ALL CAPS for high/extreme threat
        if (threatLevel === 'EXTREME' || threatLevel === 'HIGH') {
          return match.toUpperCase();
        }
        // Sometimes capitalize for medium threat
        if (threatLevel === 'MEDIUM' && Math.random() > 0.6) {
          return match.toUpperCase();
        }
        return match;
      });
    });
    
    // Add urgency markers for extreme threat
    if (threatLevel === 'EXTREME') {
      // Capitalize key phrases
      text = text.replace(/\b(it|entity|thing|presence|here|there|close|near)\b/gi, (match) => {
        if (Math.random() > 0.4) return match.toUpperCase();
        return match;
      });
    }
    
    return text;
  };
  
  // Split story into paragraphs
  const storyParagraphs = storyText.split('\n\n').filter(p => p.trim());
  
  // Process each paragraph - break into sentences and add timestamps with URGENCY
  storyParagraphs.forEach((paragraph, pIndex) => {
    // Split into sentences, preserving the original text
    const sentences = paragraph.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 5);
    
    sentences.forEach((sentence, sIndex) => {
      const timestamp = getNextTimestamp();
      let note = sentence.trim();
      
      // Determine urgency based on content and threat level
      const isUrgent = threatLevel === 'EXTREME' || 
                       threatLevel === 'HIGH' || 
                       note.toLowerCase().includes('spiked') ||
                       note.toLowerCase().includes('haywire') ||
                       note.toLowerCase().includes('fast') ||
                       note.toLowerCase().includes('danger') ||
                       note.toLowerCase().includes('wrong') ||
                       note.toLowerCase().includes('impossible') ||
                       sIndex >= sentences.length - 1; // Last sentences are more urgent
      
      // Enhance the original story text with more panic and urgency
      // Make key moments more dramatic
      if (note.toLowerCase().includes('emf') || note.toLowerCase().includes('readings') || note.toLowerCase().includes('meter')) {
        // Add urgency to EMF readings
        if (spiritBoxPersonality === 'aggressive' && !note.toUpperCase().includes('SPIKED')) {
          note = note.replace(/(readings?|emf meter)/gi, (match) => {
            return `${match} that SPIKED EARLY`;
          });
          if (!note.includes('!')) note += '!';
        } else if (spiritBoxPersonality === 'chaotic' && !note.toUpperCase().includes('HAYWIRE')) {
          note = note.replace(/(readings?|emf meter)/gi, (match) => {
            return `${match} that went HAYWIRE`;
          });
          if (!note.includes('!')) note += '!';
        }
      }
      
      // Enhance Spirit Box word mentions with actual unique words from the ghost - MAKE THEM LOUD
      if (note.toLowerCase().includes('words') && sampleWords !== 'unknown') {
        // Check if there's a placeholder for words
        if (note.match(/words[^"]*["']([^"']+)["']/i)) {
          // Replace existing words with unique words - ALL CAPS for urgency
          note = note.replace(/["']([^"']+)["']/i, `"${sampleWords.toUpperCase()}"`);
        } else if (note.toLowerCase().includes('whispers') || note.toLowerCase().includes('picked up')) {
          // Add the words if not present - MAKE THEM LOUD AND URGENT
          note = note.replace(/(whispers|words|picked up)/i, (match) => {
            return `${match}. The words came through: "${sampleWords.toUpperCase()}"`;
          });
        }
      }
      
      // Enhance photo mentions with more panic
      if (note.toLowerCase().includes('photo') || note.toLowerCase().includes('image')) {
        if (manifestationStr === 'invisible' && !note.toUpperCase().includes('BLANK')) {
          note = note.replace(/(photo|photos|image)/gi, (match) => {
            return `${match} - EVERY SINGLE ONE CAME BACK BLANK`;
          });
        } else if (manifestationStr === 'screaming_face' && !note.toUpperCase().includes('FACE')) {
          note += ' I SAW ITS FACE. A SCREAMING FACE.';
        }
      }
      
      // Add PANIC markers for high/extreme threat
      if (isUrgent) {
        if (threatLevel === 'EXTREME') {
          // Add urgent prefix for extreme threats
          if (!note.toUpperCase().includes('FAST') && !note.toUpperCase().includes('DANGER') && !note.toUpperCase().includes('URGENT')) {
            note = `[URGENT] ${note}`;
          }
        }
        
        // Add exclamation for urgent moments - more frequent for extreme
        if (!note.endsWith('!') && !note.endsWith('?') && (threatLevel === 'EXTREME' ? Math.random() > 0.4 : Math.random() > 0.7)) {
          note += '!';
        }
      }
      
      // Add timestamp prefix with urgency
      note = `${timestamp} - ${note}`;
      
      // Apply urgency formatting - add CAPS for panic
      note = addUrgency(note, isUrgent);
      
      notes.push(note);
    });
  });
  
  // Ensure we have at least 7-8 detailed notes for a rich journal entry
  // Add behavioral detail notes if needed
  if (notes.length < 7) {
    const additionalNotes: string[] = [];
    
    // Add EMF detail note if not already covered - MAKE IT URGENT
    if (!notes.some(n => n.toLowerCase().includes('emf') || n.toLowerCase().includes('readings'))) {
      const timestamp = getNextTimestamp();
      if (spiritBoxPersonality === 'aggressive') {
        additionalNotes.push(`${timestamp} - My EMF meter SPIKED EARLY, before I was even close. This entity was AGGRESSIVE, announcing its presence like a WARNING. The readings jumped to 4, then 5. TOO FAST. TOO DELIBERATE.`);
      } else if (spiritBoxPersonality === 'shy') {
        additionalNotes.push(`${timestamp} - It took me HOURS to find it. My EMF meter stayed low, barely registering anything even when I knew I was in the right area. I had to get UNCOMFORTABLY CLOSE before the readings SPIKED. Shy. Elusive.`);
      } else if (spiritBoxPersonality === 'chaotic') {
        additionalNotes.push(`${timestamp} - The EMF meter went HAYWIRE. One second it was at 2, the next it SPIKED to 5, then dropped to 1. I couldn't get a stable reading. UNSTABLE. CHAOTIC. The entity was moving CONSTANTLY, or the readings were just... WRONG.`);
      } else if (spiritBoxPersonality === 'contradictory') {
        additionalNotes.push(`${timestamp} - My EMF meter readings oscillated in a PERFECT sine wave. Up, down, up, down. TOO PERFECT. TOO DELIBERATE. MISCHIEVOUS. It was PLAYING with me from the start.`);
      }
    }
    
    // Add Spirit Box detail if not covered - MAKE IT URGENT
    if (!notes.some(n => n.toLowerCase().includes('spirit box'))) {
      const timestamp = getNextTimestamp();
      if (responseRate < 0.4) {
        additionalNotes.push(`${timestamp} - The Spirit Box took FOREVER to tune. I had to adjust both knobs CAREFULLY until the static cleared. Once I locked the signal, the words came through: "${sampleWords.toUpperCase()}." The voice was weak, distant, like it DIDN'T WANT TO BE HEARD.`);
      } else if (responseRate > 0.7) {
        additionalNotes.push(`${timestamp} - The Spirit Box responded QUICKLY. The words HIT ME like a PHYSICAL FORCE: "${sampleWords.toUpperCase()}." It WANTED me to hear. It WANTED me to KNOW.`);
      } else {
        additionalNotes.push(`${timestamp} - The Spirit Box cut through the CHAOS with static peaks. Words: "${sampleWords.toUpperCase()}." The signal kept DRIFTING, chaotic modulation. I'd lock it, then it would SLIP AWAY.`);
      }
    }
    
    // Add camera detail if not covered - MAKE IT PANICKED
    if (!notes.some(n => n.toLowerCase().includes('photo') || n.toLowerCase().includes('image') || n.toLowerCase().includes('camera'))) {
      const timestamp = getNextTimestamp();
      if (manifestationStr === 'faint_silhouette') {
        additionalNotes.push(`${timestamp} - When I finally got close enough to take a photo, I could BARELY make out a shape. Just a FAINT outline, like smoke caught in the flash. The image developed and THERE IT WAS - barely visible, but UNMISTAKABLY THERE.`);
      } else if (manifestationStr === 'motion_blur') {
        additionalNotes.push(`${timestamp} - When I tried to photograph it, the image came out as PURE MOTION BLUR. Like it was moving SO FAST the camera COULDN'T CAPTURE IT. DISTORTED. CHAOTIC.`);
      } else if (manifestationStr === 'screaming_face') {
        additionalNotes.push(`${timestamp} - When I took the photo, I SAW ITS FACE. A SCREAMING, ANGUISHED FACE frozen in the flash. The image BURNED INTO MY MIND. I can STILL SEE IT when I close my eyes.`);
      } else if (manifestationStr === 'invisible') {
        additionalNotes.push(`${timestamp} - I took SEVEN photos. SEVEN. Every single one came back BLANK. Just the empty room, as if NOTHING was there. But I could FEEL IT. The weight of its presence was SUFFOCATING.`);
      } else if (manifestationStr === 'half_formed_body') {
        additionalNotes.push(`${timestamp} - When I finally photographed it, the image showed a HALF-FORMED BODY. Not quite solid, not quite transparent. Like it was caught BETWEEN WORLDS, trying to HIDE even from the camera.`);
      } else if (manifestationStr === 'shadow_silhouette') {
        additionalNotes.push(`${timestamp} - When I photographed it, the image showed a SHADOW. Not a shadow cast by something - the shadow WAS THE THING. A silhouette of PURE DARKNESS, denser than the surrounding GLOOM.`);
      } else if (manifestationStr === 'glitch_streaks') {
        additionalNotes.push(`${timestamp} - Every photo came out as GLITCH STREAKS, like it was moving just as I pressed the shutter. Or maybe it was INTERFERING with the camera itself. I COULDN'T TELL what was REAL anymore.`);
      } else if (manifestationStr === 'faint_glitch') {
        additionalNotes.push(`${timestamp} - On my EIGHTH photo, I caught a FAINT GLITCH in the corner. Just a FLICKER. PROOF it was there, REFUSING TO BE SEEN.`);
      }
    }
    
    // Add thermal detail if not covered - MAKE IT URGENT
    if (!notes.some(n => n.toLowerCase().includes('cold') || n.toLowerCase().includes('thermal'))) {
      const timestamp = getNextTimestamp();
      if (thermalReading === 'deep_cold') {
        additionalNotes.push(`${timestamp} - The COLD HIT ME FIRST. Not just cold - BONE-DEEP, UNNATURAL COLD. My thermal scanner read 4°C, then 2°C, then BELOW ZERO. My breath turned to FOG INSTANTLY. My hands went NUMB.`);
      } else if (thermalReading === 'cold_spot') {
        additionalNotes.push(`${timestamp} - My thermal scanner picked up COLD SPOTS appearing and disappearing RANDOMLY. Temperature would PLUMMET, then return to normal seconds later. NO PATTERN. NO LOGIC.`);
      }
    }
    
    // Add movement/behavior notes based on personality - MAKE THEM PANICKED
    if (notes.length + additionalNotes.length < 8) {
      const timestamp = getNextTimestamp();
      if (spiritBoxPersonality === 'aggressive') {
        additionalNotes.push(`${timestamp} - Movement is FAST. VERY FAST. I CAN'T KEEP UP.`);
        if (notes.length + additionalNotes.length < 9) {
          additionalNotes.push(`${getNextTimestamp()} - My equipment STRUGGLES to track it. One moment HERE, the next GONE. IMPOSSIBLE TO FOLLOW.`);
        }
      } else if (spiritBoxPersonality === 'shy') {
        additionalNotes.push(`${timestamp} - Something about its RELUCTANCE to be seen made me DEEPLY UNCOMFORTABLE. What is it HIDING FROM?`);
      } else if (spiritBoxPersonality === 'chaotic') {
        additionalNotes.push(`${timestamp} - Equipment started MALFUNCTIONING. My flashlight FLICKERED. The EMF display GLITCHED. I got out before it could do WORSE.`);
      } else if (spiritBoxPersonality === 'contradictory') {
        additionalNotes.push(`${timestamp} - Cold spots appeared BEHIND ME. ALWAYS BEHIND ME. I'd turn around and they'd be GONE.`);
        if (notes.length + additionalNotes.length < 9) {
          additionalNotes.push(`${getNextTimestamp()} - Through the Spirit Box, between the drifts, I heard: "${sampleWords.toUpperCase()}." I left when I realized I was LAUGHING. NOT BECAUSE ANYTHING WAS FUNNY.`);
        }
      }
    }
    
    // Insert additional notes at appropriate positions (mix them in, don't just append)
    additionalNotes.forEach((additionalNote, idx) => {
      const insertIndex = Math.min(notes.length - 1, Math.floor(notes.length / 2) + idx);
      notes.splice(insertIndex, 0, additionalNote);
    });
  }
  
  // Generate detailed evidence list based on behaviors
  const evidence: string[] = [];
  
  // EMF evidence with descriptive names
  if (spiritBoxPersonality === 'aggressive') {
    evidence.push('Aggressive EMF Spikes');
  } else if (spiritBoxPersonality === 'shy') {
    evidence.push('Shy EMF Readings');
  } else if (spiritBoxPersonality === 'chaotic') {
    evidence.push('Unstable EMF');
  } else if (spiritBoxPersonality === 'contradictory') {
    evidence.push('Mischievous EMF Pattern');
  }
  
  // Camera manifestation evidence
  if (manifestationStr === 'faint_silhouette') {
    evidence.push('Faint Silhouette');
  } else if (manifestationStr === 'motion_blur') {
    evidence.push('Motion Blur');
  } else if (manifestationStr === 'screaming_face') {
    evidence.push('Screaming Face');
  } else if (manifestationStr === 'invisible') {
    evidence.push('Invisible');
  } else if (manifestationStr === 'half_formed_body') {
    evidence.push('Half-Formed Body');
  } else if (manifestationStr === 'shadow_silhouette') {
    evidence.push('Shadow Silhouette');
  } else if (manifestationStr === 'glitch_streaks') {
    evidence.push('Glitch Streaks');
  } else if (manifestationStr === 'faint_glitch') {
    evidence.push('Faint Glitch');
  }
  
  // Thermal evidence
  if (thermalReading === 'deep_cold') {
    evidence.push('Deep Cold');
  } else if (thermalReading === 'cold_spot') {
    evidence.push('Cold Spots');
  }
  
  // Add Spirit Box evidence based on response rate
  if (responseRate < 0.4) {
    evidence.push('Weak Whispers');
  } else if (responseRate > 0.7) {
    evidence.push('Strong Communication');
  } else {
    evidence.push('Static Peaks');
  }
  
  // Determine agent status based on threat level and fate
  let agentStatus: 'MISSING' | 'DECEASED' | 'RETIRED' | 'ACTIVE' = 'ACTIVE';
  if (fieldJournal.fate === 'deceased') {
    agentStatus = 'DECEASED';
  } else if (fieldJournal.fate === 'missing') {
    agentStatus = 'MISSING';
  } else if (fieldJournal.fate === 'traumatized') {
    agentStatus = threatLevel === 'EXTREME' ? 'DECEASED' : 'RETIRED';
  } else {
    agentStatus = 'RETIRED';
  }
  
  // Generate final timestamp
  const finalTimestamp = getNextTimestamp();
  
  // Generate detailed final entry
  let finalEntry = '';
  if (agentStatus === 'DECEASED') {
    finalEntry = `Agent ${fieldJournal.agentName} found deceased at ${finalTimestamp}. Cause of death: Unknown. File marked DECEASED. Note: Classic ${name} behavior - ${evidence.slice(0, 3).join(', ').toLowerCase()}. ${threatLevel === 'EXTREME' ? 'Extreme danger.' : 'High danger.'}`;
  } else if (agentStatus === 'MISSING') {
    finalEntry = `Agent ${fieldJournal.agentName} failed to check in at ${finalTimestamp}. Search team found this journal. No sign of agent. File marked MISSING. Note: Classic ${name} behavior - ${evidence.slice(0, 3).join(', ').toLowerCase()}.`;
  } else if (agentStatus === 'RETIRED') {
    finalEntry = `Agent ${fieldJournal.agentName} submitted transfer request. Experiencing ${fieldJournal.fate === 'traumatized' ? 'severe psychological trauma' : 'disorientation'}. File marked RETIRED. Note: Entity exhibits ${evidence.slice(0, 2).join(' and ').toLowerCase()} - approach with caution.`;
  } else {
    finalEntry = `Agent ${fieldJournal.agentName} completed investigation. File marked ACTIVE. Note: Classic ${name} behavior - ${evidence.slice(0, 3).join(', ').toLowerCase()}.`;
  }
  
  // Generate location name based on ghost type
  const locationMap: Record<GhostType, string> = {
    [GhostType.WRAITH]: 'Whitmore Estate',
    [GhostType.SHADE]: 'Oakwood Cemetery',
    [GhostType.POLTERGEIST]: 'Hillcrest Manor',
    [GhostType.BANSHEE]: 'Ravenwood Asylum',
    [GhostType.PHANTOM]: 'Blackwater Mill',
    [GhostType.ONYX]: 'Shadowbrook Mansion',
    [GhostType.TRICKSTER]: 'Old Harbor Lighthouse',
  };
  const location = locationMap[id] || `Investigation Site ${id}`;
  
  return {
    id: `journal-${id}`,
    date: fieldJournal.date,
    location,
    agentName: fieldJournal.agentName,
    agentStatus,
    threatLevel,
    notes,
    evidence,
    photos: ghostImageMap[id] ? [ghostImageMap[id]] : undefined,
    finalEntry,
  };
}

// This will be populated when the app initializes
export let MOCK_JOURNALS: JournalEntry[] = [];

// Function to initialize journals from ghost store
// Call this when the app loads or when ghost store is available
export function initializeJournalsFromGhostStore(getAllGhosts: () => GhostData[]): void {
  try {
    const ghosts = getAllGhosts();
    if (!ghosts || ghosts.length === 0) {
      console.warn('⚠️ No ghosts found in store, skipping journal initialization');
      return;
    }
    
    console.log('📚 Initializing journals from', ghosts.length, 'ghosts');
    
    // Log first ghost to debug structure
    if (ghosts[0]) {
      console.log('📋 Sample ghost structure:', {
        id: ghosts[0].id,
        name: ghosts[0].name,
        hasFieldJournal: !!ghosts[0].fieldJournal,
        hasSpiritBoxResponse: !!ghosts[0].spiritBoxResponse,
        hasCameraManifestations: !!ghosts[0].cameraManifestations,
        hasThermalReading: !!ghosts[0].thermalReading,
        fieldJournalKeys: ghosts[0].fieldJournal ? Object.keys(ghosts[0].fieldJournal) : [],
        spiritBoxResponseKeys: ghosts[0].spiritBoxResponse ? Object.keys(ghosts[0].spiritBoxResponse) : [],
      });
    }
    
    MOCK_JOURNALS = ghosts
      .filter(ghost => ghost && ghost.id) // Filter out invalid ghosts
      .map(ghost => {
        try {
          const journal = createJournalEntryFromGhost(ghost);
          console.log(`✅ Created journal for ${ghost.id}:`, {
            id: journal.id,
            notesCount: journal.notes.length,
            evidenceCount: journal.evidence.length,
          });
          return journal;
        } catch (error) {
          console.error(`❌ Failed to create journal for ghost ${ghost.id}:`, error);
          return null;
        }
      })
      .filter((journal): journal is JournalEntry => journal !== null); // Remove null entries
    
    console.log(`📚 Initialized ${MOCK_JOURNALS.length} field journals from ghost store`);
    if (MOCK_JOURNALS.length > 0) {
      console.log('📖 Sample journal:', {
        id: MOCK_JOURNALS[0].id,
        notes: MOCK_JOURNALS[0].notes.length,
        evidence: MOCK_JOURNALS[0].evidence,
      });
    }
  } catch (error) {
    console.error('❌ Failed to initialize journals from ghost store:', error);
  }
}

// Helper to get journal by ID
export function getJournalById(id: string): JournalEntry | undefined {
  return MOCK_JOURNALS.find((j) => j.id === id);
}
