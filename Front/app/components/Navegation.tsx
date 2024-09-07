"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {/* Reemplaza esto con tu logo */}
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">LOGO</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/register" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition duration-300">
                Registro
              </Link>
              <Link href="/login" className="px-3 py-2 rounded-md text-sm font-medium bg-purple-600 hover:bg-purple-700 transition duration-300">
                Iniciar Sesión
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Abrir menú principal</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/register" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-300">
              Registro
            </Link>
            <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-purple-600 hover:bg-purple-700 transition duration-300">
              Iniciar Sesión
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;