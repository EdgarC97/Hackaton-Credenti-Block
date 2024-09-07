"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const ButtonLogout: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    localStorage.removeItem("accessToken");
    //document.cookie = 'accessToken=; Max-Age=0; path=/; secure;';
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include", // Incluye las cookies en la solicitud
    });

    router.push("/login");
  };

  return (
    <button 
        onClick={handleLogout}
        className="flex items-center w-full px-4 py-2 text-gray-300 bg-gray-800 rounded hover:bg-gray-700 transition duration-300">
      <LogOut className="mr-3" size={20} />
      Cerrar Sesión
    </button>
  );
};

export default ButtonLogout;
