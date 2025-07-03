import { useState } from 'react';
import Layout from './layout/Layout';
import BookContainer from './BookContainer';
import { useBarcodeListener } from '../hooks/useBarcodeListener';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useBarcodeListener((barcode) => {
    setSearch(barcode);
    setPage(1);
  }, 3000);

  return (
    <Layout 
      search={search} 
      onSearchChange={value => {
        setSearch(value);
        setPage(1);
      }}
    >
      <BookContainer 
        search={search}
        page={page}
        onPageChange={setPage}
      />
    </Layout>
  );
}