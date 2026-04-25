import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/auth.context';

export function Navbar({ reduced, onToggleReduced }: { reduced: boolean; onToggleReduced: () => void }) {
  const { user, signout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-forest-900/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-lg font-semibold tracking-wide text-glow">Verdant Mythic Vault</Link>
        <div className="flex items-center gap-6 text-sm">
          <NavLink to="/" className="hover:text-glow">Landing</NavLink>
          <NavLink to="/vault" className="hover:text-glow">Generator & Vault</NavLink>
          <button onClick={onToggleReduced} className="rounded-full border border-white/20 px-3 py-1">
            Motion: {reduced ? 'Reduced' : 'Full'}
          </button>
          {user ? (
            <>
              <span className="text-emerald-200">{user.displayName}</span>
              <button onClick={() => void signout()} className="rounded-full bg-white/10 px-3 py-1 hover:bg-white/20">Sign out</button>
            </>
          ) : (
            <NavLink to="/auth" className="rounded-full bg-emerald-400/20 px-3 py-1 text-emerald-100">Sign in</NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}
