// frontend/src/components/AuthPage.tsx
import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
 
type Mode = 'login' | 'signup';
 
export function AuthPage({ mode: initialMode }: { mode: Mode }) {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
 
  const [mode, setMode]       = useState<Mode>(initialMode);
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
 
  const isLogin = mode === 'login';
 
  const toggle = () => {
    setMode(isLogin ? 'signup' : 'login');
    setError('');
    setName(''); setEmail(''); setPassword(''); setConfirm('');
  };
 
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
 
    if (!isLogin && password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    if (!isLogin && password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
 
    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
      navigate('/upload');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0E1627',
        fontFamily: "'DM Sans', sans-serif",
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          height: '68px',
          borderBottom: '1px solid rgba(189,184,185,0.15)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 32px',
        }}
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div
            style={{
              width: '28px', height: '28px',
              backgroundColor: '#7F6269',
              borderRadius: '6px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 2h7l3 3v9H3V2z" stroke="#F4E1E0" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M10 2v3h3" stroke="#F4E1E0" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M5 8h6M5 11h4" stroke="#F4E1E0" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '22px', color: '#F4E1E0' }}>
            ResuFlow
          </span>
        </Link>
      </nav>
 
      {/* Card */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 16px',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '440px',
            backgroundColor: 'rgba(189,184,185,0.04)',
            border: '1px solid rgba(189,184,185,0.15)',
            borderRadius: '24px',
            padding: '40px 36px',
          }}
        >
          {/* Heading */}
          <h1
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: '30px',
              color: '#F4E1E0',
              marginBottom: '6px',
              textAlign: 'center',
            }}
          >
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h1>
          <p style={{ color: '#BDB8B9', fontSize: '14px', textAlign: 'center', marginBottom: '32px' }}>
            {isLogin
              ? 'Sign in to access your portfolios'
              : 'Start building your portfolio in minutes'}
          </p>
 
          {/* Error */}
          {error && (
            <div
              style={{
                backgroundColor: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: '10px',
                padding: '12px 16px',
                color: '#fca5a5',
                fontSize: '13px',
                marginBottom: '20px',
                textAlign: 'center',
              }}
            >
              {error}
            </div>
          )}
 
          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Name — signup only */}
            {!isLogin && (
              <div>
                <label style={labelStyle}>Full Name</label>
                <input
                  type="text"
                  placeholder="Zahra Hammad"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = '#7F6269')}
                  onBlur={(e)  => (e.target.style.borderColor = 'rgba(189,184,185,0.2)')}
                />
              </div>
            )}
 
            {/* Email */}
            <div>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = '#7F6269')}
                onBlur={(e)  => (e.target.style.borderColor = 'rgba(189,184,185,0.2)')}
              />
            </div>
 
            {/* Password */}
            <div>
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                placeholder={isLogin ? '••••••••' : 'Min 6 characters'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = '#7F6269')}
                onBlur={(e)  => (e.target.style.borderColor = 'rgba(189,184,185,0.2)')}
              />
            </div>
 
            {/* Confirm password — signup only */}
            {!isLogin && (
              <div>
                <label style={labelStyle}>Confirm Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = '#7F6269')}
                  onBlur={(e)  => (e.target.style.borderColor = 'rgba(189,184,185,0.2)')}
                />
              </div>
            )}
 
            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: '8px',
                backgroundColor: loading ? 'rgba(127,98,105,0.5)' : '#7F6269',
                color: '#F4E1E0',
                fontSize: '15px',
                fontWeight: 600,
                padding: '14px',
                borderRadius: '999px',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: "'DM Sans', sans-serif",
                boxShadow: loading ? 'none' : 'inset 0 1px 0 rgba(244,225,224,0.12), 0 4px 20px rgba(127,98,105,0.35)',
                transition: 'opacity 0.2s',
              }}
            >
              {loading
                ? (isLogin ? 'Signing in…' : 'Creating account…')
                : (isLogin ? 'Sign In →' : 'Create Account →')}
            </button>
          </form>
 
          {/* Toggle */}
          <p style={{ textAlign: 'center', color: '#BDB8B9', fontSize: '14px', marginTop: '24px' }}>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={toggle}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#E5C5C1', fontWeight: 600, fontSize: '14px',
                fontFamily: "'DM Sans', sans-serif",
                textDecoration: 'underline',
              }}
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
 
// ── Shared styles ─────────────────────────────────────────────────────────────
const labelStyle: React.CSSProperties = {
  display: 'block',
  color: '#BDB8B9',
  fontSize: '13px',
  fontWeight: 500,
  marginBottom: '6px',
};
 
const inputStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: 'rgba(189,184,185,0.06)',
  border: '1px solid rgba(189,184,185,0.2)',
  borderRadius: '10px',
  padding: '12px 14px',
  color: '#F4E1E0',
  fontSize: '14px',
  fontFamily: "'DM Sans', sans-serif",
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
};