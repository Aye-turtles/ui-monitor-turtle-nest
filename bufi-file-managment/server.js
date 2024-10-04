const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: '*', // Permite solicitudes desde Angular
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  credentials: true // Permite el envío de cookies si es necesario
}));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, './uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

const GITHUB_TOKEN = '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';
const repoOwner = 'Aye-turtles';  // Nombre de la organización
const repoName = 'records';  // Nombre del repositorio
const branch = 'main';  // Rama del repositorio

app.post('/upload-file', upload.single('file'), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send({ message: 'No se ha subido ningún archivo' });
  }


  const localFilePath = path.join(__dirname, './uploads', file.originalname);
  const fileContent = fs.readFileSync(localFilePath, 'utf-8');
  const base64Content = Buffer.from(fileContent).toString('base64');
  try {

    const response = await axios.put(
      `https://api.github.com/repos/${repoOwner}/${repoName}/contents/uploads/${file.originalname}`,
      {
        message: `Subiendo archivo ${file.originalname}`,
        content: base64Content,
        branch: branch,
      },
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    res.status(200).send({ message: 'Archivo subido con éxito a GitHub', githubResponse: response.data });
  } catch (error) {
    res.status(500).send({ message: 'Error al subir el archivo a GitHub', error: error.message });
  }
});


app.get('/get-file/:filename', async (req, res) => {
  const filename = req.params.filename;
  const localFilePath = path.join(__dirname, './uploads', filename);
  const githubFileUrl = `https://raw.githubusercontent.com/Aye-turtles/records/refs/heads/main/uploads/${filename}`;

  try {
    const localFileExists = fs.existsSync(localFilePath);

    const response = await axios.get(githubFileUrl);
    const githubFileContent = response.data;

    if (!localFileExists || fs.readFileSync(localFilePath, 'utf-8') !== githubFileContent) {
      fs.writeFileSync(localFilePath, githubFileContent, 'utf-8');
    }

    res.sendFile(localFilePath);
  } catch (error) {
    res.status(500).send({ message: 'Error al descargar el archivo de GitHub', error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
