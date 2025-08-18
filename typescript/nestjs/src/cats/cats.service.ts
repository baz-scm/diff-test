import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  private readonly logger = new Logger(CatsService.name);
  private readonly cats: Cat[] = [];
  private idCounter = 1;

  create(createCatDto: CreateCatDto): Cat {
    const cat: Cat = {
      id: this.idCounter++,
      ...createCatDto,
      createdAt: new Date(),
    };
    this.cats.push(cat);
    this.logger.log(`Created cat with ID: ${cat.id}`);
    return cat;
  }

  findAll(limit?: number): Promise<Cat[]> {
    const result = limit ? this.cats.slice(0, limit) : this.cats;
    this.logger.log(`Retrieved ${result.length} cats`);
    return Promise.resolve(result);
  }

  findOne(id: number): Cat {
    const cat = this.cats.find(cat => cat.id === id);
    if (!cat) {
      this.logger.warn(`Cat with ID ${id} not found`);
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    return cat;
  }

  update(id: number, updateCatDto: CreateCatDto): Cat {
    const catIndex = this.cats.findIndex(cat => cat.id === id);
    if (catIndex === -1) {
      this.logger.warn(`Cat with ID ${id} not found for update`);
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }

    this.cats[catIndex] = {
      ...this.cats[catIndex],
      ...updateCatDto,
      updatedAt: new Date(),
    };

    this.logger.log(`Updated cat with ID: ${id}`);
    return this.cats[catIndex];
  }

  remove(id: number): void {
    const catIndex = this.cats.findIndex(cat => cat.id === id);
    if (catIndex === -1) {
      this.logger.warn(`Cat with ID ${id} not found for deletion`);
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }

    this.cats.splice(catIndex, 1);
    this.logger.log(`Removed cat with ID: ${id}`);
  }
}
