import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { GameStateProvider } from './context/GameStateContext';
import { MapDataProvider } from './context/MapDataContext';
import { SuppliesProvider } from './context/SuppliesContext';
import { FieldJournalsProvider } from './context/FieldJournalsContext';
import { MapRootScreen } from './screens/MapRootScreen';
import { InventoryScreen } from './screens/InventoryScreen';
import { CodexScreen } from './screens/CodexScreen';
import { ProfilePanel } from './screens/ProfilePanel';
import { FieldJournalsScreen } from './screens/FieldJournalsScreen';
import { ProfilePanelHorror } from './screens/ProfilePanelHorror';
import { InvestigationScreen } from './screens/InvestigationScreen';
import { ProfileButton } from './components/HUD/ProfileButton';
import { BackpackMenu } from './components/HUD/BackpackMenu';
import { FloatingClippy } from './components/HUD/FloatingClippy';
import { HUDContainer } from './components/HUD/HUDContainer';
import { PlaygroundRouter } from './ui-playground/PlaygroundRouter';
import { AnalogHorrorPlayground } from './ui-playground/AnalogHorrorPlayground';
import './App.css';

function MapLayout() {
  const navigate = useNavigate();

  return (
    <>
      <MapRootScreen />
      <HUDContainer>
        <ProfileButton onOpenProfile={() => navigate('/profile')} />
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
          <BackpackMenu
            onOpenInventory={() => navigate('/inventory')}
            onOpenCodex={() => navigate('/codex')}
            onOpenFieldJournals={() => navigate('/field-journals')}
          />
        </div>
        {/* Placeholder to maintain three-column layout alignment */}
        <div style={{ width: '80px', pointerEvents: 'none' }} />
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
  
  // Hide Clippy in investigation mode
  const isInvestigationMode = location.pathname.startsWith('/investigate/');
  
  return (
    <div className="app">
      {/* Floating Clippy - Appears on all pages except investigation mode */}
      {!isInvestigationMode && <FloatingClippy />}
      
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
                <Route path="/investigate/:hotspotId" element={<InvestigationScreen />} />
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
