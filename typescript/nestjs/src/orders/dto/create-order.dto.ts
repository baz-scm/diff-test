import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateOrderItemDto {
  @IsString()
  readonly sku: string;

  @IsInt()
  readonly quantity: number;
}

export class CreateOrderDto {
  @IsString()
  readonly customerId: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  readonly items: CreateOrderItemDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly couponCodes?: string[];
}

export class RefundOrderDto {
  @IsInt()
  readonly amount: number;

  @IsOptional()
  @IsString()
  readonly reason?: string;
}

export class ListOrdersQueryDto {
  @IsOptional()
  @IsString()
  readonly customerId?: string;

  @IsOptional()
  @IsString()
  readonly status?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  readonly page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  readonly pageSize?: number;
}
