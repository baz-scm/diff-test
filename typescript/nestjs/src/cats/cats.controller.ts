import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
  HttpStatus,
  HttpCode,
  Logger,
  Query
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
  private readonly logger = new Logger(CatsController.name);

  constructor(private readonly catsService: CatsService) {}

  @Post()
  @Roles(['admin'])
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    this.logger.log(`Creating new cat: ${createCatDto.name}`);
    return this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(@Query('limit') limit?: number): Promise<Cat[]> {
    this.logger.log(`Fetching all cats with limit: ${limit || 'none'}`);
    return this.catsService.findAll(limit);
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseIntPipe())
    id: number,
  ): Promise<Cat> {
    this.logger.log(`Fetching cat with ID: ${id}`);
    return this.catsService.findOne(id);
  }

  @Put(':id')
  @Roles(['admin', 'moderator'])
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateCatDto: CreateCatDto,
  ): Promise<Cat> {
    this.logger.log(`Updating cat with ID: ${id}`);
    return this.catsService.update(id, updateCatDto);
  }

  @Delete(':id')
  @Roles(['admin'])
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    this.logger.log(`Deleting cat with ID: ${id}`);
    return this.catsService.remove(id);
  }
}
