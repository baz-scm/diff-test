import { IsEnum, IsInt, IsString, IsOptional, IsBoolean, Min, Max, Length } from 'class-validator';
import { CatColor } from "./cat.model";

export class CreateCatDto {
  @IsString()
  @Length(1, 50, { message: 'Name must be between 1 and 50 characters' })
  readonly name: string;

  @IsInt()
  @Min(0, { message: 'Age must be a positive number' })
  @Max(30, { message: 'Age must be less than 30 years' })
  readonly age: number;

  @IsString()
  @Length(1, 30, { message: 'Breed must be between 1 and 30 characters' })
  readonly breed: string;

  @IsEnum(CatColor)
  @IsOptional()
  readonly color?: CatColor;

  @IsBoolean()
  @IsOptional()
  readonly isVaccinated?: boolean;
}
