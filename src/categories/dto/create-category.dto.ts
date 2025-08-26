import { IsNotEmpty, IsOptional, IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  category_name: string;

  @IsOptional()
  @IsString()
  category_description?: string;

  @IsOptional()
  @IsNumber()
  parent_id?: number;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsBoolean()
  is_deleted?: boolean;
}
