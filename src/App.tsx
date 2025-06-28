import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import BookContainer from './components/BookContainer'
import BookDetail from './components/BookDetail'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import PrivateRoute from './components/PrivateRoute'
import { useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  const [search, setSearch] = useState('')  
  const [page, setPage] = useState(1)

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={
        <PrivateRoute>
          <HomePage />
        </PrivateRoute>
      } />
      <Route path="/books" element={
        <PrivateRoute>
          <Layout search={search} onSearchChange={setSearch}>
            <BookContainer 
              search={search}
              page={page}
              onPageChange={setPage}
            />
          </Layout>
        </PrivateRoute>
      } />
      <Route path="/book/:bookId" element={
        <PrivateRoute>
            <BookDetail />
        </PrivateRoute>
      } />
    </Routes>
  )
}

export default App