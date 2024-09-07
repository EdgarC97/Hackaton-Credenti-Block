import axios from 'axios'; // Para hacer peticiones HTTP
import fs from 'fs'; // Para manejar el sistema de archivos
import FormData from 'form-data'; // Para crear form-data para subir archivos
import dotenv from 'dotenv'; // Para cargar variables de entorno

dotenv.config(); // Carga las variables de entorno desde el archivo .env

// Constantes para la API de Pinata
const PINATA_API_URL = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY;

// Imprime las claves de API para verificar que se cargaron correctamente
console.log('PINATA_API_KEY:', PINATA_API_KEY);
console.log('PINATA_SECRET_API_KEY:', PINATA_SECRET_API_KEY);

// Función para subir un archivo a IPFS usando Pinata
export async function uploadToIPFS(filePath) {
  try {
    const file = fs.createReadStream(filePath); // Crea un stream de lectura del archivo

    const formData = new FormData();
    formData.append('file', file); // Añade el archivo al form-data

    // Realiza la petición POST a Pinata para subir el archivo
    const response = await axios.post(PINATA_API_URL, formData, {
      maxBodyLength: Infinity, // Permite archivos de cualquier tamaño
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        'pinata_api_key': PINATA_API_KEY,
        'pinata_secret_api_key': PINATA_SECRET_API_KEY
      }
    });

    return response.data.IpfsHash; // Devuelve el hash IPFS del archivo subido
  } catch (error) {
    // Manejo de errores
    console.error('Error uploading to IPFS:', error.response ? error.response.data : error.message);
    throw error; // Re-lanza el error para que pueda ser manejado en otro lugar si es necesario
  }
}