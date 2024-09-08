export default function Home() {
  return (
    <div className="relative bg-gradient-to-r from-purple-800 to-indigo-900 min-h-screen flex items-center justify-between p-8">
      <div className="max-w-2xl text-left">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Revolucionando documentos <br /> digitales con blockchain.
        </h1>
        <p className="text-gray-200 text-lg md:text-xl mb-8">
          Usamos tecnología blockchain para asegurar tus documentos y procesos digitales con la máxima seguridad y transparencia.
        </p>
        <div className="space-x-4">
          <button className="px-8 py-3 bg-white text-indigo-900 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition duration-300">
            Download App
          </button>
          <button className="px-8 py-3 bg-indigo-700 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-600 transition duration-300">
            More Details
          </button>
        </div>
      </div>
      <div className="hidden md:block w-1/2 max-w-lg">
        {/* Imagen colocada a la derecha */}
        <img
          src="/blockchain.webp"
          alt="App Mockup"
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}