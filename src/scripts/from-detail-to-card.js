const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, '../assets/images/detail/it'); // La cartella di input delle immagini
const outputDir = path.join(__dirname, '../assets/images/card/it'); // La cartella di output

// Crea la cartella di output se non esiste
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Funzione per ritagliare e aggiungere trasparenza ai 3 pixel di ciascun angolo
const cropImages = () => {
  fs.readdir(inputDir, (err, files) => {
    if (err) {
      console.error('Errore nella lettura della cartella:', err);
      return;
    }

    // Filtra solo i file di immagine
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

    // Ritaglia, aggiungi trasparenza e salva le immagini
    imageFiles.forEach(file => {
      const inputFilePath = path.join(inputDir, file);
      const outputFilePath = path.join(outputDir, file);

      sharp(inputFilePath)
        .extract({ width: 140, height: 212, left: 2, top: 0 }) // Ritaglia l'immagine
        .ensureAlpha() // Assicurati che l'immagine abbia un canale alpha
        .raw() // Ottieni i dati dell'immagine in formato raw
        .toBuffer((err, data, info) => {
          if (err) {
            console.error(`Errore nel ritaglio di ${file}:`, err);
            return;
          }

          const width = info.width;
          const height = info.height;
          const channels = info.channels;

          // Funzione per calcolare l'indice di un pixel (y, x)
          const getIndex = (y, x) => y * width * channels + x * channels;

          // Trasparenza per l'angolo in alto a sinistra (0, 0), (0, 1), (1, 0)
          data[getIndex(0, 0)] = 0;       // R del pixel (0, 0)
          data[getIndex(0, 0) + 1] = 0;   // G del pixel (0, 0)
          data[getIndex(0, 0) + 2] = 0;   // B del pixel (0, 0)
          data[getIndex(0, 0) + 3] = 0;   // A del pixel (0, 0)

          data[getIndex(0, 1)] = 0;       // R del pixel (0, 1)
          data[getIndex(0, 1) + 1] = 0;   // G del pixel (0, 1)
          data[getIndex(0, 1) + 2] = 0;   // B del pixel (0, 1)
          data[getIndex(0, 1) + 3] = 0;   // A del pixel (0, 1)

          data[getIndex(1, 0)] = 0;       // R del pixel (1, 0)
          data[getIndex(1, 0) + 1] = 0;   // G del pixel (1, 0)
          data[getIndex(1, 0) + 2] = 0;   // B del pixel (1, 0)
          data[getIndex(1, 0) + 3] = 0;   // A del pixel (1, 0)

          // Trasparenza per l'angolo in alto a destra (0, width-1), (0, width-2), (1, width-1)
          data[getIndex(0, width - 1)] = 0;       // R del pixel (0, width-1)
          data[getIndex(0, width - 1) + 1] = 0;   // G del pixel (0, width-1)
          data[getIndex(0, width - 1) + 2] = 0;   // B del pixel (0, width-1)
          data[getIndex(0, width - 1) + 3] = 0;   // A del pixel (0, width-1)

          data[getIndex(0, width - 2)] = 0;       // R del pixel (0, width-2)
          data[getIndex(0, width - 2) + 1] = 0;   // G del pixel (0, width-2)
          data[getIndex(0, width - 2) + 2] = 0;   // B del pixel (0, width-2)
          data[getIndex(0, width - 2) + 3] = 0;   // A del pixel (0, width-2)

          data[getIndex(1, width - 1)] = 0;       // R del pixel (1, width-1)
          data[getIndex(1, width - 1) + 1] = 0;   // G del pixel (1, width-1)
          data[getIndex(1, width - 1) + 2] = 0;   // B del pixel (1, width-1)
          data[getIndex(1, width - 1) + 3] = 0;   // A del pixel (1, width-1)

          // Trasparenza per l'angolo in basso a sinistra (height-1, 0), (height-2, 0), (height-1, 1)
          data[getIndex(height - 1, 0)] = 0;       // R del pixel (height-1, 0)
          data[getIndex(height - 1, 0) + 1] = 0;   // G del pixel (height-1, 0)
          data[getIndex(height - 1, 0) + 2] = 0;   // B del pixel (height-1, 0)
          data[getIndex(height - 1, 0) + 3] = 0;   // A del pixel (height-1, 0)

          data[getIndex(height - 2, 0)] = 0;       // R del pixel (height-2, 0)
          data[getIndex(height - 2, 0) + 1] = 0;   // G del pixel (height-2, 0)
          data[getIndex(height - 2, 0) + 2] = 0;   // B del pixel (height-2, 0)
          data[getIndex(height - 2, 0) + 3] = 0;   // A del pixel (height-2, 0)

          data[getIndex(height - 1, 1)] = 0;       // R del pixel (height-1, 1)
          data[getIndex(height - 1, 1) + 1] = 0;   // G del pixel (height-1, 1)
          data[getIndex(height - 1, 1) + 2] = 0;   // B del pixel (height-1, 1)
          data[getIndex(height - 1, 1) + 3] = 0;   // A del pixel (height-1, 1)

          // Trasparenza per l'angolo in basso a destra (height-1, width-1), (height-2, width-1), (height-1, width-2)
          data[getIndex(height - 1, width - 1)] = 0;       // R del pixel (height-1, width-1)
          data[getIndex(height - 1, width - 1) + 1] = 0;   // G del pixel (height-1, width-1)
          data[getIndex(height - 1, width - 1) + 2] = 0;   // B del pixel (height-1, width-1)
          data[getIndex(height - 1, width - 1) + 3] = 0;   // A del pixel (height-1, width-1)

          data[getIndex(height - 2, width - 1)] = 0;       // R del pixel (height-2, width-1)
          data[getIndex(height - 2, width - 1) + 1] = 0;   // G del pixel (height-2, width-1)
          data[getIndex(height - 2, width - 1) + 2] = 0;   // B del pixel (height-2, width-1)
          data[getIndex(height - 2, width - 1) + 3] = 0;   // A del pixel (height-2, width-1)

          data[getIndex(height - 1, width - 2)] = 0;       // R del pixel (height-1, width-2)
          data[getIndex(height - 1, width - 2) + 1] = 0;   // G del pixel (height-1, width-2)
          data[getIndex(height - 1, width - 2) + 2] = 0;   // B del pixel (height-1, width-2)
          data[getIndex(height - 1, width - 2) + 3] = 0;   // A del pixel (height-1, width-2)

          // Scrive il buffer modificato in un nuovo file
          sharp(data, { raw: { width, height, channels: channels } })
            .toFile(outputFilePath, (err, info) => {
              if (err) {
                console.error(`Errore nel salvataggio dell'immagine ${file}:`, err);
              } else {
                console.log(`Immagine ritagliata, con trasparenza, e salvata come ${outputFilePath}`);
              }
            });
        });
    });
  });
};

cropImages();
