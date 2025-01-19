import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { PetService } from './pet.service';
import { PetDto } from './pet.dto';
import { AuthGuard } from '@nestjs/passport';
import { CarnetService } from './carnet.service';
import { Readable } from 'stream';
import { Response } from 'express';

@Controller('/pet')
export class PetController {
  constructor(
    private readonly petService: PetService,
    private readonly carnetService: CarnetService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createPet(@Body() petDto: PetDto, @Req() req: Request) {
    const user = req.user as any;
    const pet = await this.petService.createPet(petDto, user.email);
    return pet;
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getPets(@Req() req: Request) {
    const user = req.user as any;
    const pet = await this.petService.getPets(user.email);
    return pet;
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getPet(@Param('id', new ParseUUIDPipe()) id: string) {
    const pet = await this.petService.getPet(id);
    return pet;
  }

  @Get(':id/credential')
  // @UseGuards(AuthGuard('jwt'))
  async getCredential(@Res() res: Response) {
    const pdfBuffer = await this.carnetService.generarCarnet();
    const stream = new Readable();

    stream.push(pdfBuffer);
    stream.push(null);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': pdfBuffer.length,
    });

    stream.pipe(res);
  }
}
