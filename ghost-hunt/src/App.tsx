import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { GameStateProvider } from './context/GameStateContext';
import { MapDataProvider } from './context/MapDataContext';
import { SuppliesProvider } from './context/SuppliesContext';
import { MapRootScreen } from './screens/MapRootScreen';
import { InventoryScreen } from './screens/InventoryScreen';
import { CodexScreen } from './screens/CodexScreen';
import { ProfilePanel } from './screens/ProfilePanel';
import { ProfilePanelHorror } from './screens/ProfilePanelHorror';
import { InvestigationScreen } from './screens/InvestigationScreen';
import { ProfileButton } from './components/HUD/ProfileButton';
import { BackpackMenu } from './components/HUD/BackpackMenu';
import { ClippyAssistant } from './components/HUD/ClippyAssistant';
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
          />
        </div>
        <ClippyAssistant />
      </HUDContainer>
    </>
  );
}

function ScreenLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <>
      {children}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'fixed',
          top: '10px',
          left: '10px',
          zIndex: 1000,
        }}
      >
        ← Back to Map
      </button>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <SuppliesProvider>
        <GameStateProvider>
          <MapDataProvider>
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
                  path="/profile-horror"
                  element={<ProfilePanelHorror />}
                />
                <Route path="/investigate/:hotspotId" element={<InvestigationScreen />} />
                <Route path="/playground" element={<PlaygroundRouter />} />
                <Route path="/analog-horror" element={<AnalogHorrorPlayground />} />
              </Routes>
            </div>
          </MapDataProvider>
        </GameStateProvider>
      </SuppliesProvider>
    </BrowserRouter>
  );
}

export default App;
