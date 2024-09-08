"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, Search, Menu, X, UserRoundPen, FileBadge } from 'lucide-react';
import ButtonLogout from './ButtonLogout';

const SidebarAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch('/api/login', {
          credentials: 'include' // Esto asegura que las cookies se envíen con la solicitud
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserName(data.name); // Asumiendo que el campo se llama 'name' en tu modelo de usuario
      } catch (error) {
        console.error('Error fetching user name:', error);
        setUserName('Usuario');
      }
    };

    fetchUserName();
  }, []);

  return (
    <>
      {/* Botón de toggle para móviles */}
      <button 
        className="fixed top-4 left-4 z-20 md:hidden bg-gray-800 text-white p-2 rounded-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay para cerrar el sidebar en móviles */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition duration-200 ease-in-out z-30 md:z-0 md:static`}>
        <div className="flex flex-col h-full w-64 bg-gray-900 text-white">
          <div className="flex flex-col items-center mt-8 mb-8">
            <div className="w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center overflow-hidden">
              <span className="text-3xl font-bold">
              {userName.split(' ').map(name => name[0]).join('').toUpperCase()}
              </span>
            </div>
            <h2 className="mt-4 text-xl font-semibold">{userName}</h2>
          </div>
          
          <nav className="flex-1">
            <Link href="/dashboard/crear-certificado" className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition duration-300">
              <FileText className="mr-3" size={20} />
              Crear Certificado
            </Link>
            <Link href="/dashboard/admin/all-employees" className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition duration-300">
              <FileBadge className="mr-3" size={20} />
              Ver Empleados
            </Link>
            <Link href="/dashboard/admin/employee" className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition duration-300">
              <UserRoundPen className="mr-3" size={20} />
              Crear Empleado
            </Link>
            <Link href="/dashboard/buscar-certificado" className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition duration-300">
              <Search className="mr-3" size={20} />
              Buscar Certificado
            </Link>
          </nav>
          
          <div className="mb-8 px-6">
            <ButtonLogout />
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarAdmin;