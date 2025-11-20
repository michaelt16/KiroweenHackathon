// Supplies context - manages Field Kit resources
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

export interface Supplies {
  film: number;
  boosts: number;
  charms: number;
}

const STARTER_KIT: Supplies = {
  film: 3,
  boosts: 1,
  charms: 0,
};

const STORAGE_KEY = 'ghost-hunt-supplies';

interface SuppliesContextType {
  supplies: Supplies;
  addFilm: (amount: number) => void;
  addBoost: () => void;
  addCharm: () => void;
  consumeFilm: () => boolean;
  consumeBoost: () => void;
  consumeCharm: () => void;
  resetSupplies: () => void;
  maxSupplies: () => void;
}

const SuppliesContext = createContext<SuppliesContextType | undefined>(undefined);

// Debounced save to localStorage
let saveTimeout: ReturnType<typeof setTimeout>;
const saveSupplies = (supplies: Supplies) => {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(supplies));
      console.log('💾 Supplies saved:', supplies);
    } catch (error) {
      console.error('Failed to save supplies:', error);
    }
  }, 300);
};

// Load supplies from localStorage
const loadSupplies = (): Supplies => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      console.log('📦 Supplies loaded:', parsed);
      return parsed;
    }
  } catch (error) {
    console.error('Failed to load supplies:', error);
  }
  console.log('🎁 Initializing with starter kit:', STARTER_KIT);
  return { ...STARTER_KIT };
};

export function SuppliesProvider({ children }: { children: ReactNode }) {
  const [supplies, setSupplies] = useState<Supplies>(loadSupplies);

  // Save to localStorage whenever supplies change
  useEffect(() => {
    saveSupplies(supplies);
  }, [supplies]);

  const addFilm = useCallback((amount: number) => {
    setSupplies((prev) => {
      const newSupplies = { ...prev, film: prev.film + amount };
      console.log(`🎞️ Added ${amount} film. Total: ${newSupplies.film}`);
      return newSupplies;
    });
  }, []);

  const addBoost = useCallback(() => {
    setSupplies((prev) => {
      const newSupplies = { ...prev, boosts: prev.boosts + 1 };
      console.log(`⚡ Added boost. Total: ${newSupplies.boosts}`);
      return newSupplies;
    });
  }, []);

  const addCharm = useCallback(() => {
    setSupplies((prev) => {
      const newSupplies = { ...prev, charms: prev.charms + 1 };
      console.log(`🔮 Added charm. Total: ${newSupplies.charms}`);
      return newSupplies;
    });
  }, []);

  const consumeFilm = useCallback((): boolean => {
    let success = false;
    setSupplies((prev) => {
      if (prev.film > 0) {
        success = true;
        const newSupplies = { ...prev, film: prev.film - 1 };
        console.log(`📸 Consumed film. Remaining: ${newSupplies.film}`);
        return newSupplies;
      }
      console.warn('⚠️ No film available');
      return prev;
    });
    return success;
  }, []);

  const consumeBoost = useCallback(() => {
    setSupplies((prev) => {
      if (prev.boosts > 0) {
        const newSupplies = { ...prev, boosts: prev.boosts - 1 };
        console.log(`⚡ Consumed boost. Remaining: ${newSupplies.boosts}`);
        return newSupplies;
      }
      return prev;
    });
  }, []);

  const consumeCharm = useCallback(() => {
    setSupplies((prev) => {
      if (prev.charms > 0) {
        const newSupplies = { ...prev, charms: prev.charms - 1 };
        console.log(`🔮 Consumed charm. Remaining: ${newSupplies.charms}`);
        return newSupplies;
      }
      return prev;
    });
  }, []);

  const resetSupplies = useCallback(() => {
    console.log('🔄 Resetting supplies to starter kit');
    setSupplies({ ...STARTER_KIT });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const maxSupplies = useCallback(() => {
    console.log('🚀 Setting all supplies to 99 (Dev Mode)');
    setSupplies({ film: 99, boosts: 99, charms: 99 });
  }, []);

  return (
    <SuppliesContext.Provider
      value={{
        supplies,
        addFilm,
        addBoost,
        addCharm,
        consumeFilm,
        consumeBoost,
        consumeCharm,
        resetSupplies,
        maxSupplies,
      }}
    >
      {children}
    </SuppliesContext.Provider>
  );
}

export function useSupplies() {
  const context = useContext(SuppliesContext);
  if (!context) {
    throw new Error('useSupplies must be used within SuppliesProvider');
  }
  return context;
}
