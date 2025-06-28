import { useState } from 'react';
import Layout from './layout/Layout';
import BookContainer from './BookContainer';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

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