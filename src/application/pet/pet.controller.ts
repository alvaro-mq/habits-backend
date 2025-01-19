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
import { CredentialService } from './credential.service';
import { Readable } from 'stream';
import { Response } from 'express';
import { MemoryDto } from './memory.dto';
import { MemoryService } from './memory.service';
import { VaccineDto } from './vaccine.dto';
import { VaccineService } from './vaccine.service';

@Controller('/pet')
export class PetController {
  constructor(
    private readonly petService: PetService,
    private readonly credentialService: CredentialService,
    private readonly memoryService: MemoryService,
    private readonly vaccineService: VaccineService,
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
  @UseGuards(AuthGuard('jwt'))
  async getCredential(@Res() res: Response) {
    const pdfBuffer = await this.credentialService.generarCarnet();
    const stream = new Readable();

    stream.push(pdfBuffer);
    stream.push(null);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': pdfBuffer.length,
    });

    stream.pipe(res);
  }

  @Post(':id/memory')
  async createMemory(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() memoryDto: MemoryDto,
    @Req() req: Request,
  ) {
    const user = req.user as any;
    const memory = await this.memoryService.createMemory(
      id,
      memoryDto,
      user.email,
    );
    return memory;
  }

  @Get(':id/memory')
  async getMemories(@Param('id', new ParseUUIDPipe()) id: string) {
    const memories = await this.memoryService.getMemories(id);
    return memories;
  }

  @Post(':id/vaccine')
  async createVaccine(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() vaccineDto: VaccineDto,
    @Req() req: Request,
  ) {
    const user = req.user as any;
    const vaccine = await this.vaccineService.createVaccine(
      id,
      vaccineDto,
      user.email,
    );
    return vaccine;
  }

  @Get(':id/vaccine')
  async getVaccines(@Param('id', new ParseUUIDPipe()) id: string) {
    const vaccines = await this.vaccineService.getVaccines(id);
    return vaccines;
  }
}
