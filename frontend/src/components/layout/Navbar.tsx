'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Search, Bell, User } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Trending', href: '/trending' },
    { label: 'Latest', href: '/latest' },
    { label: 'Following', href: '/following' },
    { label: 'Creator Studio', href: '/creator' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-dark-900 border-b border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary-500/50 group-hover:scale-110">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold text-white hidden sm:inline transition-all duration-300 group-hover:text-primary-400">
              PulseAI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-dark-300 hover:text-white transition-colors text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <button className="btn-icon">
              <Search size={20} className="text-dark-300" />
            </button>
            <button className="btn-icon relative group">
              <Bell size={20} className="text-dark-300 group-hover:text-white" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
            </button>
            <button className="btn-icon">
              <User size={20} className="text-dark-300" />
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden btn-icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X size={20} className="text-dark-300 animate-spin" />
              ) : (
                <Menu size={20} className="text-dark-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-slideDown">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-dark-300 hover:text-white hover:bg-dark-800 rounded-lg transition-all duration-300 hover:translate-x-2"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
