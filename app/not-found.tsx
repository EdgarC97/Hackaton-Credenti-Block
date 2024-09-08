// app/404.tsx

import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold">404</h1>
        <p className="mt-4 text-xl">¡Vaya! La página que estás buscando no se encuentra.</p>
        <p className="mt-2 text-lg">Quizás quieras regresar a la <a href="/" className="text-purple-400 hover:underline">página de inicio</a>.</p>
        <div className="mt-6">
          <img src="/not-found.svg" alt="Not Found" className="mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
