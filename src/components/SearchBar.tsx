import { useTranslation } from 'react-i18next';

interface SearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onSearch?: () => void;
}

const SearchBar = ({ search, onSearchChange, onSearch }: SearchBarProps) => {
  const { t } = useTranslation();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch();
    }
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder={t('search')}
        value={search}
        onChange={e => onSearchChange(e.target.value)}
        onKeyDown={handleKeyPress}
        className="w-full border rounded px-2 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base md:text-lg truncate bg-white"
      />
      <button
        onClick={onSearch}
        className="absolute right-3 top-1/2 -translate-y-1/2 translate-x-1/4 p-2.5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
        aria-label="Ara"
      >
        <i className="ri-search-line w-12 h-12"></i>
      </button>
    </div>
  );
};

export default SearchBar;