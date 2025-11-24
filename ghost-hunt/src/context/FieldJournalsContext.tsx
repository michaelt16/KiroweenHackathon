// Field Journals Context - manages collected field journals
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { JournalEntry } from '../types/game';

const STORAGE_KEY = 'ghost-hunt-field-journals';

interface FieldJournalsContextType {
  collectedJournals: JournalEntry[];
  addJournal: (journal: JournalEntry) => void;
  hasJournal: (journalId: string) => boolean;
  resetJournals: () => void;
}

const FieldJournalsContext = createContext<FieldJournalsContextType | undefined>(undefined);

// Debounced save to localStorage
let saveTimeout: ReturnType<typeof setTimeout>;
const saveJournals = (journals: JournalEntry[]) => {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(journals));
      console.log('💾 Field journals saved:', journals.length);
    } catch (error) {
      console.error('Failed to save field journals:', error);
    }
  }, 300);
};

// Load journals from localStorage
const loadJournals = (): JournalEntry[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      console.log('📚 Field journals loaded:', parsed.length);
      return parsed;
    }
  } catch (error) {
    console.error('Failed to load field journals:', error);
  }
  return [];
};

export function FieldJournalsProvider({ children }: { children: ReactNode }) {
  const [collectedJournals, setCollectedJournals] = useState<JournalEntry[]>(loadJournals);

  // Save to localStorage whenever journals change
  useEffect(() => {
    saveJournals(collectedJournals);
  }, [collectedJournals]);

  const addJournal = useCallback((journal: JournalEntry) => {
    setCollectedJournals((prev) => {
      // Check if journal already exists
      if (prev.some((j) => j.id === journal.id)) {
        console.log('📚 Journal already collected:', journal.id);
        return prev;
      }
      const newJournals = [...prev, journal];
      console.log(`📚 Added journal: ${journal.id}. Total: ${newJournals.length}`);
      return newJournals;
    });
  }, []);

  const hasJournal = useCallback((journalId: string) => {
    return collectedJournals.some((j) => j.id === journalId);
  }, [collectedJournals]);

  const resetJournals = useCallback(() => {
    console.log('🔄 Resetting field journals');
    setCollectedJournals([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <FieldJournalsContext.Provider
      value={{
        collectedJournals,
        addJournal,
        hasJournal,
        resetJournals,
      }}
    >
      {children}
    </FieldJournalsContext.Provider>
  );
}

export function useFieldJournals() {
  const context = useContext(FieldJournalsContext);
  if (!context) {
    throw new Error('useFieldJournals must be used within FieldJournalsProvider');
  }
  return context;
}


