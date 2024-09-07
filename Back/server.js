// Importaciones necesarias
import express from 'express'; // Framework web para Node.js
import multer from 'multer'; // Middleware para manejar datos multipart/form-data, usado para subir archivos
import { uploadToIPFS } from './ipfsUploader.js'; // Función personalizada para subir archivos a IPFS
import dotenv from 'dotenv'; // Para cargar variables de entorno desde un archivo .env

dotenv.config(); // Carga las variables de entorno

// Configuración de la aplicación Express
const app = express();
const upload = multer({ dest: 'uploads/' }); // Configura multer para guardar archivos subidos en la carpeta 'uploads/'

// Ruta POST para generar y subir archivos
app.post('/upload-pdf', upload.single('file'), async (req, res) => {
  try {
    // Verifica si se subió un archivo
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const pdfPath = req.file.path; // Obtiene la ruta del archivo subido
    const ipfsCID = await uploadToIPFS(pdfPath); // Sube el archivo a IPFS y obtiene el CID
    
    res.json({ ipfsCID }); // Responde con el CID del archivo en IPFS
  } catch (error) {
    res.status(500).json({ error: error.message }); // Manejo de errores
  }
});

// Inicia el servidor en el puerto 3000
app.listen(3001, () => console.log('Server running on port 3001'));