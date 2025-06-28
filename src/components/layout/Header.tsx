import SearchBar from "../SearchBar"
import { authService } from "../../services/api";
import { useTranslation } from 'react-i18next';
import kiboLogo from '../../assets/kibo.png';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

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

  const handleLogout = () => {
    authService.logout();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-4 w-full gap-4">
          <div className="flex items-center flex-shrink-0 mr-4 min-w-fit">
            <img src={logo} alt="logo" className="h-12 w-auto object-contain select-none cursor-pointer" onClick={() => navigate('/')} />
            <span className="font-bold text-base md:text-lg text-black whitespace-nowrap cursor-pointer" onClick={() => navigate('/')}>ÜrünGör</span>
          </div>
          <div className="flex-1 flex justify-center">
            {onSearchChange && (
              <div className="w-full max-w-5xl mx-4">
                <SearchBar search={search} onSearchChange={onSearchChange} onSearch={onSearch} />
              </div>
            )}
          </div>
          <div className="flex items-center gap-4 min-w-fit">
            <img src={kiboLogo} alt="kibo" className="h-7 w-auto object-contain select-none cursor-pointer" onClick={() => navigate('/')} />
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
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium bg-red-500 text-white hover:text-white hover:bg-red-600 rounded-lg transition-colors"
              >
                {t('logout')}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header