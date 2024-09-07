import React from 'react';

export default function UserDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Panel de Administración</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl text-purple-600 font-semibold mb-4">Resumen de Tus Certificados</h2>
          <p className="text-3xl font-bold text-gray-600">1,234</p>
          <p className="text-gray-600">Certificados emitidos</p>
        </div>
      </div>
    </div>
  );
}