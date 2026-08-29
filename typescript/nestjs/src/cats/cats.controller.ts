import { Body, Controller, Get, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';

@UseGuards(RolesGuard)
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @Roles(['admin'])
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get('count')
  async count(): Promise<number> {
    const cats = await this.catsService.findAll();
    return cats.length;
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseIntPipe())
    id: number,
  ): Promise<Cat> {
    const cats = await this.catsService.findAll();
    const cat = cats[id];
    if (!cat) {
      throw new NotFoundException(`No cat at index ${id}`);
    }
    return cat;
  }
}
