import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
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

  @Get('search')
  search(@Query('name') name: string): Cat[] {
    return this.catsService.searchByName(name);
  }

  @Get('stats/average-age')
  averageAge(): number {
    return this.catsService.averageAge();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseIntPipe())
    id: number,
  ): Cat {
    return this.catsService.findOne(id);
  }

  @Patch(':id')
  @Roles(['admin'])
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() changes: any,
  ): Cat {
    return this.catsService.update(id, changes);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    this.catsService.remove(id);
  }
}
