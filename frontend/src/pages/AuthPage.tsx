import { Navigate } from 'react-router-dom';
import { AuthForm } from '../components/auth/AuthForm';
import { useAuth } from '../context/auth.context';

export function AuthPage() {
  const { user } = useAuth();

  if (user) return <Navigate to="/vault" replace />;

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <AuthForm />
    </main>
  );
}
