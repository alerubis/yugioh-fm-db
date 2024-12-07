const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, '../assets/images/detail/it'); // La cartella di input delle immagini
const outputDir = path.join(__dirname, '../assets/images/artwork'); // La cartella di output

// Crea la cartella di output se non esiste
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Funzione per ritagliare le immagini
const cropImages = () => {
  fs.readdir(inputDir, (err, files) => {
    if (err) {
      console.error('Errore nella lettura della cartella:', err);
      return;
    }

    // Filtra solo i file di immagine
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

    // Ritaglia e salva le immagini
    imageFiles.forEach(file => {
      const inputFilePath = path.join(inputDir, file);
      const outputFilePath = path.join(outputDir, file);

      sharp(inputFilePath)
        .extract({ width: 102, height: 96, left: 21, top: 50 }) // Ritaglia l'immagine
        .toFile(outputFilePath, (err, info) => {
          if (err) {
            console.error(`Errore nel ritaglio di ${file}:`, err);
          } else {
            console.log(`Immagine ritagliata e salvata come ${outputFilePath}`);
          }
        });
    });
  });
};

cropImages();
