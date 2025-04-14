import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Response } from 'express';

@Controller('uploads')
export class UploadsController {
  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Carpeta donde se guardan las imágenes
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${extension}`;
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        console.log(file.mimetype);
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return callback(
            new BadRequestException('Only image files are allowed!'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required!');
    }
    return {
      message: 'File uploaded successfully',
      file: file.filename,
      path: `/uploads/${file.filename}`, // Ruta para acceder a la imagen
    };
  }

  @Get('image/:filename')
  getFile(@Param('filename') filename: string, @Res() res: Response) {
    return res.sendFile(join(__dirname, '../../../../uploads', filename));
  }

  @Post('gpx')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './gpx', // Carpeta donde se guardan las imágenes
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${extension}`;
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        console.log(file.mimetype);
        if (file.mimetype != 'application/gpx+xml') {
          return callback(
            new BadRequestException('Only gpx files are allowed!'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  uploadGpx(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required!');
    }
    return {
      message: 'Gpx uploaded successfully',
      file: file.filename,
      path: `/gpx/${file.filename}`, // Ruta para acceder a la imagen
    };
  }

  @Get('gpx/:filename')
  getGpx(@Param('filename') filename: string, @Res() res: Response) {
    return res.sendFile(join(__dirname, '../../../../gpx', filename));
  }
}
