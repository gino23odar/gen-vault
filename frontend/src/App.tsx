import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { AuthProvider } from './context/auth.context';
import { useReducedMotionMode } from './hooks/useReducedMotionMode';
import { AuthPage } from './pages/AuthPage';
import { LandingPage } from './pages/LandingPage';
import { VaultPage } from './pages/VaultPage';
import { ProtectedRoute } from './components/ui/ProtectedRoute';

export default function App() {
  const { isReduced, setReduced } = useReducedMotionMode();

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar reduced={isReduced} onToggleReduced={() => setReduced((v) => !v)} />
        <Routes>
          <Route path="/" element={<LandingPage reduced={isReduced} />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/vault"
            element={
              <ProtectedRoute>
                <VaultPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
