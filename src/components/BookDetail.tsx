import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookService } from '../services/api';
import type { Book } from '../services/api';
import Layout from './layout/Layout';

export default function BookDetail() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (bookId) {
      loadBookDetail();
    }
  }, [bookId]);

  useEffect(() => {
    if (book && book.stok && book.stok.barkod) {
      setSearch(book.stok.barkod);
    }
  }, [book]);

  const loadBookDetail = async () => {
    try {
      setLoading(true);
      const bookData = await bookService.getBookById(bookId!);
      // console.log(" Alınan kitap:", bookData);
      setBook(bookData);
    } catch (error: any) {
      console.error('Kitap detay yükleme hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Kitap detayları yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!book || !book.stok) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Kitap bulunamadı</p>
          <button
            onClick={handleGoBack}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Geri Dön
          </button>
        </div>
      </div>
    );
  }

  const stok = book.stok;

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${stok.barkod || ''}`;
  const barcodeUrl = (stok.barkod || '').length >= 12
    ? `https://barcode.tec-it.com/barcode.ashx?data=${stok.barkod}&code=EAN13`
    : '';

  return (
    <Layout search={search} onSearchChange={setSearch} showBackButton={true} onBackClick={handleGoBack}>
      <div className="max-w-6xl mx-auto p-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 items-start mt-2">
          <div className="flex justify-center">
            <img
              src={stok.resfile}
              alt={stok.stokcins || '-'}
              className="rounded-xl shadow max-w-md w-full object-cover aspect-[3/4] bg-gray-100"
            />
          </div>

          <div className="flex flex-col items-center gap-3">
            {stok.stokcins && (
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-2 mt-2 md:mt-0">
                {stok.stokcins}
              </h1>
            )}
            {stok.kfiyat !== undefined && stok.kfiyat !== null && (
              <div className="border-2 border-pink-500 rounded-lg px-6 py-2 flex flex-col gap-1 min-w-[240px] max-w-[300px] bg-white">
                <div className="flex items-end gap-2 mt-1">
                  <span className="text-red-500 text-2xl font-semibold leading-none">TRY</span>
                  <span className="text-red-600 font-bold text-6xl leading-none">{stok.kfiyat.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            )}
            <div className="flex flex-row mt-2 -ml-24 gap-5">
              <span className="text-base text-black font-semibold">(Kdv Dahil)</span>
              {stok.kkdv !== undefined && stok.kkdv !== null && (
                <span className="text-pink-500 text-base font-semibold">
                  %{stok.kkdv} Puan
                </span>
              )}
            </div>
            {barcodeUrl && (
              <div className="flex flex-col items-center mt-2">
                <img src={barcodeUrl} alt="Barkod" className="h-14 w-64" />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 items-end md:items-start">
            <div className="w-full flex flex-col gap-2 items-end md:items-start">
              {stok.pfiyat1 !== undefined && stok.pfiyat1 !== null && (
                <div className="text-gray-900 rounded-lg font-semibold text-base min-w-[140px]">
                  <span className="font-normal text-gray-500">Liste :</span> {stok.pfiyat1.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                </div>
              )}
              {stok.kisk !== undefined && stok.kisk !== null && (
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-bold text-2xl min-w-[200px] border border-green-200 flex items-start gap-1 justify-start">
                  <i className="ri-discount-percent-line text-3xl"></i>
                  %{stok.kisk} indirim
                </div>
              )}
              {stok.smiktar !== undefined && stok.smiktar !== null && (
                <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-bold text-2xl min-w-[200px] border border-blue-200 flex items-start gap-1 justify-start">
                  <i className="ri-luggage-cart-fill text-3xl"></i>
                  {Math.abs(stok.smiktar)} Adet
                </div>
              )}
            </div>
            <div className="flex flex-col text-xs font-bold text-gray-600 gap-1 mt-2 w-full">
              {stok.uretici?.ureticiad && (
                <span>Menşei: <b>{stok.uretici.ureticiad}</b></span>
              )}
              {stok.stk_date_update && (
                <span>Fiyat Güncelleme Tarihi: <b>
                  {new Date(stok.stk_date_update).toLocaleDateString('tr-TR')}
                </b></span>
              )}
            </div>
            <div className="flex flex-col mt-2 w-full">
              <img src={qrUrl} alt="QR Kod" className="h-42 w-56" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}