import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import QrReader from 'react-qr-barcode-scanner';

interface SearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onSearch?: () => void;
}

const SearchBar = ({ search, onSearchChange, onSearch }: SearchBarProps) => {
  const { t } = useTranslation();
  const [showScanner, setShowScanner] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch();
    }
  };

  const handleScan = (data: string | null) => {
    if (data) {
      onSearchChange(data);
      setShowScanner(false);
      setScanError(null);
      if (onSearch) onSearch();
    }
  };

  const handleError = (err: any) => {
    if ((err as any)?.name === 'NotAllowedError' || (err as any)?.name === 'NotFoundError' || (err as any)?.name === 'NotReadableError') {
      setScanError(t('Kamera hatası veya erişim reddedildi.'));
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
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer border-l-2 border-gray-400 pl-3"
        aria-label={t('search')}
      >
        <i className="ri-search-line w-12 h-12"></i>
      </button>
      <button
        onClick={() => { setShowScanner(true); setScanError(null); }}
        className="absolute right-14 top-1/2 -translate-y-1/2 cursor-pointer"
        aria-label={t('Kamera ile tara')}
        type="button"
      >
        <i className="ri-camera-line w-12 h-12"></i>
      </button>
      {showScanner && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg flex flex-col items-center">
            <QrReader
              onUpdate={(err, result) => {
                if (result) {
                  handleScan(result.getText());
                } else if (err && (err as any)?.name !== 'NotFoundException' && !scanError) {
                  handleError(err);
                }
              }}
              facingMode="environment"
              width={300}
              height={300}
            />
            <button
              onClick={() => setShowScanner(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              {t('Kapat')}
            </button>
            {scanError && (
              <div className="mt-2 text-red-600">{scanError}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;