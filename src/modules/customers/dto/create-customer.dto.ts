// createCustomerDto.ts

import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  Display_name: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  district: string;

  @IsNotEmpty()
  @IsString()
  village: string;
}
