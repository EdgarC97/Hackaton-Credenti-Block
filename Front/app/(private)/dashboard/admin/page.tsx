import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Panel de Administración</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Resumen de Certificados</h2>
          <p className="text-3xl font-bold text-purple-600">1,234</p>
          <p className="text-gray-600">Certificados emitidos</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Usuarios Activos</h2>
          <p className="text-3xl font-bold text-purple-600">567</p>
          <p className="text-gray-600">Usuarios registrados</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Certificados Recientes</h2>
          <ul className="space-y-2">
            <li className="text-gray-600">Certificado A - 01/09/2024</li>
            <li className="text-gray-600">Certificado B - 31/08/2024</li>
            <li className="text-gray-600">Certificado C - 30/08/2024</li>
          </ul>
        </div>
      </div>
    </div>
  );
}