// Requisitos:
// npm install express multer googleapis dotenv

const express = require('express');
const multer = require('multer');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const upload = multer({ dest: 'uploads/' });

// Autenticação com Google Drive
const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_KEY_FILE,
  scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({ version: 'v3', auth });

// Cria uma pasta no Google Drive
async function createFolder(folderName) {
  const res = await drive.files.create({
    resource: {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
    },
    fields: 'id',
  });
  return res.data.id;
}

// Faz o upload de um arquivo para uma pasta no Drive
async function uploadFileToDrive(filePath, fileName, folderId) {
  const fileMetadata = {
    name: fileName,
    parents: [folderId],
  };
  const media = {
    mimeType: 'application/octet-stream',
    body: fs.createReadStream(filePath),
  };

  const response = await drive.files.create({
    resource: fileMetadata,
    media,
    fields: 'id',
  });

  return response.data.id;
}

// Rota para upload com nome do cliente
app.post('/upload/:cliente', upload.array('arquivos'), async (req, res) => {
  const cliente = req.params.cliente;
  const arquivos = req.files;

  try {
    const pastaId = await createFolder(cliente);

    for (const file of arquivos) {
      await uploadFileToDrive(file.path, file.originalname, pastaId);
      fs.unlinkSync(file.path); // remove arquivo temporário
    }

    res.send('Arquivos enviados para o Google Drive com sucesso.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao enviar arquivos.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
