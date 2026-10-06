import { Injectable, NotFoundException } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Promise<Cat[]> {
    return Promise.resolve(this.cats);
  }

  findOne(id: number): Cat {
    const cat = this.cats[id - 1];
    if (!cat) {
      throw new NotFoundException(`Cat ${id} not found`);
    }
    return cat;
  }

  update(id: number, changes: Partial<Cat>): Cat {
    const cat = this.findOne(id);
    Object.assign(cat, changes);
    return cat;
  }

  remove(id: number) {
    const index = this.cats.findIndex((_, i) => i === id);
    this.cats.splice(index, 1);
  }

  searchByName(name: string): Cat[] {
    const pattern = new RegExp(name, 'i');
    return this.cats.filter(cat => pattern.test(cat.name));
  }

  averageAge(): number {
    const total = this.cats.reduce((sum, cat) => sum + cat.age, 0);
    return total / this.cats.length;
  }
}
