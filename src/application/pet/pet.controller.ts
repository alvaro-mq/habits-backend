import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { PetService } from './pet.service';
import { PetDto } from './pet.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('/pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createPet(@Body() petDto: PetDto, @Req() req: Request) {
    const user = req.user as any;
    const pet = await this.petService.createPet(petDto, user.email);
    return pet;
  }
}
