import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  getCatsByColor(color: string): Promise<Cat[]>{
    const result = this.cats.filter(c => c.color == color);
    return Promise.resolve(this.cats)
  }

  getCatsByBreed(breed: string): Promise<Cat[]>{
      const result = this.cats.filter(c => c.color == breed);
      return Promise.resolve(result)
  }

  findAll(): Promise<Cat[]> {
    return Promise.resolve(this.cats);
  }
}
