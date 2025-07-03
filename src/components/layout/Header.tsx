import SearchBar from "../SearchBar"
import { authService } from "../../services/api";
import { useTranslation } from 'react-i18next';
import kiboLogo from '../../assets/kibo.png';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  search?: string;
  onSearchChange?: (value: string) => void;
  onSearch?: () => void;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

const Header = ({ search = '', onSearchChange, onSearch, showBackButton = false, onBackClick }: HeaderProps) => {
  const isAuthenticated = authService.isAuthenticated();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    authService.logout();
  };

  useEffect(() => {
    if (isAuthenticated) {
      setUserEmail(authService.getUserEmail());
    } else {
      setUserEmail(null);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-9xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex flex-row items-center w-full py-3 gap-2 md:gap-4">
          <div className="flex items-center min-w-fit">
            <img src={logo} alt="logo" className="h-10 w-8 object-contain select-none cursor-pointer" onClick={() => navigate('/')} />
            <span className="font-bold text-sm md:text-lg text-black whitespace-nowrap cursor-pointer ml-2" onClick={() => navigate('/')}>ÜrünGör</span>
          </div>
          <div className="flex-1 flex justify-center mx-2">
            {onSearchChange && (
              <div className="w-full max-w-xs sm:max-w-md md:max-w-5xl">
                <SearchBar search={search} onSearchChange={onSearchChange} onSearch={onSearch} />
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 min-w-fit">
            <img src={kiboLogo} alt="kibo" className="h-7 md:w-auto w-8 object-contain select-none cursor-pointer" onClick={() => navigate('/')} />
            <button className="p-2 md:hidden" onClick={() => setMobileMenuOpen(v => !v)}>
              <i className={mobileMenuOpen ? "ri-close-line text-2xl text-gray-700" : "ri-menu-line text-2xl text-gray-700"}></i>
            </button>
          </div>
          <div className="hidden md:flex items-center gap-4 min-w-fit">
            {showBackButton && (
              <button
                onClick={onBackClick}
                className="cursor-pointer"
                aria-label="Geri Dön"
              >
                <i className="ri-arrow-go-back-fill text-2xl"></i>
              </button>
            )}
            {isAuthenticated && (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none"
                  aria-label="Kullanıcı Menüsü"
                >
                  <i className="ri-user-3-fill text-2xl text-gray-700"></i>
                  <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate">
                    {userEmail}
                  </span>
                  <i className={`ri-arrow-down-s-line text-lg transition-transform ${menuOpen ? 'rotate-180' : ''}`}></i>
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg z-20 py-2 border border-gray-100">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:text-red-500 transition-colors rounded-b-xl"
                    >
                      <i className="ri-logout-box-r-line mr-2"></i>{t('logout')}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden flex flex-col gap-2 px-2 pb-2 animate-fade-in">
            <div className="flex items-center gap-3">
              {showBackButton && (
                <button
                  onClick={onBackClick}
                  className="cursor-pointer"
                  aria-label="Geri Dön"
                >
                  <i className="ri-arrow-go-back-fill text-2xl"></i>
                </button>
              )}
            </div>
            {isAuthenticated && (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none w-full"
                  aria-label="Kullanıcı Menüsü"
                >
                  <i className="ri-user-3-fill text-2xl text-gray-700"></i>
                  <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate">
                    {userEmail}
                  </span>
                  <i className={`ri-arrow-down-s-line text-lg transition-transform ${menuOpen ? 'rotate-180' : ''}`}></i>
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg z-20 py-2 border border-gray-100">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:text-red-500 transition-colors rounded-b-xl"
                    >
                      <i className="ri-logout-box-r-line mr-2"></i>{t('logout')}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header