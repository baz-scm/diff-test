import { IsEnum, IsInt, IsString } from 'class-validator';
import { CatColor } from "./cat.model";

export class CreateCatDto {
  @IsString()
  readonly name: string;

  @IsInt()
  readonly age: number;

  @IsString()
  readonly breed: string;

  @IsEnum(CatColor)
  readonly color: CatColor;
}
