import type { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
  search: string;
  onSearchChange: (value: string) => void;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

const Layout = ({ children, search, onSearchChange, showBackButton = false, onBackClick }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header search={search} onSearchChange={onSearchChange} showBackButton={showBackButton} onBackClick={onBackClick} />
      <main className="flex-1 py-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout