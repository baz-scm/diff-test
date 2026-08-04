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

  findByName(name: string): Promise<Cat> {
    const cat = this.cats.find((candidate) => candidate.name === name);
    if (!cat) {
      throw new NotFoundException(`No cat named ${name}`);
    }
    return Promise.resolve(cat);
  }

  remove(name: string): Promise<void> {
    const index = this.cats.findIndex((candidate) => candidate.name === name);
    if (index === -1) {
      throw new NotFoundException(`No cat named ${name}`);
    }
    this.cats.splice(index, 1);
    return Promise.resolve();
  }
}
