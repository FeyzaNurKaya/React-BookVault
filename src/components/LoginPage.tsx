import { useState, useRef, useEffect } from 'react';
import { authService } from '../services/api';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'tr', label: 'Türkçe' },
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
  { code: 'fr', label: 'Français' },
];

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t, i18n } = useTranslation();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await authService.login({ email, password });
      window.location.href = '/'; 
    } catch (err: any) {
      setError('Giriş başarısız! Bilgilerinizi kontrol edin.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setShowLangMenu(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f7f3]">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md md:m-0 m-4">
        <div className="flex justify-center mb-6">
          <img src="/src/assets/onso.png" alt="Onso Logo" className="h-12" />
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <i className="ri-user-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl"></i>
            <input
              type="text"
              placeholder="Kullanıcı İsim"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <div className="relative">
            <i className="ri-lock-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl"></i>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Kullanıcı Şifre"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <i className="ri-eye-close-line text-xl"></i> : <i className="ri-eye-line text-xl"></i>}
            </button>
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <div className="flex w-full mt-2 mb-10 relative">
            <button
              type="submit"
              className="flex-1 bg-[#f43f5e] hover:bg-[#e11d48] text-white py-2 rounded-l-lg font-semibold transition-colors text-xl flex items-center justify-center"
              disabled={loading}
            >
              {t('login')}
            </button>
            <div className="w-px bg-white/60 h-auto" />
            <div className="relative">
              <button
                type="button"
                className="w-24 bg-[#f43f5e] hover:bg-[#e11d48] text-white py-2 rounded-r-lg font-semibold text-xl flex items-center justify-center focus:outline-none"
                onClick={() => setShowLangMenu((v) => !v)}
                tabIndex={0}
              >
                {i18n.language.toUpperCase()}
              </button>
              {showLangMenu && (
                <div ref={langMenuRef} className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg z-10 py-2">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      className={`block w-full text-left px-4 py-2 text-gray-700 hover:bg-[#f43f5e] ${i18n.language === lang.code ? 'font-bold' : ''}`}
                      onClick={() => {
                        i18n.changeLanguage(lang.code);
                        setShowLangMenu(false);
                      }}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 