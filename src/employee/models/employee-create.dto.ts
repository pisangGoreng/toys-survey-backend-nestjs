import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class EmployeeCreateDto {
  @IsNotEmpty()
  @IsString()
  nik: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4, { message: 'Name must be at least 4 characters' })
  full_name: string;

  @IsNotEmpty()
  @IsString()
  @IsString()
  image_url: string;

  @IsNotEmpty()
  @IsNumber()
  user: number;
}
