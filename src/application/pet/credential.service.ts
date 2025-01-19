import { Injectable } from '@nestjs/common';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { readFileSync } from 'fs';

@Injectable()
export class CredentialService {
  async generarCarnet(): Promise<Buffer> {
    const defaultPhotoUrl = 'https://pngimg.com/d/golden_retriever_PNG16.png'; // Imagen por defecto
    const petPhotoUrl = defaultPhotoUrl;
    const petCode = 'N/A'; // Código único de la mascota
    // Crear un nuevo documento PDF
    const pdfDoc = await PDFDocument.create();

    // Definir fuentes
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Dimensiones de la credencial
    const pageWidth = 350;
    const pageHeight = 200;

    const backgroundBytes = readFileSync(
      '/Users/alvaromamani/Documents/Projects/my/estrella/estrella-backend/assets/images/fondo-beat.png',
    ); // Leer imagen como buffer
    const backgroundImage = await pdfDoc.embedPng(backgroundBytes);

    // Descargar imagen de la mascota
    const imageBytes = await fetch(petPhotoUrl).then((res) =>
      res.arrayBuffer(),
    );
    const petImage = await pdfDoc.embedPng(imageBytes);

    // Crear página frontal (anverso)
    const frontPage = pdfDoc.addPage([pageWidth, pageHeight]);

    const backgroundDims = backgroundImage.scaleToFit(pageWidth, pageHeight);
    frontPage.drawImage(backgroundImage, {
      x: 0,
      y: 0,
      width: backgroundDims.width + 70,
      height: backgroundDims.height,
    });

    // Título "CREDENCIAL"
    frontPage.drawText('CREDENCIAL', {
      x: 80,
      y: pageHeight - 30,
      size: 24,
      font: boldFont,
    });

    // Imagen de la mascota
    const petImageDims = petImage.scale(0.1);

    const rectX = 10; // Posición X del rectángulo
    const rectY = pageHeight / 2 - petImageDims.height / 2; // Posición Y del rectángulo
    const rectWidth = petImageDims.width + 20; // Ancho del rectángulo (incluye margen)
    const rectHeight = petImageDims.height + 20; // Alto del rectángulo (incluye margen)

    // Dibujar el fondo blanco
    frontPage.drawRectangle({
      x: rectX - 20, // Agregar margen para que la imagen quede centrada
      y: rectY - 10,
      width: rectWidth,
      height: rectHeight,
      color: rgb(1, 1, 1), // Color blanco para el fondo
      borderColor: rgb(0, 0, 0), // Color negro para el borde
      borderWidth: 2, // Grosor del borde
    });

    // Dibujar la imagen encima del fondo
    frontPage.drawImage(petImage, {
      x: rectX,
      y: rectY,
      width: petImageDims.width,
      height: petImageDims.height,
    });

    // Código único de la mascota debajo de la foto
    frontPage.drawText(`Código: ${petCode}`, {
      x: 20,
      y: pageHeight / 2 - petImageDims.height / 2 - 20,
      size: 10,
      font: regularFont,
      color: rgb(0, 0, 0),
    });

    // Información de la mascota
    const textData = [
      { label: 'Nombre:', value: 'Estrella' },
      { label: 'Especie:', value: 'CANINO' },
      { label: 'Raza:', value: 'Golden Retriever' }, // || 'No especificado' },
      { label: 'Nacimiento:', value: '11/11/2020' },
      { label: 'Dueño:', value: 'Alvaro Mamani' }, // || 'No especificado' },
    ];

    let yPosition = pageHeight - 60;

    textData.forEach((item) => {
      frontPage.drawText(`${item.label}`, {
        x: 120,
        y: yPosition,
        size: 12,
        font: boldFont,
        color: rgb(0, 0, 0),
      });

      frontPage.drawText(` ${item.value}`, {
        x: 170,
        y: yPosition,
        size: 12,
        font: regularFont,
        color: rgb(0, 0, 0),
      });

      yPosition -= 20;
    });

    // Crear página trasera (reverso)
    const backPage = pdfDoc.addPage([pageWidth, pageHeight]);

    // Fondo blanco
    backPage.drawRectangle({
      x: 0,
      y: 0,
      width: pageWidth,
      height: pageHeight,
      color: rgb(1, 1, 1),
    });

    // Título "Información Adicional"
    backPage.drawText('Información Adicional', {
      x: 80,
      y: pageHeight - 30,
      size: 16,
      font: boldFont,
      color: rgb(0, 0, 0),
    });

    // Información adicional
    const additionalInfo = [
      { label: 'Vacunas:', value: 'No especificado' },
      {
        label: 'Contacto:',
        value: 'No disponible',
      },
      {
        label: 'Adicional:',
        value: 'Sin información adicional.',
      },
    ];

    yPosition = pageHeight - 60;

    additionalInfo.forEach((item) => {
      backPage.drawText(`${item.label}`, {
        x: 20,
        y: yPosition,
        size: 12,
        font: boldFont,
        color: rgb(0, 0, 0),
      });

      backPage.drawText(` ${item.value}`, {
        x: 100,
        y: yPosition,
        size: 12,
        font: regularFont,
        color: rgb(0, 0, 0),
      });

      yPosition -= 20;
    });

    // Exportar como Buffer
    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  }
}
