import { CatColor } from "../dto/cat.model";

export interface Cat {
  name: string;
  age: number;
  breed: string;
  color: CatColor
}
