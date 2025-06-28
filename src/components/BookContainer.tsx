import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { bookService } from '../services/api';
import type { BookContainerProps, BookItem } from '../services/api';

export default function BookContainer({ search, page }: BookContainerProps) {
  const navigate = useNavigate();
  const sliderRef = useRef<Slider>(null);
  const [books, setBooks] = useState<BookItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBooks();
  }, [search, page]);

  const loadBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const booksResponse = await bookService.getBookList(search, page, 50);
      const booksData = booksResponse?.KiboApp?.Response?.data?.stok;
      if (!booksData) {
        setError('Kitap verileri alınamadı');
        setBooks([]);
        return;
      }
      setBooks(booksData);
    } catch (error) {
      setError('Kitaplar yüklenirken bir hata oluştu');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBookPress = (book: BookItem) => {
    if (!book.barkod) {
      alert('Kitap detayları alınamadı');
      return;
    }
    navigate(`/book/${book.barkod}`, {
      state: {
        title: book.stokcins,
        imageUrl: book.resfile,
      },
    });
  };

  const sliderSettings = {
    dots: false,
    infinite: books.length > 5,
    speed: 200,
    slidesToShow: Math.min(5, books.length),
    slidesToScroll: 1,
    arrows: false,
    autoplay: books.length > 5,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, books.length),
          infinite: books.length > 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          infinite: books.length > 1,
        },
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <p className="text-gray-600">Kitaplar yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-6">
      {search && (
        <div className="mb-4 text-center">
          <p className="text-gray-600">
            "{search}" için {books.length} sonuç bulundu
          </p>
        </div>
      )}

      <Slider {...sliderSettings} ref={sliderRef}>
      {books.map((book) => (
       <div key={book.id} className="px-2">
        <div className="flex flex-col items-center cursor-pointer">
          <div
           onClick={() => handleBookPress(book)}
           className="bg-white rounded-xl shadow-md hover:shadow-xl hover:border-red-500 hover:ring-2 hover:ring-red-300 border border-gray-200 transition-all duration-300 p-4 w-60 h-[380px] flex items-center justify-center"
           >
            <img
              src={
                book.resfile?.trim() ||
                book.resurl?.trim() ||
                book.sm_resurl?.trim()
              }
              alt={book.stokcins}
              className="w-48 h-64 object-cover rounded"
            />
           </div>
            <div className="mt-3 text-center text-sm font-semibold text-gray-800 w-48 line-clamp-2">
             {book.stokcins}
            </div>
         </div>
       </div>
      ))}
    </Slider>

      {books.length > 5 && (
        <div className="flex justify-center items-center mt-8">
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            className="px-6 py-2 border rounded hover:bg-blue-100"
          >
            <i className="ri-arrow-left-line"></i>
          </button>
          <button
            onClick={() => sliderRef.current?.slickNext()}
            className="px-6 py-2 border rounded hover:bg-blue-100"
          >
            <i className="ri-arrow-right-line"></i>
          </button>
        </div>
      )}
    </div>
  );
}
