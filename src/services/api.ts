import axios from 'axios';
import type { AxiosResponse } from 'axios';

const BASE_URL = 'https://api.onsocloud.com';
const TOKEN_KEY = 'access_token';

export interface ApiResponse<T> {
  KiboApp?: {
    Response: {
      data: T;
      access_token?: string;
      message?: string;
      errorCode?: string;
      kiboCode?: number;
      kiboMessage?: string;
      kiboType?: string;
      pageError?: string;
      pageStatus?: number;
      path?: string;
      timestamp?: string;
    };
  };
}

export interface LoginResponse {
  KiboApp?: {
    Response?: {
      kiboType?: string;
      kiboMessage?: string;
      data?: any;
    }
  }
}

export interface Book {
  stok: {
    id: number;
    barkod: string;
    kod: string;
    stokcins: string;
    resfile: string;
    kfiyat: number;
    pfiyat1: number;
    kisk: number;
    kkdv: number;
    smiktar: number;
    uretici: {
      ureticiad: string;
    };
    stk_date_update: string;
    authors?: Array<{
      id: number;
      at_name: string;
      at_who: number;
    }>;
    kategori?: {
      kategoriad: string;
    };
    sayfasayisi?: number;
    basimyeri?: string;
    yayin_dili?: {
      ln_name: string;
    };
    ozet?: string;
  };
}

export interface Settings {
  stokSatisFiyatId?: number;
}
export interface BookContainerProps {
  search: string;
  page: number;
  onPageChange: (page: number) => void;
}

export interface BookItem {
  id: number;
  barkod: string;
  kod: string;
  stokcins: string;
  resfile: string;
  kfiyat: number;
  pfiyat1: number;
  kisk: number;
  kkdv: number;
  smiktar: number;
  uretici: {
    ureticiad: string;
  };
  stk_date_update: string;
  authors?: Array<{
    id: number;
    at_name: string;
    at_who: number;
  }>;
  kategori?: {
    kategoriad: string;
  };
  sayfasayisi?: number;
  basimyeri?: string;
  yayin_dili?: {
    ln_name: string;
  };
  ozet?: string;
  resurl?: string;
  sm_resurl?: string;
}

const getStoredToken = (): string | null => {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    console.log('Stored token:', token ? `${token.substring(0, 20)}...` : 'null');
    return token;
  } catch (error) {
    console.error('Token alınırken hata:', error);
    return null;
  }
};

const setStoredToken = (token: string): boolean => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
    //console.log('Token kaydedildi');
    console.log(TOKEN_KEY, token);
    
    const savedToken = getStoredToken();
    if (savedToken !== token) {
      throw new Error('Token doğrulama hatası');
    }
    return true;
  } catch (error) {
    console.error('Token kaydedilirken hata:', error);
    return false;
  }
};

const removeStoredToken = (): void => {
  try {
    localStorage.removeItem(TOKEN_KEY);
    console.log('Token silindi');
  } catch (error) {
    console.error('Token silinirken hata:', error);
  }
};

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

api.interceptors.request.use(
  async (config: any) => {
    if (config.url === '/api/auth/login') {
      return config;
    }

    const token = getStoredToken();
    if (!token) {
      throw new Error('Token bulunamadı');
    }

    config.headers.Authorization = `Bearer ${token}`;
    console.log('Token eklendi:', token.substring(0, 20) + '...');
    console.log('Request headers:', JSON.stringify(config.headers, null, 2));
    
    return config;
  },
  (error: any) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`API Yanıt: ${response.status} ${response.config.url}`);
    return response;
  },
  (error: any) => {
    console.error('API Hata:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
      
      if (error.response.status === 401) {
        removeStoredToken();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (credentials: { email: string; password: string }) => {
    console.log('Login isteği gönderiliyor...');
    const response = await api.post<ApiResponse<any>>('/api/auth/login', credentials);

    const token = response.data?.KiboApp?.Response?.data?.authorization?.access_token;
    if (!token) {
      throw new Error('Token alınamadı');
    }

    const saved = setStoredToken(token);
    if (!saved) {
      throw new Error('Token kaydedilemedi');
    }

    return response.data;
  },

  logout: () => {
    removeStoredToken();
    window.location.href = '/login';
  },

  isAuthenticated: (): boolean => {
    return getStoredToken() !== null;
  }
};

export const settingsService = {
  getGlobalSettings: async () => {
    const token = getStoredToken();
    if (!token) {
      throw new Error('Token bulunamadı');
    }

    const response = await api.get<ApiResponse<Settings>>('/api/settings/global', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
};

export interface BookListResponse {
  page: number;
  pageIn: number;
  rowCount: number;
  stok: Array<{
    id: number;
    barkod: string;
    kod: string;
    stokcins: string;
    resfile: string;
    kfiyat: number;
    pfiyat1: number;
    kisk: number;
    kkdv: number;
    smiktar: number;
    uretici: {
      ureticiad: string;
    };
    stk_date_update: string;
    authors?: Array<{
      id: number;
      at_name: string;
      at_who: number;
    }>;
    kategori?: {
      kategoriad: string;
    };
    sayfasayisi?: number;
    basimyeri?: string;
    yayin_dili?: {
      ln_name: string;
    };
    ozet?: string;
  }>;
}

export const bookService = {
  getBookList: async (searchText: string = '', page: number = 1, limit: number = 10) => {
    const token = getStoredToken();
    if (!token) throw new Error('Token bulunamadı');

    const params: any = {
      searchType: 0,
      page,
      limit,
      tags: 1,
      tmiktar: 1,
    };

    params["search_text"] = searchText || "kitap";

    const response = await api.get<ApiResponse<BookListResponse>>('/api/reader/stok/list', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params
    });

    return response.data;
  },

  getBookById: async (id: string): Promise<Book> => {
    console.log('Kitap detayı isteği başlatılıyor...', id);
    const token = getStoredToken();
    if (!token) {
      throw new Error('Token bulunamadı');
    }

    if (!id) {
      throw new Error('Geçersiz kitap ID');
    }


    const response = await api.get<ApiResponse<Book>>(`/api/stok/takeByBarkod/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        cari_id: 2,
        belgekod: 30
      }
    });

    const bookData = response.data?.KiboApp?.Response?.data;
    if (!bookData || Object.keys(bookData).length === 0) {
      throw new Error('Kitap detayları alınamadı');
    }

    return bookData; 
  },

  getBookByBarcode: async (barcode: string): Promise<ApiResponse<Book>> => {
    const token = getStoredToken();
    if (!token) {
      throw new Error('Token bulunamadı');
    }

    const response = await api.get<ApiResponse<Book>>(`/api/stok/takeByBarkod/${barcode}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        cari_id: 2,
        belgekod: 30
      }
    });
    return response.data;
  }
};

/*export const readerService = {
  getFeaturedBooks: async () => {
    const response = await api.get('/api/reader/stok/bestseller', {
      params: { dayParam: 7 }
    });
    return response.data;
  },

  getBestSellers: async (dayParam: number = 7): Promise<ApiResponse<Book[]>> => {
    const response = await api.get<ApiResponse<Book[]>>('/api/reader/stok/bestseller', {
      params: { dayParam }
    });
    return response.data;
  }
};*/

export default api;
