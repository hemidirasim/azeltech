'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Category {
  category: string
  categoryAz: string
}

interface Settings {
  siteNameAz?: string
  logoUrl?: string
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [settings, setSettings] = useState<Settings>({})

  useEffect(() => {
    // Fetch categories
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error fetching categories:', err))
    
    // Fetch settings
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error('Error fetching settings:', err))
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isAboutOpen) {
        const target = event.target as HTMLElement
        if (!target.closest('.about-dropdown')) {
          setIsAboutOpen(false)
        }
      }
    }

    if (isAboutOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isAboutOpen])

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex">
            <Link href="/" className="flex items-center">
              {settings.logoUrl ? (
                <Image src={settings.logoUrl} alt={settings.siteNameAz || 'Azeltech'} width={180} height={60} className="h-16 w-auto object-contain" />
              ) : (
                <span className="text-3xl font-bold text-primary-600">{settings.siteNameAz || 'Azeltech'}</span>
              )}
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-700 hover:text-primary-600 px-2 py-2 rounded-md text-sm font-medium">
                Ana Səhifə
              </Link>
              <div className="relative about-dropdown">
                <button
                  className="text-gray-700 hover:text-primary-600 px-2 py-2 rounded-md text-sm font-medium flex items-center"
                  onClick={() => setIsAboutOpen(!isAboutOpen)}
                >
                  Haqqımızda
                  <svg className={`ml-1 h-4 w-4 transition-transform ${isAboutOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isAboutOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <Link
                      href="/about"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                      onClick={() => setIsAboutOpen(false)}
                    >
                      Haqqımızda
                    </Link>
                    <Link
                      href="/certificates"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                      onClick={() => setIsAboutOpen(false)}
                    >
                      Sertifikatlar
                    </Link>
                  </div>
                )}
              </div>
              <Link href="/services" className="text-gray-700 hover:text-primary-600 px-2 py-2 rounded-md text-sm font-medium">
                Xidmətlərimiz
              </Link>
              <Link href="/equipment" className="text-gray-700 hover:text-primary-600 px-2 py-2 rounded-md text-sm font-medium">
                Texnika Parkımız
              </Link>
              <Link href="/projects" className="text-gray-700 hover:text-primary-600 px-2 py-2 rounded-md text-sm font-medium">
                Layihələrimiz
              </Link>
              <Link href="/news" className="text-gray-700 hover:text-primary-600 px-2 py-2 rounded-md text-sm font-medium">
                Xəbərlər
              </Link>
              <Link href="/career" className="text-gray-700 hover:text-primary-600 px-2 py-2 rounded-md text-sm font-medium">
                Karyera
              </Link>
            </div>
            <div className="ml-6">
              <Link href="/contact" className="bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition">
                Əlaqə
              </Link>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-primary-600" onClick={() => setIsOpen(false)}>
              Ana Səhifə
            </Link>
            <Link href="/about" className="block px-3 py-2 text-gray-700 hover:text-primary-600" onClick={() => setIsOpen(false)}>
              Haqqımızda
            </Link>
            <Link href="/certificates" className="block px-3 py-2 pl-8 text-gray-700 hover:text-primary-600 text-sm" onClick={() => setIsOpen(false)}>
              Sertifikatlar
            </Link>
            <Link href="/services" className="block px-3 py-2 text-gray-700 hover:text-primary-600" onClick={() => setIsOpen(false)}>
              Xidmətlərimiz
            </Link>
            <Link href="/equipment" className="block px-3 py-2 text-gray-700 hover:text-primary-600" onClick={() => setIsOpen(false)}>
              Texnika Parkımız
            </Link>
            <Link href="/projects" className="block px-3 py-2 text-gray-700 hover:text-primary-600" onClick={() => setIsOpen(false)}>
              Layihələrimiz
            </Link>
            <Link href="/news" className="block px-3 py-2 text-gray-700 hover:text-primary-600" onClick={() => setIsOpen(false)}>
              Xəbərlər
            </Link>
            <Link href="/career" className="block px-3 py-2 text-gray-700 hover:text-primary-600" onClick={() => setIsOpen(false)}>
              Karyera
            </Link>
            <Link href="/certificates" className="block px-3 py-2 text-gray-700 hover:text-primary-600" onClick={() => setIsOpen(false)}>
              Sertifikatlar
            </Link>
            <Link href="/contact" className="block px-3 py-2 text-gray-700 hover:text-primary-600" onClick={() => setIsOpen(false)}>
              Əlaqə
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
