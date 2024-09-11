import { Controller, Get, Post } from '@nestjs/common';

@Controller('random')
export class RandomController {
  @Get()
  getRandomNumber(): { value: number } {
    const number = Math.floor(Math.random() * 100) + 1;
    return { value: number };
  }

  @Post()
  postRandomNumber(): { value: number } {
    const number = Math.floor(Math.random() * 100) + 1;
    return { value: number };
  }
}
