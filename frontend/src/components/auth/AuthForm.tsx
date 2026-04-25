import { FormEvent, useState } from 'react';
import { useAuth } from '../../context/auth.context';

export function AuthForm() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { signin, signup } = useAuth();

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === 'signin') await signin(email, password);
      else await signup(email, password, displayName);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="glass mx-auto max-w-md space-y-4 rounded-2xl p-6 shadow-aura">
      <h2 className="text-xl font-semibold">{mode === 'signin' ? 'Sign in' : 'Create account'}</h2>
      {mode === 'signup' && (
        <input className="w-full rounded-lg border border-white/20 bg-black/20 p-3" placeholder="Display name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
      )}
      <input className="w-full rounded-lg border border-white/20 bg-black/20 p-3" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input className="w-full rounded-lg border border-white/20 bg-black/20 p-3" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      {error && <p className="text-red-300">{error}</p>}
      <button disabled={loading} className="w-full rounded-lg bg-emerald-400/30 p-3 font-medium hover:bg-emerald-400/40">
        {loading ? 'Please wait...' : mode === 'signin' ? 'Sign in' : 'Sign up'}
      </button>
      <button type="button" onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')} className="text-sm text-emerald-200">
        {mode === 'signin' ? 'Need an account? Sign up' : 'Have an account? Sign in'}
      </button>
    </form>
  );
}
