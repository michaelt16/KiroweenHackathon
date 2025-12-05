import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { GameStateProvider } from './context/GameStateContext';
import { MapDataProvider } from './context/MapDataContext';
import { SuppliesProvider } from './context/SuppliesContext';
import { FieldJournalsProvider } from './context/FieldJournalsContext';
// Lazy load heavy screens for better performance
import { lazy, Suspense } from 'react';
import { MapRootScreen } from './screens/MapRootScreen';
import { InventoryScreen } from './screens/InventoryScreen';
import { CodexScreen } from './screens/CodexScreen';
import { ProfilePanel } from './screens/ProfilePanel';
import { FieldJournalsScreen } from './screens/FieldJournalsScreen';
import { ProfilePanelHorror } from './screens/ProfilePanelHorror';

// Lazy load the heaviest screen (InvestigationScreen)
const InvestigationScreen = lazy(() => import('./screens/InvestigationScreen').then(module => ({ default: module.InvestigationScreen })));
import { ProfileButton } from './components/HUD/ProfileButton';
import { BackpackMenu } from './components/HUD/BackpackMenu';
import { FloatingPengu } from './components/HUD/FloatingClippy';
import { HUDContainer } from './components/HUD/HUDContainer';
import { PlaygroundRouter } from './ui-playground/PlaygroundRouter';
import { AnalogHorrorPlayground } from './ui-playground/AnalogHorrorPlayground';
import { useGhostStore } from './stores/ghostStore';
import { initializeJournalsFromGhostStore } from './data/fieldJournals';
import { playBackgroundMusic, musicManager } from './utils/musicManager';
import lobbyMusic from './assets/music/lobby.mp3';
import './App.css';

function MapLayout() {
  const navigate = useNavigate();

  return (
    <>
      <MapRootScreen />
      <HUDContainer>
        <div style={{ display: 'flex', alignItems: 'flex-end', pointerEvents: 'auto' }}>
          <ProfileButton onOpenProfile={() => navigate('/profile')} />
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', background: 'transparent' }}>
          <BackpackMenu
            onOpenInventory={() => navigate('/inventory')}
            onOpenCodex={() => navigate('/codex')}
            onOpenFieldJournals={() => navigate('/field-journals')}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', pointerEvents: 'auto' }}>
          <FloatingPengu />
        </div>
      </HUDContainer>
    </>
  );
}

function ScreenLayout({ children }: { children: React.ReactNode }) {
  // ScreenLayout now just wraps children - back button is handled per screen
  return <>{children}</>;
}

function AppContent() {
  const location = useLocation();
  const getAllGhosts = useGhostStore((state) => state.getAllGhosts);
  
  // Initialize background music on mount
  useEffect(() => {
    // Start background music (will respect mute state from localStorage)
    // Note: Autoplay may be blocked by browser, music will start on first user interaction
    playBackgroundMusic(lobbyMusic, true);
    
    // Ensure music plays on first user interaction (handles autoplay policy)
    const handleFirstInteraction = () => {
      // Music manager will handle resume if it was paused due to autoplay policy
      musicManager.resumeMusic();
    };
    
    // Add listeners for user interaction
    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('touchstart', handleFirstInteraction, { once: true });
    document.addEventListener('keydown', handleFirstInteraction, { once: true });
    
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);
  
  // Initialize journals from ghost store on mount
  // Use a delay to ensure store is fully rehydrated from localStorage
  useEffect(() => {
    // Try multiple times to ensure store is ready
    const tryInitialize = (attempt = 1) => {
      try {
        const ghosts = getAllGhosts();
        // Check if we have valid ghost data
        if (ghosts && ghosts.length > 0 && ghosts[0]?.spiritBoxResponse && ghosts[0]?.fieldJournal) {
          console.log('✅ Store is ready, initializing journals...');
          initializeJournalsFromGhostStore(getAllGhosts);
        } else if (attempt < 5) {
          // Retry after delay if data not ready
          console.log(`⏳ Store not ready yet, retrying (attempt ${attempt}/5)...`);
          setTimeout(() => tryInitialize(attempt + 1), 200);
        } else {
          console.error('❌ Store never became ready after 5 attempts');
        }
      } catch (error) {
        console.error('Failed to initialize journals:', error);
      }
    };
    
    // Start with initial delay
    const timer = setTimeout(() => tryInitialize(), 300);
    
    return () => clearTimeout(timer);
  }, [getAllGhosts]);
  
  return (
    <div className="app">
      <Routes>
                <Route path="/" element={<MapLayout />} />
                <Route
                  path="/inventory"
                  element={
                    <ScreenLayout>
                      <InventoryScreen />
                    </ScreenLayout>
                  }
                />
                <Route
                  path="/codex"
                  element={
                    <ScreenLayout>
                      <CodexScreen />
                    </ScreenLayout>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ScreenLayout>
                      <ProfilePanel />
                    </ScreenLayout>
                  }
                />
                <Route
                  path="/field-journals"
                  element={
                    <ScreenLayout>
                      <FieldJournalsScreen />
                    </ScreenLayout>
                  }
                />
                <Route
                  path="/profile-horror"
                  element={<ProfilePanelHorror />}
                />
                <Route 
                  path="/investigate/:hotspotId" 
                  element={
                    <Suspense fallback={
                      <div style={{
                        width: '100vw',
                        height: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#1a0f0a',
                        color: '#f4f0e6',
                        fontFamily: '"Courier New", monospace',
                      }}>
                        Loading Investigation...
                      </div>
                    }>
                      <InvestigationScreen />
                    </Suspense>
                  } 
                />
                <Route path="/playground" element={<PlaygroundRouter />} />
                <Route path="/analog-horror" element={<AnalogHorrorPlayground />} />
              </Routes>
            </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <FieldJournalsProvider>
        <SuppliesProvider>
          <GameStateProvider>
            <MapDataProvider>
              <AppContent />
            </MapDataProvider>
          </GameStateProvider>
        </SuppliesProvider>
      </FieldJournalsProvider>
    </BrowserRouter>
  );
}

export default App;
