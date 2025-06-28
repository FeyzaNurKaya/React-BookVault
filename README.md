# OnsoWeb - Kitap Yönetim Sistemi

OnsoWeb, modern web teknolojileri kullanılarak geliştirilmiş bir kitap yönetim ve arama platformudur. React, TypeScript ve Tailwind CSS ile oluşturulmuş bu uygulama, kullanıcıların kitap araması yapmasına, kitap detaylarını görüntülemesine ve kişiselleştirilmiş bir deneyim yaşamasına olanak tanır.

## 🚀 Özellikler

- **Çok Dilli Destek**: Türkçe, İngilizce, Almanca ve Fransızca dil desteği
- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- **Kitap Arama**: Gelişmiş arama fonksiyonları
- **Kitap Detayları**: Detaylı kitap bilgileri ve görselleri
- **Kullanıcı Kimlik Doğrulama**: Güvenli giriş sistemi
- **Modern UI/UX**: Tailwind CSS ile modern ve şık arayüz
- **Carousel/Slider**: Kitap görselleri için interaktif slider
- **Sayfalama**: Büyük kitap listeleri için sayfalama sistemi

## 🛠️ Teknolojiler

- **Frontend**: React 19.1.0
- **Dil**: TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Internationalization**: i18next
- **Carousel**: React Slick & Swiper
- **Build Tool**: Vite
- **Icons**: Remix Icon

## 📦 Kurulum

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları takip edin:

### Gereksinimler
- Node.js (v18 veya üzeri)
- npm veya yarn

### Adımlar

1. **Projeyi klonlayın**
   ```bash
   git clone https://github.com/kullaniciadi/onsoweb.git
   cd onsoweb
   ```

2. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   ```

3. **Geliştirme sunucusunu başlatın**
   ```bash
   npm run dev
   ```

4. **Tarayıcınızda açın**
   ```
   http://localhost:5173
   ```

## 🏗️ Proje Yapısı

```
onsoweb/
├── public/                 # Statik dosyalar
├── src/
│   ├── assets/            # Resimler ve medya dosyaları
│   │   ├── layout/       # Layout bileşenleri
│   │   ├── BookContainer.tsx
│   │   ├── BookDetail.tsx
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── PrivateRoute.tsx
│   │   └── SearchBar.tsx
│   ├── language/         # Dil dosyaları
│   ├── services/         # API servisleri
│   ├── App.tsx          # Ana uygulama bileşeni
│   ├── main.tsx         # Uygulama giriş noktası
│   └── index.css        # Global stiller
├── package.json
├── vite.config.ts
└── tailwind.config.cjs
```

## 🚀 Kullanım

### Geliştirme
```bash
npm run dev          # Geliştirme sunucusunu başlat
npm run build        # Production build oluştur
npm run preview      # Production build'i önizle
npm run lint         # ESLint ile kod kontrolü
```

### Özellikler

1. **Giriş Yapma**: `/login` sayfasından giriş yapın
2. **Ana Sayfa**: Giriş yaptıktan sonra ana sayfaya yönlendirilirsiniz
3. **Kitap Arama**: `/books` sayfasında kitap araması yapabilirsiniz
4. **Kitap Detayları**: Kitap kartlarına tıklayarak detay sayfasına gidebilirsiniz
5. **Dil Değiştirme**: Header'dan dil seçeneklerini değiştirebilirsiniz

## 🌐 Çok Dilli Destek

Uygulama şu dilleri destekler:
- 🇹🇷 Türkçe (tr)
- 🇺🇸 İngilizce (en)
- 🇩🇪 Almanca (deutsch)
- 🇫🇷 Fransızca (francais)

## 📱 Responsive Tasarım

Uygulama tüm cihazlarda mükemmel çalışır:
- 📱 Mobil cihazlar
- 📱 Tablet
- 💻 Masaüstü bilgisayarlar

## 🤝 Katkıda Bulunma

1. Bu repository'yi fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

Bu proje [Adınız] tarafından geliştirilmiştir.

## 📞 İletişim

- Email: [email@example.com]
- GitHub: [github.com/kullaniciadi]

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
